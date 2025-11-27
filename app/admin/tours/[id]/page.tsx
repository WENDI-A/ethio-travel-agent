'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';
import Link from 'next/link';

interface Tour {
    _id: string;
    title: string;
    description: string;
    cityId: { _id: string; name: string };
    price: number;
    duration: number;
    images: string[];
    highlights: string[];
    included: string[];
    excluded: string[];
    createdAt: string;
}

export default function TourEditPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const [tour, setTour] = useState<Tour | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: 0,
        duration: 1,
        images: [''],
        highlights: [''],
        included: [''],
        excluded: [''],
    });

    useEffect(() => {
        if (id) {
            fetchTour();
        }
    }, [id]);

    const fetchTour = async () => {
        try {
            const res = await fetch(`/api/tours/${id}`);
            const data = await res.json();
            if (data.success) {
                setTour(data.data);
                setFormData({
                    title: data.data.title,
                    description: data.data.description,
                    price: data.data.price,
                    duration: data.data.duration,
                    images: data.data.images.length > 0 ? data.data.images : [''],
                    highlights: data.data.highlights.length > 0 ? data.data.highlights : [''],
                    included: data.data.included.length > 0 ? data.data.included : [''],
                    excluded: data.data.excluded.length > 0 ? data.data.excluded : [''],
                });
            }
        } catch (error) {
            console.error('Error fetching tour:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const cleanedData = {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                duration: Number(formData.duration),
                images: formData.images.filter(img => img.trim() !== ''),
                highlights: formData.highlights.filter(h => h.trim() !== ''),
                included: formData.included.filter(i => i.trim() !== ''),
                excluded: formData.excluded.filter(e => e.trim() !== ''),
            };

            const res = await fetch(`/api/tours/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedData),
            });

            const data = await res.json();
            if (data.success) {
                alert('Tour updated successfully!');
                router.push('/admin/tours');
            } else {
                alert('Error updating tour: ' + data.error);
            }
        } catch (error) {
            alert('Error updating tour');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this tour? This action cannot be undone.')) return;

        setSaving(true);
        try {
            const res = await fetch(`/api/tours/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success) {
                alert('Tour deleted successfully!');
                router.push('/admin/tours');
            } else {
                alert('Error deleting tour: ' + data.error);
            }
        } catch (error) {
            alert('Error deleting tour');
        } finally {
            setSaving(false);
        }
    };

    const addToArray = (field: 'images' | 'highlights' | 'included' | 'excluded') => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeFromArray = (field: 'images' | 'highlights' | 'included' | 'excluded', index: number) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [''] });
    };

    const updateArrayItem = (field: 'images' | 'highlights' | 'included' | 'excluded', index: number, value: string) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Tour not found</p>
                <Link href="/admin/tours" className="text-blue-600 hover:underline mt-4 inline-block">
                    Back to Tours
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/tours"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit Tour</h1>
                        <p className="text-sm text-gray-500">Update tour information and details</p>
                    </div>
                </div>

                <button
                    onClick={handleDelete}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete Tour
                </button>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tour Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                            Tour Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Price and Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                Price (USD)
                            </label>
                            <input
                                type="number"
                                id="price"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                min="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (days)
                            </label>
                            <input
                                type="number"
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Images */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Images</label>
                            <button
                                type="button"
                                onClick={() => addToArray('images')}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Image
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.images.map((image, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="url"
                                        value={image}
                                        onChange={(e) => updateArrayItem('images', index, e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFromArray('images', index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Highlights */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Highlights</label>
                            <button
                                type="button"
                                onClick={() => addToArray('highlights')}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Highlight
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.highlights.map((highlight, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={highlight}
                                        onChange={(e) => updateArrayItem('highlights', index, e.target.value)}
                                        placeholder="Tour highlight"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.highlights.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFromArray('highlights', index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Included */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Included</label>
                            <button
                                type="button"
                                onClick={() => addToArray('included')}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Item
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.included.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayItem('included', index, e.target.value)}
                                        placeholder="What's included"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.included.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFromArray('included', index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Excluded */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">Excluded</label>
                            <button
                                type="button"
                                onClick={() => addToArray('excluded')}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Item
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.excluded.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={item}
                                        onChange={(e) => updateArrayItem('excluded', index, e.target.value)}
                                        placeholder="What's not included"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.excluded.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFromArray('excluded', index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* City Info */}
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500 mb-2">
                            City: {tour.cityId?.name || 'Unknown'}
                        </p>
                        <p className="text-sm text-gray-500">
                            Created: {new Date(tour.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                        <Link
                            href="/admin/tours"
                            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
