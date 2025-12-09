'use client';

import { ChatMessage as ChatMessageType } from '@/types/chat';
import { motion } from 'framer-motion';

interface ChatMessageProps {
    message: ChatMessageType;
}

function formatTime(date: Date): string {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

export default function ChatMessage({ message }: ChatMessageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`flex gap-2 mb-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
        >
            {message.role === 'assistant' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    AI
                </div>
            )}

            <div
                className={`max-w-[75%] rounded-2xl px-3 py-2 ${message.role === 'user'
                        ? 'bg-gradient-to-r from-green-600 to-green-700 text-white rounded-br-sm'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-bl-sm'
                    }`}
            >
                <div className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                </div>
                <div
                    className={`text-xs mt-1 ${message.role === 'user'
                            ? 'text-green-100'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                >
                    {formatTime(message.timestamp)}
                </div>
            </div>

            {message.role === 'user' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white text-xs">
                    👤
                </div>
            )}
        </motion.div>
    );
}
