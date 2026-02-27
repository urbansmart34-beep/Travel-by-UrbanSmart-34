import React, { useState, useRef, useEffect } from 'react';
import { useMinimax } from '@/hooks/useMinimax';
import { MessageCircle, X, Send, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const { messages, sendMessage, isLoading, error } = useMinimax();
    const [inputValue, setInputValue] = useState("");
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const content = inputValue;
        setInputValue("");
        await sendMessage(content);
    };

    if (!isOpen) {
        return (
            <Button
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white z-50"
                onClick={() => setIsOpen(true)}
            >
                <MessageCircle className="h-6 w-6" />
            </Button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-72' : 'w-80 sm:w-96'}`}>
            <Card className="shadow-2xl border-blue-100">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-lg flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-white/20">
                            <AvatarImage src="/bot-avatar.png" />
                            <AvatarFallback className="bg-blue-500 text-white">AI</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-sm font-medium">Travel Assistant</CardTitle>
                            <p className="text-xs text-blue-100 flex items-center gap-1">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-100 hover:text-white hover:bg-white/10" onClick={() => setIsMinimized(!isMinimized)}>
                            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-100 hover:text-white hover:bg-white/10" onClick={() => setIsOpen(false)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>

                {!isMinimized && (
                    <>
                        <CardContent className="p-0">
                            <ScrollArea className="h-80 p-4">
                                <div className="space-y-4">
                                    {messages.length === 0 && (
                                        <div className="text-center text-slate-500 text-sm py-8">
                                            <p>Hi! I'm your AI Travel Assistant.</p>
                                            <p>Ask me about flights, hotels, or trip planning!</p>
                                        </div>
                                    )}

                                    {messages.map((msg, idx) => (
                                        <div
                                            key={idx}
                                            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-slate-100 text-slate-800 rounded-bl-none'
                                                    }`}
                                            >
                                                {msg.content}
                                            </div>
                                        </div>
                                    ))}

                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="bg-slate-100 rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-2">
                                                <Loader2 className="h-3 w-3 animate-spin text-slate-500" />
                                                <span className="text-xs text-slate-500">Typing...</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Error Display */}
                                    {error && (
                                        <div className="flex justify-center my-2">
                                            <div className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full border border-red-100">
                                                {error}
                                            </div>
                                        </div>
                                    )}

                                    <div ref={scrollRef} />
                                </div>
                            </ScrollArea>
                        </CardContent>

                        <CardFooter className="p-3 border-t">
                            <form onSubmit={handleSend} className="flex w-full gap-2">
                                <Input
                                    placeholder="Type a message..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="flex-1"
                                    disabled={isLoading}
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </CardFooter>
                    </>
                )}
            </Card>
        </div>
    );
};

export default ChatWidget;
