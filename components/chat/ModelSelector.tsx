'use client';

import { ModelConfig } from '@/types/chat';

interface ModelSelectorProps {
    selectedModel: string;
    onModelChange: (modelId: string) => void;
    disabled?: boolean;
}

const AVAILABLE_MODELS: ModelConfig[] = [
    {
        name: 'Qwen 1.5 0.5B Chat',
        modelId: 'Xenova/Qwen1.5-0.5B-Chat',
        size: '~500MB',
        description: 'Fast and lightweight'
    },
    {
        name: 'Qwen 1.5 1.8B Chat',
        modelId: 'Xenova/Qwen1.5-1.8B-Chat',
        size: '~1.8GB',
        description: 'Better quality, slower'
    }
];

export default function ModelSelector({ selectedModel, onModelChange, disabled }: ModelSelectorProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                AI Model
            </label>
            <select
                value={selectedModel}
                onChange={(e) => onModelChange(e.target.value)}
                disabled={disabled}
                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {AVAILABLE_MODELS.map((model) => (
                    <option key={model.modelId} value={model.modelId}>
                        {model.name} ({model.size}) - {model.description}
                    </option>
                ))}
            </select>
        </div>
    );
}
