'use client'

import type { DeviceType, ModelLoadingState } from '@/types/chat';

class ModelLoader {
    private static instance: ModelLoader;
    private model: any = null;
    private loadingState: ModelLoadingState = {
        status: 'idle',
        progress: 0,
        message: 'Not initialized'
    };
    private listeners: Set<(state: ModelLoadingState) => void> = new Set();
    private deviceType: DeviceType = 'wasm';

    private constructor() {
        this.deviceType = 'wasm';
        void this.detectDevice();
    }

    static getInstance(): ModelLoader {
        if (!ModelLoader.instance) {
            ModelLoader.instance = new ModelLoader();
        }
        return ModelLoader.instance;
    }

    private async loadTransformers(): Promise<any> {
        if (typeof window === 'undefined') {
            throw new Error('Transformers.js can only be loaded in the browser');
        }
        const w = window as any;
        if (w.transformers?.pipeline && w.transformers?.env) {
            return w.transformers;
        }
        await new Promise<void>((resolve, reject) => {
            const existing = document.querySelector('script[data-transformers-cdn]') as HTMLScriptElement | null;
            if (existing) return resolve();
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js';
            script.async = true;
            script.crossOrigin = 'anonymous';
            script.dataset.transformersCdn = 'true';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Transformers.js from CDN'));
            document.head.appendChild(script);
        });
        const w2 = window as any;
        if (!w2.transformers) {
            throw new Error('Transformers global not found after CDN load');
        }
        return w2.transformers;
    }

    private async detectDevice(): Promise<void> {
        if (typeof window === 'undefined') {
            this.deviceType = 'wasm';
            return;
        }
        try {
            if ('gpu' in navigator) {
                const adapter = await (navigator as any).gpu?.requestAdapter();
                if (adapter) {
                    this.deviceType = 'webgpu';
                    console.log('✅ WebGPU detected and will be used for inference');
                    return;
                }
            }
        } catch {
            console.warn('WebGPU not available, falling back to WASM');
        }
        this.deviceType = 'wasm';
        console.log('ℹ️ Using WASM for inference (WebGPU not available)');
    }

    getDeviceType(): DeviceType {
        return this.deviceType;
    }

    subscribe(listener: (state: ModelLoadingState) => void): () => void {
        this.listeners.add(listener);
        listener(this.loadingState);
        return () => this.listeners.delete(listener);
    }

    private updateState(update: Partial<ModelLoadingState>): void {
        this.loadingState = { ...this.loadingState, ...update };
        this.listeners.forEach(listener => listener(this.loadingState));
    }

    async loadModel(modelId: string = 'Xenova/distil-gpt2'): Promise<any> {
        if (this.model && this.loadingState.status === 'ready') {
            return this.model;
        }
        try {
            this.updateState({
                status: 'loading',
                progress: 0,
                message: 'Initializing model...'
            });

            const tf = await this.loadTransformers();
            const { pipeline, env } = tf;

            if (env) {
                env.allowLocalModels = false;
                env.allowRemoteModels = true;
                if (env.backends?.onnx?.wasm) {
                    env.backends.onnx.wasm.proxy = false;
                }
            }

            this.updateState({
                progress: 10,
                message: 'Downloading model files...'
            });

            this.model = await pipeline('text-generation', modelId, {
                progress_callback: (progress: any) => {
                    if (progress.status === 'progress') {
                        const percent = Math.round((progress.loaded / progress.total) * 100);
                        this.updateState({
                            progress: Math.min(percent, 90),
                            message: `Downloading: ${progress.file} (${percent}%)`
                        });
                    } else if (progress.status === 'done') {
                        this.updateState({
                            progress: 95,
                            message: 'Initializing model...'
                        });
                    }
                }
            });

            this.updateState({
                status: 'ready',
                progress: 100,
                message: `Model ready! Using ${this.deviceType.toUpperCase()}`
            });

            console.log('✅ Model loaded successfully');
            return this.model;

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.updateState({
                status: 'error',
                progress: 0,
                message: 'Failed to load model',
                error: errorMessage
            });
            console.error('❌ Model loading failed:', error);
            throw error;
        }
    }

    getModel(): any {
        return this.model;
    }

    getLoadingState(): ModelLoadingState {
        return this.loadingState;
    }

    isReady(): boolean {
        return this.loadingState.status === 'ready';
    }

    // 👉 NEW METHOD: Answer user questions
    async generateAnswer(prompt: string): Promise<string> {
        if (!this.isReady() || !this.model) {
            throw new Error('Model is not ready yet');
        }
        const output = await this.model(prompt, { max_new_tokens: 100 });
        return output[0]?.generated_text ?? '';
    }
}

export default ModelLoader;