'use client';

import { useState, useEffect, useRef } from 'react';
import ChatEngine from '@/lib/ai/chat-engine';
import ModelLoader from '@/lib/ai/model-loader';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import type { ChatMessage as ChatMessageType, ModelLoadingState } from '@/types/chat';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'ethio-travel-chat-messages';

export default function FloatingChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessageType[]>([]);
    const [input, setInput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
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
    const inputRef = useRef<HTMLInputElement>(null);
    const messageIdCounter = useRef(0);

    // Initialize instances only on client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setChatEngine(ChatEngine.getInstance());
            setModelLoader(ModelLoader.getInstance());

            // Load messages from localStorage
            const savedMessages = localStorage.getItem(STORAGE_KEY);
            if (savedMessages) {
                try {
                    const parsed = JSON.parse(savedMessages);
                    setMessages(parsed.map((msg: any) => ({
                        ...msg,
                        timestamp: new Date(msg.timestamp)
                    })));
                } catch (error) {
                    console.error('Failed to load saved messages:', error);
                }
            }
        }
    }, []);

    // Save messages to localStorage whenever they change
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

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

    // Track unread messages
    useEffect(() => {
        if (!isOpen && messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            if (lastMessage.role === 'assistant') {
                setUnreadCount(prev => prev + 1);
            }
        }
    }, [messages, isOpen]);

    // Reset unread count when opening
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

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
            // Generate AI response
            const response = await chatEngine!.generateResponse(userMessage, systemContext);

            const isTours = /(tour|tours|trip|package|itinerary|available\s+tours|current\s+tours)/i.test(userMessage);
            const isCities = /(city|cities)/i.test(userMessage);

            if ((isTours || isCities) && contextChunks.length > 0) {
                const typingMsg: ChatMessageType = {
                    id: `msg-${++messageIdCounter.current}`,
                    role: 'assistant',
                    content: '…',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, typingMsg]);

                let delay = 250;
                contextChunks.forEach((chunk) => {
                    setTimeout(() => {
                        const chunkMsg: ChatMessageType = {
                            id: `msg-${++messageIdCounter.current}`,
                            role: 'assistant',
                            content: chunk,
                            timestamp: new Date()
                        };
                        setMessages(prev => [...prev, chunkMsg]);
                    }, delay);
                    delay += 400;
                });
            } else {
                // Add AI response to UI
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

    const clearChat = () => {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
        if (chatEngine) {
            chatEngine.clearHistory();
        }
    };

    return (
        <>
            {/* Floating Chat Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-4 right-4 z-[9999] bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110 active:scale-95"
                        title="AI Travel Assistant"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>

                        {/* Notification Badge */}
                        {unreadCount > 0 && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                            >
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </motion.div>
                        )}
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Floating Chat Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-4 right-4 z-[9999] w-[calc(100vw-2rem)] md:w-[380px] h-[calc(100vh-2rem)] md:h-[550px] max-h-[600px] bg-white dark:bg-gray-800 rounded-2xl md:rounded-3xl shadow-2xl border-2 border-green-200 dark:border-green-800 flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-2xl">
                                    🤖
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">AI Assistant</h3>
                                    <p className="text-green-100 text-xs">
                                        {loadingState.status === 'ready' ? 'Online' : loadingState.status === 'loading' ? 'Loading...' : 'Offline'}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {messages.length > 0 && (
                                    <button
                                        onClick={clearChat}
                                        className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                                        title="Clear chat"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Loading State */}
                        {loadingState.status === 'loading' && (
                            <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                                        {loadingState.message}
                                    </span>
                                    <span className="text-xs font-bold text-green-600 dark:text-green-400">
                                        {loadingState.progress}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${loadingState.progress}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    First load may take a few minutes
                                </p>
                            </div>
                        )}

                        {/* Error State */}
                        {loadingState.status === 'error' && (
                            <div className="px-4 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
                                <p className="text-xs text-red-700 dark:text-red-300">
                                    ❌ {loadingState.message}
                                </p>
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                                    {loadingState.error}
                                </p>
                            </div>
                        )}

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900/50">
                            {messages.length === 0 && loadingState.status === 'ready' && (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="text-4xl mb-3">👋</div>
                                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                            Hello!
                                        </h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Ask me about tours and destinations
                                        </p>
                                    </div>
                                </div>
                            )}

                            {messages.length === 0 && loadingState.status !== 'ready' && (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="text-4xl mb-3">🤖</div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Initializing AI assistant...
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
                        <div className="p-4 bg-white dark:bg-gray-800 border-t-2 border-green-200 dark:border-green-800">
                            <div className="flex gap-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={
                                        loadingState.status === 'ready'
                                            ? 'Ask about tours, cities, or attractions...'
                                            : 'Please wait...'
                                    }
                                    disabled={!chatEngine?.isReady() || isGenerating}
                                    className="flex-1 bg-gray-100 dark:bg-gray-900 border-2 border-green-200 dark:border-green-700 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || !chatEngine?.isReady() || isGenerating}
                                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
