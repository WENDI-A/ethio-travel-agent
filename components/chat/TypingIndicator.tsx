'use client';

export default function TypingIndicator() {
    return (
        <div className="flex items-center space-x-2 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl max-w-[100px] backdrop-blur-sm">
            <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
        </div>
    );
}
