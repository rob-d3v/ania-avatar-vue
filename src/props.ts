// Shared prop type definitions for <AniaAvatar> and <AvatarChatbot>.
//
// These mirror the ania-avatar-react `AniaAvatarProps` / `AvatarChatbotProps`
// so the whole ecosystem shares one prop vocabulary.

import type { ActionConfig, AniaAvatarData } from 'ania-avatar-core';

export type PlayerPosition = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
export type AvatarTheme = 'dark' | 'light' | 'blue' | 'purple';
export type LipSyncSustainStyle = 'hold' | 'wiggle';
export type TTSProvider = 'browser' | 'tiktok' | 'elevenlabs' | 'google' | 'azure' | 'piper';
export type STTProvider = 'browser' | 'google';

/** Props for <AniaAvatar>. Mirrors ania-avatar-react `AniaAvatarProps`. */
export interface AniaAvatarProps {
  // ----- Source -----
  avatarUrl?: string;
  avatarPassword?: string;
  avatarData?: AniaAvatarData | null;
  authToken?: string;
  // ----- Layout / appearance -----
  position?: PlayerPosition;
  width?: number;
  height?: number;
  transparent?: boolean;
  theme?: AvatarTheme;
  // ----- i18n -----
  locale?: string;
  // ----- Animation speed -----
  idleSpeed?: number;
  talkSpeed?: number;
  autoCalculateSpeed?: boolean;
  // ----- Lip sync -----
  lipSyncEnabled?: boolean;
  lipSyncServerUrl?: string;
  lipSyncIntensity?: number;
  lipSyncResponsiveness?: number;
  lipSyncSustainStyle?: LipSyncSustainStyle | null;
  lipSyncWiggleSpeed?: number | null;
  // ----- Actions -----
  actions?: ActionConfig[];
  enableActionHotkeys?: boolean;
  initialAction?: string;
  initialActionLoop?: boolean;
  // ----- Wake word -----
  wakeWordEnabled?: boolean;
  wakeWordModelUrl?: string;
  wakeWordThreshold?: number;
  wakeWordWasmPaths?: string;
  // ----- External control -----
  enablePostMessageControl?: boolean;
  postMessageOrigins?: string[];
  // ----- Server -----
  serverUrl?: string;
  fetchActionsFromServer?: boolean;
}

/** Props for <AvatarChatbot>. Extends AniaAvatarProps with chat + TTS/STT. */
export interface AvatarChatbotProps extends AniaAvatarProps {
  // ----- Webhook / chat backend -----
  webhookUrl?: string;
  webhookApiKey?: string;
  webhookHeaders?: Record<string, string>;
  enableTTS?: boolean;
  autoGreeting?: boolean;
  assistantName?: string;
  userName?: string;
  transparentChat?: boolean;
  // ----- TTS -----
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
  // ----- Piper TTS (browser ONNX) -----
  piperModelUrl?: string;
  piperModelConfigUrl?: string;
  piperSpeakerId?: number;
  piperPreload?: boolean;
  // ----- STT -----
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
