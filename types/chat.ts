export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

export interface ModelConfig {
    name: string;
    modelId: string;
    size: string;
    description: string;
}

export interface ModelLoadingState {
    status: 'idle' | 'loading' | 'ready' | 'error';
    progress: number;
    message: string;
    error?: string;
}

export interface GenerationOptions {
    maxNewTokens?: number;
    temperature?: number;
    topK?: number;
    topP?: number;
    doSample?: boolean;
}

export type DeviceType = 'webgpu' | 'wasm';
