import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';

export async function POST(request: NextRequest) {
    try {
        const { text, targetLanguage = 'am', sourceLanguage = 'en' } = await request.json();

        if (!text) {
            return NextResponse.json(
                { success: false, error: 'Text is required' },
                { status: 400 }
            );
        }

        const languageNames: any = {
            en: 'English',
            am: 'Amharic',
            om: 'Oromo',
            ti: 'Tigrinya',
        };

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: `You are a professional translator. Translate the following text from ${languageNames[sourceLanguage]} to ${languageNames[targetLanguage]}. Maintain the tone and context of travel and tourism.`,
                },
                {
                    role: 'user',
                    content: text,
                },
            ],
            temperature: 0.3,
            max_tokens: 1000,
        });

        const translatedText = completion.choices[0].message.content;

        return NextResponse.json({
            success: true,
            data: {
                originalText: text,
                translatedText,
                sourceLanguage,
                targetLanguage,
            },
        });
    } catch (error: any) {
        console.error('Translation Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to translate' },
            { status: 500 }
        );
    }
}
