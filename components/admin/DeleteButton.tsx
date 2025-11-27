'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteButton({ id, type }: { id: string; type: 'city' | 'tour' | 'user' }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete this ${type}? This action cannot be undone.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/${type === 'city' ? 'cities' : type === 'tour' ? 'tours' : 'users'}/${id}`, {
                method: 'DELETE',
            });

            const data = await res.json();
            if (data.success) {
                alert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully!`);
                router.refresh();
            } else {
                alert(`Error deleting ${type}: ` + data.error);
            }
        } catch (error) {
            alert(`Error deleting ${type}`);
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    );
}
