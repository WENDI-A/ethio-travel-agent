'use client';

import { useState, useEffect, useRef } from 'react';
import ChatEngine from '@/lib/ai/chat-engine';
import ModelLoader from '@/lib/ai/model-loader';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import ModelSelector from './ModelSelector';
import type { ChatMessage as ChatMessageType, ModelLoadingState } from '@/types/chat';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [loadingState, setLoadingState] = useState<ModelLoadingState>({
        status: 'idle',
        progress: 0,
        message: 'Not initialized'
    });
    const [chatEngine, setChatEngine] = useState<ChatEngine | null>(null);
    const [modelLoader, setModelLoader] = useState<ModelLoader | null>(null);
    const [systemContext, setSystemContext] = useState('');
    const [contextChunks, setContextChunks] = useState<string[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const messageIdCounter = useRef(0);

    // Initialize instances only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setChatEngine(ChatEngine.getInstance());
            setModelLoader(ModelLoader.getInstance());
        }
    }, []);

    // Fetch website context
    useEffect(() => {
        const fetchContext = async () => {
            try {
                const response = await fetch('/api/ai/context');
                const data = await response.json();
                if (data.context) {
                    setSystemContext(data.context);
                }
                if (Array.isArray(data.messageChunks)) {
                    setContextChunks(data.messageChunks);
                }
            } catch (error) {
                console.error('Failed to fetch AI context:', error);
            }
        };
        fetchContext();
    }, []);

    useEffect(() => {
        if (!modelLoader || !chatEngine) return;

        // Subscribe to model loading state
        const unsubscribe = modelLoader.subscribe((state) => {
            setLoadingState(state);
        });

        // Initialize model (hardcoded to Qwen 1.5 0.5B Chat)
        chatEngine.initialize('Xenova/Qwen1.5-0.5B-Chat');

        return () => unsubscribe();
    }, [chatEngine, modelLoader]);

    useEffect(() => {
        // Auto-scroll to bottom
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isGenerating]);

    const handleSend = async () => {
        if (!input.trim() || isGenerating || !chatEngine?.isReady()) return;

        const userMessage = input.trim();
        setInput('');
        setIsGenerating(true);

        // Add user message to UI
        const userMsg: ChatMessageType = {
            id: `msg-${++messageIdCounter.current}`,
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMsg]);

        try {
            // Generate AI response (rule-based) and simulate typing with chunks
            const response = await chatEngine!.generateResponse(userMessage, systemContext);

            // If the question matches cities/tours, and we have prebuilt chunks, stream them
            const isTours = /(tour|tours|trip|package|itinerary|available\s+tours|current\s+tours)/i.test(userMessage);
            const isCities = /(city|cities)/i.test(userMessage);

            if ((isTours || isCities) && contextChunks.length > 0) {
                // Push a typing dot first
                const typingMsg: ChatMessageType = {
                    id: `msg-${++messageIdCounter.current}`,
                    role: 'assistant',
                    content: '…',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, typingMsg]);

                // Sequentially push chunks
                let delay = 300;
                contextChunks.forEach((chunk, index) => {
                    setTimeout(() => {
                        const chunkMsg: ChatMessageType = {
                            id: `msg-${++messageIdCounter.current}`,
                            role: 'assistant',
                            content: chunk,
                            timestamp: new Date()
                        };
                        setMessages(prev => [...prev, chunkMsg]);
                    }, delay);
                    delay += 450;
                });
            } else {
                // Fallback single response
                const aiMsg: ChatMessageType = {
                    id: `msg-${++messageIdCounter.current}`,
                    role: 'assistant',
                    content: response,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, aiMsg]);
            }
        } catch (error) {
            console.error('Error generating response:', error);
            const errorMsg: ChatMessageType = {
                id: `msg-${++messageIdCounter.current}`,
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsGenerating(false);
            inputRef.current?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Show loading while instances are being created
    if (!chatEngine || !modelLoader) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Initializing...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto p-4">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    AI Travel Assistant
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    Ask me anything about our tours and destinations!
                </p>
            </div>

            {/* Loading State */}
            {loadingState.status === 'loading' && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl border border-green-200 dark:border-green-800"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {loadingState.message}
                        </span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400">
                            {loadingState.progress}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${loadingState.progress}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        First load may take a few minutes. Model will be cached for future use.
                    </p>
                </motion.div>
            )}

            {/* Device Info */}
            {loadingState.status === 'ready' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 text-center"
                >
                    <p className="text-sm text-green-700 dark:text-green-300">
                        ✅ Ready to chat
                    </p>
                </motion.div>
            )}

            {/* Error State */}
            {loadingState.status === 'error' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                >
                    <p className="text-sm text-red-700 dark:text-red-300">
                        ❌ {loadingState.message}: {loadingState.error}
                    </p>
                </motion.div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto mb-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700 min-h-[400px] max-h-[600px]">
                {messages.length === 0 && loadingState.status === 'ready' && (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🤖</div>
                            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                Start a Conversation
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                I know all about our available cities and tours.
                            </p>
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}
                </AnimatePresence>

                {isGenerating && <TypingIndicator />}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                <div className="flex gap-3">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={
                            loadingState.status === 'ready'
                                ? 'Ask about tours, cities, or attractions...'
                                : 'Please wait...'
                        }
                        disabled={!chatEngine?.isReady() || isGenerating}
                        className="flex-1 resize-none bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-[60px] max-h-[200px]"
                        rows={2}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || !chatEngine?.isReady() || isGenerating}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Press Enter to send, Shift+Enter for new line
                </div>
            </div>
        </div>
    );
}
