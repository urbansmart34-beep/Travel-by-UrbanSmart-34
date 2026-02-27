import os
import google.generativeai as genai

# Configure Gemini with the API key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

def chat_completion(messages: list, model: str = "gemini-1.5-flash", temperature: float = 0.7):
    """
    Calls the Gemini API using the given message history.
    """
    if not GEMINI_API_KEY:
        return {"error": "GEMINI_API_KEY is not configured", "content": "I am currently offline. Please configure my API key."}

    try:
        # Initialize the generative model
        # We use gemini-1.5-flash as the default fast and capable model
        gen_model = genai.GenerativeModel(
            model_name=model,
            generation_config=genai.GenerationConfig(
                temperature=temperature,
            )
        )
        
        # Convert standard [{role: 'user', content: '...'}, {role: 'assistant', content: '...'}] array 
        # to Gemini's expected format. Also extract the system prompt if present.
        system_instruction = None
        gemini_history = []
        
        for msg in messages:
            role = msg.get("role")
            content = msg.get("content", "")
            
            if role == "system":
                system_instruction = content
            elif role == "user":
                gemini_history.append({"role": "user", "parts": [content]})
            elif role == "assistant" or role == "model":
                gemini_history.append({"role": "model", "parts": [content]})
        
        # If we have a system instruction, we apply it. Note: For basic genai SDK we pass it as a system_instruction kwarg
        # but to keep it simple across API versions, we can just prepend it to the first user message if needed.
        # Alternatively, genai.GenerativeModel supports system_instruction directly in recent versions:
        if system_instruction:
             gen_model = genai.GenerativeModel(
                 model_name=model,
                 system_instruction=system_instruction,
                 generation_config=genai.GenerationConfig(temperature=temperature)
             )

        # Remove the latest user message from the history to pass it to .send_message()
        if not gemini_history:
             return {"error": "No messages provided"}
             
        latest_message = gemini_history[-1]["parts"][0]
        history = gemini_history[:-1]

        # Start a chat session with the formatted history
        chat_session = gen_model.start_chat(history=history)
        
        # Send the latest message
        response = chat_session.send_message(latest_message)

        return {
            "content": response.text,
            "role": "assistant"
        }

    except Exception as e:
        print(f"Gemini API Error: {str(e)}")
        return {"error": str(e), "content": "Sorry, I encountered an error connecting to my brain."}
