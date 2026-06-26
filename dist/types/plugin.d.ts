import type { Plugin as VuePlugin } from 'vue';
export interface AniaAvatarPluginOptions {
    /** Override the global registration name for <AniaAvatar>. */
    avatarName?: string;
    /** Override the global registration name for <AvatarChatbot>. */
    chatbotName?: string;
}
export declare const AniaAvatarPlugin: VuePlugin;
export default AniaAvatarPlugin;
