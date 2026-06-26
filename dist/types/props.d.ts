import type { ActionConfig, AniaAvatarData } from 'ania-avatar-core';
export type PlayerPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type AvatarTheme = 'dark' | 'light' | 'blue' | 'purple';
export type LipSyncSustainStyle = 'hold' | 'wiggle';
export type TTSProvider = 'browser' | 'tiktok' | 'elevenlabs' | 'google' | 'azure' | 'piper';
export type STTProvider = 'browser' | 'google';
/** Props for <AniaAvatar>. Mirrors ania-avatar-react `AniaAvatarProps`. */
export interface AniaAvatarProps {
    avatarUrl?: string;
    avatarPassword?: string;
    avatarData?: AniaAvatarData | null;
    authToken?: string;
    position?: PlayerPosition;
    width?: number;
    height?: number;
    transparent?: boolean;
    theme?: AvatarTheme;
    locale?: string;
    idleSpeed?: number;
    talkSpeed?: number;
    autoCalculateSpeed?: boolean;
    lipSyncEnabled?: boolean;
    lipSyncServerUrl?: string;
    lipSyncIntensity?: number;
    lipSyncResponsiveness?: number;
    lipSyncSustainStyle?: LipSyncSustainStyle | null;
    lipSyncWiggleSpeed?: number | null;
    actions?: ActionConfig[];
    enableActionHotkeys?: boolean;
    initialAction?: string;
    initialActionLoop?: boolean;
    wakeWordEnabled?: boolean;
    wakeWordModelUrl?: string;
    wakeWordThreshold?: number;
    wakeWordWasmPaths?: string;
    enablePostMessageControl?: boolean;
    postMessageOrigins?: string[];
    serverUrl?: string;
    fetchActionsFromServer?: boolean;
}
/** Props for <AvatarChatbot>. Extends AniaAvatarProps with chat + TTS/STT. */
export interface AvatarChatbotProps extends AniaAvatarProps {
    webhookUrl?: string;
    webhookApiKey?: string;
    webhookHeaders?: Record<string, string>;
    enableTTS?: boolean;
    autoGreeting?: boolean;
    assistantName?: string;
    userName?: string;
    transparentChat?: boolean;
    ttsProvider?: TTSProvider;
    ttsVoice?: string;
    ttsVoiceId?: string;
    ttsGender?: 'auto' | 'male' | 'female';
    ttsRate?: number;
    ttsPitch?: number;
    ttsLang?: string;
    ttsModel?: string;
    ttsApiKey?: string;
    ttsApiUrl?: string;
    piperModelUrl?: string;
    piperModelConfigUrl?: string;
    piperSpeakerId?: number;
    piperPreload?: boolean;
    enableSTT?: boolean;
    sttProvider?: STTProvider;
    sttLang?: string;
    sttContinuous?: boolean;
    sttInterimResults?: boolean;
    sttApiKey?: string;
    sttApiUrl?: string;
    sttAutoSend?: boolean;
}
/** Events emitted by <AniaAvatar> / <AvatarChatbot>. */
export interface AniaAvatarEmits {
    load: [data: AniaAvatarData];
    talkStart: [];
    talkEnd: [];
    actionStart: [actionId: string];
    actionEnd: [actionId: string];
    close: [];
}
