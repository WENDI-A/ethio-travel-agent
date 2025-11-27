'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';
import Link from 'next/link';

interface City {
    _id: string;
    name: string;
    description: string;
    images: string[];
    attractions: string[];
    createdAt: string;
}

export default function CityEditPage() {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const [city, setCity] = useState<City | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        images: [''],
        attractions: [''],
    });

    useEffect(() => {
        if (id) {
            fetchCity();
        }
    }, [id]);

    const fetchCity = async () => {
        try {
            const res = await fetch(`/api/cities/${id}`);
            const data = await res.json();
            if (data.success) {
                setCity(data.data);
                setFormData({
                    name: data.data.name,
                    description: data.data.description,
                    images: data.data.images.length > 0 ? data.data.images : [''],
                    attractions: data.data.attractions.length > 0 ? data.data.attractions : [''],
                });
            }
        } catch (error) {
            console.error('Error fetching city:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Filter out empty strings
            const cleanedData = {
                name: formData.name,
                description: formData.description,
                images: formData.images.filter(img => img.trim() !== ''),
                attractions: formData.attractions.filter(attr => attr.trim() !== ''),
            };

            const res = await fetch(`/api/cities/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cleanedData),
            });

            const data = await res.json();
            if (data.success) {
                alert('City updated successfully!');
                router.push('/admin/cities');
            } else {
                alert('Error updating city: ' + data.error);
            }
        } catch (error) {
            alert('Error updating city');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this city? This action cannot be undone.')) return;

        setSaving(true);
        try {
            const res = await fetch(`/api/cities/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success) {
                alert('City deleted successfully!');
                router.push('/admin/cities');
            } else {
                alert('Error deleting city: ' + data.error);
            }
        } catch (error) {
            alert('Error deleting city');
        } finally {
            setSaving(false);
        }
    };

    const addImage = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages.length > 0 ? newImages : [''] });
    };

    const updateImage = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addAttraction = () => {
        setFormData({ ...formData, attractions: [...formData.attractions, ''] });
    };

    const removeAttraction = (index: number) => {
        const newAttractions = formData.attractions.filter((_, i) => i !== index);
        setFormData({ ...formData, attractions: newAttractions.length > 0 ? newAttractions : [''] });
    };

    const updateAttraction = (index: number, value: string) => {
        const newAttractions = [...formData.attractions];
        newAttractions[index] = value;
        setFormData({ ...formData, attractions: newAttractions });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!city) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">City not found</p>
                <Link href="/admin/cities" className="text-blue-600 hover:underline mt-4 inline-block">
                    Back to Cities
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
                        href="/admin/cities"
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Edit City</h1>
                        <p className="text-sm text-gray-500">Update city information and attractions</p>
                    </div>
                </div>

                <button
                    onClick={handleDelete}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete City
                </button>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* City Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            City Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

                    {/* Images */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Images
                            </label>
                            <button
                                type="button"
                                onClick={addImage}
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
                                        onChange={(e) => updateImage(index, e.target.value)}
                                        placeholder="https://example.com/image.jpg"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Attractions */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Attractions
                            </label>
                            <button
                                type="button"
                                onClick={addAttraction}
                                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                            >
                                <Plus className="w-4 h-4" />
                                Add Attraction
                            </button>
                        </div>
                        <div className="space-y-2">
                            {formData.attractions.map((attraction, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={attraction}
                                        onChange={(e) => updateAttraction(index, e.target.value)}
                                        placeholder="Attraction name"
                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    {formData.attractions.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeAttraction(index)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Created Date */}
                    <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-500">
                            Created: {new Date(city.createdAt).toLocaleDateString()}
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
                            href="/admin/cities"
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
