import { NextRequest, NextResponse } from 'next/server';
import { checkAvailability } from '@/lib/availability';

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const availability = await checkAvailability(id);
        return NextResponse.json(availability);
    } catch (error: any) {
        console.error('Availability check error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to check availability' },
            { status: 500 }
        );
    }
}
