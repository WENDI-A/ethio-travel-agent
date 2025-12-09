'use client';

import dynamic from 'next/dynamic';

const ChatInterface = dynamic(() => import('@/components/chat/ChatInterface'), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">Loading AI Chat...</p>
            </div>
        </div>
    ),
});

export default function ChatPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
            <script type="module" dangerouslySetInnerHTML={{
                __html: `
                    import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
                    window.transformers = { pipeline, env };
                `
            }} />
            <div className="container mx-auto px-4">
                <ChatInterface />
            </div>
        </div>
    );
}
