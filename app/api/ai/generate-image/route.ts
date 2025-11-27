import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openai';
import dbConnect from '@/lib/mongodb';
import City from '@/models/City';
import Tour from '@/models/Tour';

export async function POST(request: NextRequest) {
    try {
        await dbConnect();

        const { prompt, entityType, entityId } = await request.json();

        if (!prompt) {
            return NextResponse.json(
                { success: false, error: 'Prompt is required' },
                { status: 400 }
            );
        }

        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `Professional travel photography: ${prompt}. High quality, vibrant colors, inviting atmosphere.`,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
        });

        const imageUrl = response.data?.[0]?.url;

        if (!imageUrl) {
            throw new Error('Failed to generate image URL');
        }

        if (entityType && entityId) {
            if (entityType === 'city') {
                await City.findByIdAndUpdate(entityId, {
                    $push: { images: imageUrl },
                    aiGenerated: true,
                });
            } else if (entityType === 'tour') {
                await Tour.findByIdAndUpdate(entityId, {
                    $push: { images: imageUrl },
                    aiGenerated: true,
                });
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                imageUrl,
                prompt,
            },
        });
    } catch (error: any) {
        console.error('Image Generation Error:', error);
        return NextResponse.json(
            { success: false, error: error.message || 'Failed to generate image' },
            { status: 500 }
        );
    }
}
