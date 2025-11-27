import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface UploadResult {
    public_id: string;
    secure_url: string;
    width?: number;
    height?: number;
    format: string;
    resource_type: 'image' | 'video' | 'raw';
    created_at: string;
    bytes: number;
}

/**
 * Upload image or video to Cloudinary
 * @param file - File buffer or base64 string
 * @param folder - Cloudinary folder (e.g., 'cities', 'tours', 'attractions')
 * @param resourceType - Type of resource ('image' or 'video')
 */
export async function uploadToCloudinary(
    file: string,
    folder: string = 'ethio-travel',
    resourceType: 'image' | 'video' = 'image'
): Promise<UploadResult> {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: `ethio-travel/${folder}`,
            resource_type: resourceType,
            transformation: resourceType === 'image'
                ? [
                    { width: 1920, height: 1080, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' }
                ]
                : undefined,
        });

        return {
            public_id: result.public_id,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
            format: result.format,
            resource_type: result.resource_type as 'image' | 'video' | 'raw',
            created_at: result.created_at,
            bytes: result.bytes,
        };
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Failed to upload to Cloudinary');
    }
}

/**
 * Delete media from Cloudinary
 * @param publicId - Cloudinary public ID
 * @param resourceType - Type of resource ('image' or 'video')
 */
export async function deleteFromCloudinary(
    publicId: string,
    resourceType: 'image' | 'video' = 'image'
): Promise<void> {
    try {
        await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
        });
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        throw new Error('Failed to delete from Cloudinary');
    }
}

/**
 * Get all media from a specific folder
 * @param folder - Cloudinary folder path
 */
export async function getMediaByFolder(folder: string = 'ethio-travel') {
    try {
        const result = await cloudinary.api.resources({
            type: 'upload',
            prefix: `ethio-travel/${folder}`,
            max_results: 500,
        });

        return result.resources;
    } catch (error) {
        console.error('Cloudinary fetch error:', error);
        throw new Error('Failed to fetch media from Cloudinary');
    }
}

/**
 * Get Cloudinary URL with transformations
 * @param publicId - Cloudinary public ID
 * @param transformations - Transformation options
 */
export function getCloudinaryUrl(
    publicId: string,
    transformations?: {
        width?: number;
        height?: number;
        crop?: string;
        quality?: string;
    }
): string {
    return cloudinary.url(publicId, {
        secure: true,
        ...transformations,
    });
}

export default cloudinary;
