import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Tour from '@/models/Tour';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { entityType, entityId, contentType = 'description' } = await request.json();

        if (!entityType || !entityId) {
            return NextResponse.json(
                { success: false, error: 'Entity type and ID are required' },
                { status: 400 }
            );
        }

        let entity;
        let prompt = '';

        if (entityType === 'city') {
            entity = await City.findById(entityId);
            if (!entity) {
                return NextResponse.json(
                    { success: false, error: 'City not found' },
                    { status: 404 }
                );
            }

            prompt = `Write a compelling ${contentType} for ${entity.name}, Ethiopia. 
      Include historical significance, cultural attractions, and why tourists should visit. 
      Make it engaging and informative, around 150-200 words.`;
        } else if (entityType === 'tour') {
            entity = await Tour.findById(entityId).populate('cityId');
            if (!entity) {
                return NextResponse.json(
                    { success: false, error: 'Tour not found' },
                    { status: 404 }
                );
            }

            prompt = `Write a compelling ${contentType} for a ${entity.duration}-day tour titled "${entity.title}" 
      in ${(entity.cityId as any)?.name}, Ethiopia. Price: $${entity.price}. 
      Make it exciting and highlight unique experiences. Around 150-200 words.`;
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content: 'You are a professional travel content writer specializing in Ethiopian tourism.',
                },
                {
                    role: 'user',
                    content: prompt,
                },
            ],
            temperature: 0.8,
            max_tokens: 400,
        });

        const generatedContent = completion.choices[0].message.content;

        if (entityType === 'city') {
            await City.findByIdAndUpdate(entityId, {
                description: generatedContent,
                aiGenerated: true,
            });
        } else if (entityType === 'tour') {
            await Tour.findByIdAndUpdate(entityId, {
                description: generatedContent,
                aiGenerated: true,
            });
        }

        return NextResponse.json({
            success: true,
            data: {
                content: generatedContent,
                entityType,
                entityId,
            },
        });
    } catch (error: any) {
        console.error('Content Generation Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to generate content' },
            { status: 500 }
        );
    }
}
