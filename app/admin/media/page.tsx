'use client';

import { useState } from 'react';
import MediaUploader from '@/components/admin/MediaUploader';
import MediaGallery from '@/components/admin/MediaGallery';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MediaManagementPage() {
    const [activeFolder, setActiveFolder] = useState('cities');
    const [refreshKey, setRefreshKey] = useState(0);

    const folders = [
        { value: 'cities', label: 'Cities' },
        { value: 'tours', label: 'Tours' },
        { value: 'attractions', label: 'Attractions' },
        { value: 'general', label: 'General' },
    ];

    const handleUploadComplete = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Media Management</h1>
                <p className="text-gray-600 mt-2">
                    Upload and manage images and videos for your Ethiopian travel content
                </p>
            </div>

            {/* Folder Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Folder
                </label>
                <div className="flex gap-2">
                    {folders.map((folder) => (
                        <button
                            key={folder.value}
                            onClick={() => setActiveFolder(folder.value)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeFolder === folder.value
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {folder.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Upload & Gallery Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
                <Tabs defaultValue="upload" className="w-full">
                    <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0">
                        <TabsTrigger
                            value="upload"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Upload Media
                        </TabsTrigger>
                        <TabsTrigger
                            value="images"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Upload Images
                        </TabsTrigger>
                        <TabsTrigger
                            value="videos"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Upload Videos
                        </TabsTrigger>
                        <TabsTrigger
                            value="gallery"
                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-6 py-3"
                        >
                            Media Gallery
                        </TabsTrigger>
                    </TabsList>

                    <div className="p-6">
                        <TabsContent value="upload" className="mt-0">
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Upload Images</h3>
                                    <MediaUploader
                                        folder={activeFolder}
                                        resourceType="image"
                                        onUploadComplete={handleUploadComplete}
                                    />
                                </div>
                                <div className="border-t pt-6">
                                    <h3 className="text-lg font-semibold mb-4">Upload Videos</h3>
                                    <MediaUploader
                                        folder={activeFolder}
                                        resourceType="video"
                                        onUploadComplete={handleUploadComplete}
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="images" className="mt-0">
                            <MediaUploader
                                folder={activeFolder}
                                resourceType="image"
                                onUploadComplete={handleUploadComplete}
                            />
                        </TabsContent>

                        <TabsContent value="videos" className="mt-0">
                            <MediaUploader
                                folder={activeFolder}
                                resourceType="video"
                                onUploadComplete={handleUploadComplete}
                            />
                        </TabsContent>

                        <TabsContent value="gallery" className="mt-0">
                            <MediaGallery
                                key={refreshKey}
                                folder={activeFolder}
                                onRefresh={handleUploadComplete}
                            />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-900 mb-2">📝 Instructions</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                    <li>Select a folder (Cities, Tours, Attractions, or General) before uploading</li>
                    <li>Drag and drop files or click to select from your computer</li>
                    <li>Images are automatically optimized for web delivery</li>
                    <li>Copy URLs from the gallery to use in your seed data or content</li>
                    <li>Videos support streaming and adaptive quality</li>
                </ul>
            </div>
        </div>
    );
}
