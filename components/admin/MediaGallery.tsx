'use client';

import { useState, useEffect } from 'react';
import { Trash2, Copy, CheckCircle, Image as ImageIcon, Video as VideoIcon } from 'lucide-react';

interface MediaItem {
    public_id: string;
    secure_url: string;
    resource_type: 'image' | 'video';
    format: string;
    created_at: string;
    bytes: number;
    width?: number;
    height?: number;
}

interface MediaGalleryProps {
    folder?: string;
    onRefresh?: () => void;
}

export default function MediaGallery({ folder = '', onRefresh }: MediaGalleryProps) {
    const [media, setMedia] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

    useEffect(() => {
        fetchMedia();
    }, [folder]);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const response = await fetch(`/api/media?folder=${folder}`);
            const result = await response.json();
            setMedia(result.data || []);
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteMedia = async (publicId: string, resourceType: 'image' | 'video') => {
        if (!confirm('Are you sure you want to delete this media?')) return;

        try {
            const response = await fetch(
                `/api/media?publicId=${encodeURIComponent(publicId)}&resourceType=${resourceType}`,
                { method: 'DELETE' }
            );

            if (response.ok) {
                setMedia((prev) => prev.filter((m) => m.public_id !== publicId));
                if (onRefresh) onRefresh();
            }
        } catch (error) {
            console.error('Failed to delete media:', error);
            alert('Failed to delete media');
        }
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(url);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const filteredMedia = media.filter((m) =>
        filter === 'all' ? true : m.resource_type === filter
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Filter */}
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg ${filter === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All ({media.length})
                </button>
                <button
                    onClick={() => setFilter('image')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${filter === 'image'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <ImageIcon className="w-4 h-4" />
                    Images ({media.filter((m) => m.resource_type === 'image').length})
                </button>
                <button
                    onClick={() => setFilter('video')}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 ${filter === 'video'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <VideoIcon className="w-4 h-4" />
                    Videos ({media.filter((m) => m.resource_type === 'video').length})
                </button>
            </div>

            {/* Gallery Grid */}
            {filteredMedia.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    No {filter !== 'all' ? filter + 's' : 'media'} found
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMedia.map((item) => (
                        <div
                            key={item.public_id}
                            className="group relative border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
                        >
                            {/* Media Preview */}
                            <div className="aspect-video bg-gray-100 relative">
                                {item.resource_type === 'image' ? (
                                    <img
                                        src={item.secure_url}
                                        alt={item.public_id}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <video
                                        src={item.secure_url}
                                        className="w-full h-full object-cover"
                                        controls
                                    />
                                )}

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                    <button
                                        onClick={() => copyUrl(item.secure_url)}
                                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                        title="Copy URL"
                                    >
                                        {copiedUrl === item.secure_url ? (
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        ) : (
                                            <Copy className="w-5 h-5 text-gray-700" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => deleteMedia(item.public_id, item.resource_type)}
                                        className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5 text-red-500" />
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-3">
                                <p className="text-xs font-mono text-gray-600 truncate" title={item.public_id}>
                                    {item.public_id.split('/').pop()}
                                </p>
                                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                                    <span>{item.format.toUpperCase()}</span>
                                    <span>{(item.bytes / 1024 / 1024).toFixed(2)} MB</span>
                                </div>
                                {item.width && item.height && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        {item.width} × {item.height}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
