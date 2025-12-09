'use client';

import ModelLoader from './model-loader';
import type { ChatMessage, GenerationOptions } from '@/types/chat';


function normalize(text: string): string {
    return text.toLowerCase();
}

function isAskingTours(q: string): boolean {
    const s = normalize(q);
    return /(tour|tours|trip|package|itinerary|available\s+tours|current\s+tours)/.test(s);
}

function isAskingHotels(q: string): boolean {
    const s = normalize(q);
    return /(hotel|hotels|stay|accommodation)/.test(s);
}

function isAskingServices(q: string): boolean {
    const s = normalize(q);
    return /(service|services|booking|bookings|guide|guides|transport|transfer)/.test(s);
}




class ChatEngine {
    private static instance: ChatEngine;
    private modelLoader: ModelLoader;
    private conversationHistory: ChatMessage[] = [];

    private constructor() {
        this.modelLoader = ModelLoader.getInstance();
    }

    static getInstance(): ChatEngine {
        if (!ChatEngine.instance) {
            ChatEngine.instance = new ChatEngine();
        }
        return ChatEngine.instance;
    }

    async initialize(modelId?: string): Promise<void> {
        // In strict site-data-only mode, we do not need to load any model.
        // Kept for compatibility with UI which checks readiness.
        return;
    }

    private formatPrompt(messages: ChatMessage[], systemContext: string = ''): string {
        // System instruction with grounded site data injected via systemContext
        const system = [
            "You are Ethio-Travel’s AI assistant. Answer politely in full sentences.",
            'Use only the provided site data for tours, hotels, and services. Do not invent details.',
            'If the answer is not in the data, reply: “I’m sorry, I don’t have that information.”',
            systemContext ? `\nSite data:\n${systemContext}` : ''
        ].filter(Boolean).join('\n');

        // Keep only the last few messages for focus
        const recent = messages.slice(-4);
        const history = recent
            .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content.replace(/\n/g, ' ')}`)
            .join('\n');

        return [system, '', history, 'Assistant:'].join('\n');
    }

    async generateResponse(
        userMessage: string,
        systemContext: string = '',
        options: GenerationOptions = {}
    ): Promise<string> {
        // Strict rule-based mode: do not use any AI model.

        // Add user message to history
        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: userMessage,
            timestamp: new Date()
        };
        this.conversationHistory.push(userMsg);

        try {
            // Build grounded system context for the model
            const groundedContext = [
                systemContext?.trim() ? systemContext.trim() : '',
                '\nRules:',
                '- Use only the site data provided above about cities, attractions, and tours (with prices and durations).',
                '- If the answer isn\'t in the data, reply exactly: “I’m sorry, I don’t have that information.”',
                '- Be concise and do not repeat yourself.'
            ].filter(Boolean).join('\n');

            // Add a soft hint based on intent while allowing model to respond naturally
            const focusHint = isAskingTours(userMessage)
                ? '\nFocus: The user is asking about tours.'
                : isAskingHotels(userMessage)
                ? '\nFocus: The user is asking about hotels.'
                : isAskingServices(userMessage)
                ? '\nFocus: The user is asking about services.'
                : '';

            // Rule-based deterministic responder using only provided site data
            const data = (systemContext || '').trim();
            const fallback = 'I’m sorry, I don’t have that information.';

            // Extract simple tours list from the provided site data if present
            const tourRegex = /\*\s+(.*?)\:\s*(\d+)\s*days?,\s*\$(\d+)/gi;
            const tours: { name: string; days: string; price: string }[] = [];
            let m: RegExpExecArray | null;
            while ((m = tourRegex.exec(data)) !== null) {
                tours.push({ name: m[1].trim(), days: `${m[2]} days`, price: `${m[3]}` });
            }

            const q = userMessage.toLowerCase();
            let responseText = '';

            // If user asks anything about tours
            if (/(tour|tours|trip|package|itinerary|available\s+tours|current\s+tours)/.test(q)) {
                if (tours.length) {
                    const list = tours.map(t => `- ${t.name}: ${t.days}, ${t.price}`).join('\n');
                    responseText = `Here are the tours:

${list}`;
                } else {
                    responseText = fallback;
                }
            }
            // If asks about hotels or services, but data is to be filled later
            else if (/(hotel|hotels|stay|accommodation)/.test(q)) {
                responseText = fallback;
            } else if (/(service|services|booking|bookings|guide|guides|transport|transfer)/.test(q)) {
                responseText = fallback;
            } else {
                // For any other query not supported by the provided block
                responseText = fallback;
            }

            // Final guardrail
            if (!responseText || responseText.length < 3) {
                responseText = fallback;
            }

            // Add assistant response to history
            const assistantMsg: ChatMessage = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: responseText,
                timestamp: new Date()
            };
            this.conversationHistory.push(assistantMsg);

            return responseText;

        } catch (error) {
            console.error('Generation error:', error);
            throw new Error('Failed to generate response. Please try again.');
        }
    }

    getConversationHistory(): ChatMessage[] {

        return [...this.conversationHistory];
    }

    clearHistory(): void {
        this.conversationHistory = [];
    }

    isReady(): boolean {
        // Always ready in rule-based mode
        return true;
    }

    getModelLoader(): ModelLoader {
        return this.modelLoader;
    }
}

export default ChatEngine;
