import { type AniaAvatarData } from 'ania-avatar-core';
import type { AvatarChatbotProps } from '../props';
declare function sendMessage(text: string): Promise<void>;
declare const _default: import("vue").DefineComponent<AvatarChatbotProps, {
    sendMessage: typeof sendMessage;
    speak: (text: string) => Promise<void>;
    player: import("ania-avatar-core").AniaPlayerInstance | null | undefined;
    play: () => void | undefined;
    pause: () => void | undefined;
    setTalking: (t: boolean) => void | undefined;
    triggerAction: (id: string) => boolean | undefined;
    cancelAction: (force?: boolean) => void | undefined;
    runCommand: (line: string) => import("ania-avatar-core").CommandResult | undefined;
    getAvailableActions: () => import("ania-avatar-core").ActionInfo[];
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    load: (data: AniaAvatarData) => any;
    talkStart: () => any;
    talkEnd: () => any;
    actionStart: (actionId: string) => any;
    actionEnd: (actionId: string) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<AvatarChatbotProps> & Readonly<{
    onLoad?: ((data: AniaAvatarData) => any) | undefined;
    onTalkStart?: (() => any) | undefined;
    onTalkEnd?: (() => any) | undefined;
    onActionStart?: ((actionId: string) => any) | undefined;
    onActionEnd?: ((actionId: string) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    enableTTS: boolean;
    autoGreeting: boolean;
    assistantName: string;
    userName: string;
    ttsProvider: import("../props").TTSProvider;
    enableSTT: boolean;
    width: number;
    height: number;
    transparent: boolean;
    theme: import("../props").AvatarTheme;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
