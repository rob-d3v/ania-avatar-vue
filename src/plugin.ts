// Optional Vue plugin: app.use(AniaAvatarPlugin) registers <AniaAvatar> and
// <AvatarChatbot> globally so they can be used without per-component imports.

import type { App, Plugin as VuePlugin } from 'vue';
import AniaAvatar from './components/AniaAvatar.vue';
import AvatarChatbot from './components/AvatarChatbot.vue';

export interface AniaAvatarPluginOptions {
  /** Override the global registration name for <AniaAvatar>. */
  avatarName?: string;
  /** Override the global registration name for <AvatarChatbot>. */
  chatbotName?: string;
}

export const AniaAvatarPlugin: VuePlugin = {
  install(app: App, options: AniaAvatarPluginOptions = {}) {
    app.component(options.avatarName ?? 'AniaAvatar', AniaAvatar);
    app.component(options.chatbotName ?? 'AvatarChatbot', AvatarChatbot);
  },
};

export default AniaAvatarPlugin;
