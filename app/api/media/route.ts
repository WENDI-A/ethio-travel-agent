import { NextRequest, NextResponse } from 'next/server';
import { deleteFromCloudinary, getMediaByFolder } from '@/lib/cloudinary';

// GET - Fetch media by folder
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const folder = searchParams.get('folder') || '';

        const media = await getMediaByFolder(folder);

        return NextResponse.json({
            success: true,
            data: media,
        });
    } catch (error) {
        console.error('Fetch media error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch media' },
            { status: 500 }
        );
    }
}

// DELETE - Remove media from Cloudinary
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const publicId = searchParams.get('publicId');
        const resourceType = searchParams.get('resourceType') as 'image' | 'video' || 'image';

        if (!publicId) {
            return NextResponse.json(
                { error: 'No public ID provided' },
                { status: 400 }
            );
        }

        await deleteFromCloudinary(publicId, resourceType);

        return NextResponse.json({
            success: true,
            message: 'Media deleted successfully',
        });
    } catch (error) {
        console.error('Delete media error:', error);
        return NextResponse.json(
            { error: 'Failed to delete media' },
            { status: 500 }
        );
    }
}
