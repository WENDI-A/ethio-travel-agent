'use client';

import { StarIcon } from '@heroicons/react/24/solid';
import { formatDistanceToNow } from 'date-fns';

interface Review {
    _id: string;
    userId: {
        name: string;
        email: string;
    };
    rating: number;
    comment: string;
    createdAt: string;
}

interface ReviewCardProps {
    review: Review;
    canEdit?: boolean;
    onDelete?: (id: string) => void;
}

export default function ReviewCard({ review, canEdit, onDelete }: ReviewCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-start justify-between mb-3">
                <div>
                    <h4 className="font-semibold text-lg">{review.userId.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon
                                    key={star}
                                    className={`w-5 h-5 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                </div>
                {canEdit && (
                    <button
                        onClick={() => onDelete?.(review._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                    >
                        Delete
                    </button>
                )}
            </div>
            <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
        </div>
    );
}
