'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

interface UploadedFile {
    file: File;
    preview: string;
    status: 'pending' | 'uploading' | 'success' | 'error';
    progress: number;
    url?: string;
    error?: string;
}

interface MediaUploaderProps {
    folder?: string;
    resourceType?: 'image' | 'video';
    onUploadComplete?: (urls: string[]) => void;
}

export default function MediaUploader({
    folder = 'general',
    resourceType = 'image',
    onUploadComplete,
}: MediaUploaderProps) {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFiles = acceptedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
            status: 'pending' as const,
            progress: 0,
        }));
        setFiles((prev) => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: resourceType === 'image'
            ? { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] }
            : { 'video/*': ['.mp4', '.mov', '.avi', '.webm'] },
        multiple: true,
    });

    const uploadFile = async (index: number) => {
        const fileData = files[index];
        setFiles((prev) =>
            prev.map((f, i) =>
                i === index ? { ...f, status: 'uploading', progress: 0 } : f
            )
        );

        const formData = new FormData();
        formData.append('file', fileData.file);
        formData.append('folder', folder);
        formData.append('resourceType', resourceType);

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Upload failed');

            const result = await response.json();

            setFiles((prev) =>
                prev.map((f, i) =>
                    i === index
                        ? {
                            ...f,
                            status: 'success',
                            progress: 100,
                            url: result.data.secure_url,
                        }
                        : f
                )
            );

            if (onUploadComplete) {
                const successUrls = files
                    .filter((f) => f.status === 'success')
                    .map((f) => f.url!)
                    .concat(result.data.secure_url);
                onUploadComplete(successUrls);
            }
        } catch (error) {
            setFiles((prev) =>
                prev.map((f, i) =>
                    i === index
                        ? {
                            ...f,
                            status: 'error',
                            error: 'Upload failed. Please try again.',
                        }
                        : f
                )
            );
        }
    };

    const uploadAll = async () => {
        const pendingIndexes = files
            .map((f, i) => (f.status === 'pending' ? i : -1))
            .filter((i) => i !== -1);

        for (const index of pendingIndexes) {
            await uploadFile(index);
        }
    };

    const removeFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-4">
            {/* Dropzone */}
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
            >
                <input {...getInputProps()} />
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">
                    {isDragActive
                        ? `Drop ${resourceType}s here...`
                        : `Drag & drop ${resourceType}s here, or click to select`}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                    {resourceType === 'image'
                        ? 'Supports: PNG, JPG, JPEG, GIF, WebP'
                        : 'Supports: MP4, MOV, AVI, WebM'}
                </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold">
                            Files ({files.length})
                        </h3>
                        <button
                            onClick={uploadAll}
                            disabled={!files.some((f) => f.status === 'pending')}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Upload All
                        </button>
                    </div>

                    <div className="space-y-2">
                        {files.map((fileData, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 p-4 border rounded-lg"
                            >
                                {/* Preview */}
                                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                    {resourceType === 'image' ? (
                                        <img
                                            src={fileData.preview}
                                            alt={fileData.file.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <video
                                            src={fileData.preview}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {fileData.file.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    {fileData.status === 'uploading' && (
                                        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full transition-all"
                                                style={{ width: `${fileData.progress}%` }}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2">
                                    {fileData.status === 'success' && (
                                        <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}
                                    {fileData.status === 'error' && (
                                        <AlertCircle className="w-5 h-5 text-red-500" />
                                    )}
                                    {fileData.status === 'pending' && (
                                        <button
                                            onClick={() => uploadFile(index)}
                                            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Upload
                                        </button>
                                    )}
                                    <button
                                        onClick={() => removeFile(index)}
                                        className="p-1 hover:bg-gray-100 rounded"
                                    >
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
