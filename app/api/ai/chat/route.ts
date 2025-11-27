import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Tour from '@/models/Tour';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { message, conversationHistory = [] } = await request.json();

        if (!message) {
            return NextResponse.json(
                { success: false, error: 'Message is required' },
                { status: 400 }
            );
        }

        const cities = await City.find().limit(10);
        const tours = await Tour.find().populate('cityId').limit(10);

        const context = `You are a helpful AI travel assistant for Ethiopian tourism. 
    
Available Cities:
${cities.map(c => `- ${c.name}: ${c.description.substring(0, 100)}...`).join('\n')}

Available Tours:
${tours.map(t => `- ${t.title} (${(t.cityId as any)?.name}): $${t.price}, ${t.duration} days`).join('\n')}

Help users discover Ethiopian cities and tours, answer questions about bookings, and provide travel recommendations.`;

        const messages: any[] = [
            { role: 'system', content: context },
            ...conversationHistory,
            { role: 'user', content: message },
        ];

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages,
            temperature: 0.7,
            max_tokens: 500,
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({
            success: true,
            data: {
                message: reply,
                conversationHistory: [...conversationHistory,
                { role: 'user', content: message },
                { role: 'assistant', content: reply }
                ],
            },
        });
    } catch (error: any) {
        console.error('AI Chat Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to process chat' },
            { status: 500 }
        );
    }
}
