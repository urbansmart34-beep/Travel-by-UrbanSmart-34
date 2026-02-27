import { useState } from 'react';
import { travelApi } from '../services/api';

export const useMinimax = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendMessage = async (content) => {
        setIsLoading(true);
        setError(null);

        const newMessages = [...messages, { role: 'user', content }];
        setMessages(newMessages);

        try {
            // Format messages for Minimax if needed, or pass directly
            // Assuming Minimax expects standard { role, content } format
            const response = await travelApi.chat(newMessages);

            // Safely extract reply
            const reply = response.data.reply ||
                (response.data.choices && response.data.choices[0] && response.data.choices[0].message && response.data.choices[0].message.content) ||
                "I'm sorry, I didn't understand that response.";

            if (!reply || reply === "I'm sorry, I didn't understand that response.") {
                console.warn("Unexpected Minimax response structure:", response.data);
            }

            setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            console.error("AI Chat Error:", err);
            setError(err.message || 'Failed to get response from AI');
            // Optionally remove the user message if it failed, or show error state
        } finally {
            setIsLoading(false);
        }
    };

    return {
        messages,
        sendMessage,
        isLoading,
        error,
    };
};
