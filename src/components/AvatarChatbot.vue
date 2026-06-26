<script setup lang="ts">
// <AvatarChatbot> — <AniaAvatar> + a chat panel.
//
// Sends user messages to `webhookUrl`, speaks the reply via the active core TTS
// plugin (configured from the tts* props), and drives the avatar's talking
// state while audio plays. Exposes the same imperative surface as <AniaAvatar>
// plus `sendMessage`.

import { ref, computed, reactive, onMounted, onBeforeUnmount, defineExpose } from 'vue';
import {
  PluginRegistry,
  registerBuiltins,
  TTS_PROVIDER_TO_PLUGIN,
  type TTSEngine,
  type AniaAvatarData,
} from 'ania-avatar-core';
import AniaAvatar from './AniaAvatar.vue';
import type { AvatarChatbotProps, AniaAvatarEmits } from '../props';

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant' | 'error';
  content: string;
  isWaiting?: boolean;
}

const props = withDefaults(defineProps<AvatarChatbotProps>(), {
  width: 320,
  height: 320,
  transparent: false,
  theme: 'dark',
  enableTTS: true,
  autoGreeting: false,
  assistantName: 'Ania',
  userName: 'You',
  ttsProvider: 'browser',
  enableSTT: false,
});

const emit = defineEmits<AniaAvatarEmits>();

const avatarRef = ref<InstanceType<typeof AniaAvatar> | null>(null);
const messages = reactive<ChatMessage[]>([]);
const draft = ref('');
const isLoading = ref(false);
const open = ref(true);
let nextId = 1;

// ----- TTS via core plugin registry -----
const registry = new PluginRegistry();
registerBuiltins(registry);
let ttsEngine: TTSEngine | null = null;

const resolveTtsEngine = async (): Promise<TTSEngine | null> => {
  if (!props.enableTTS) return null;
  if (ttsEngine) return ttsEngine;
  const pluginId = TTS_PROVIDER_TO_PLUGIN[props.ttsProvider] ?? 'tts-browser';
  registry.setActive('tts', pluginId);
  const engine = (await registry.resolveEngine('tts', {
    config: {
      provider: props.ttsProvider,
      apiKey: props.ttsApiKey,
      apiUrl: props.ttsApiUrl,
      voiceId: props.ttsVoiceId ?? props.ttsVoice,
      model: props.ttsModel,
      lang: props.ttsLang,
      gender: props.ttsGender,
      rate: props.ttsRate,
      pitch: props.ttsPitch,
      piperModelUrl: props.piperModelUrl,
      piperModelConfigUrl: props.piperModelConfigUrl,
      piperSpeakerId: props.piperSpeakerId,
    },
  })) as TTSEngine | null;
  ttsEngine = engine;
  return engine;
};

const speak = async (text: string): Promise<void> => {
  const inst = avatarRef.value;
  if (!text || !inst) return;
  if (!props.enableTTS) return;
  try {
    const engine = await resolveTtsEngine();
    if (!engine?.speak) return;
    inst.setTalking(true);
    emit('talkStart');
    await engine.speak(text, { lang: props.ttsLang, rate: props.ttsRate, pitch: props.ttsPitch });
  } catch {
    /* swallow TTS errors; chat still works */
  } finally {
    avatarRef.value?.setTalking(false);
    emit('talkEnd');
  }
};

// ----- Chat backend (webhook) -----
const buildHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (props.webhookApiKey) headers['Authorization'] = `Bearer ${props.webhookApiKey}`;
  return { ...headers, ...(props.webhookHeaders ?? {}) };
};

const parseReply = (data: unknown): string => {
  if (typeof data === 'string') return data;
  if (data && typeof data === 'object') {
    const d = data as Record<string, unknown>;
    const v = d.output ?? d.reply ?? d.message ?? d.text ?? d.response;
    if (typeof v === 'string') return v;
  }
  return JSON.stringify(data);
};

async function sendMessage(text: string): Promise<void> {
  const content = text.trim();
  if (!content) return;
  messages.push({ id: nextId++, role: 'user', content });
  draft.value = '';

  if (!props.webhookUrl) {
    const reply = `(${props.assistantName}) No webhookUrl configured.`;
    messages.push({ id: nextId++, role: 'assistant', content: reply });
    void speak(reply);
    return;
  }

  const waiting: ChatMessage = { id: nextId++, role: 'assistant', content: '…', isWaiting: true };
  messages.push(waiting);
  isLoading.value = true;
  try {
    const res = await fetch(props.webhookUrl, {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({
        message: content,
        user: props.userName,
        assistant: props.assistantName,
      }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.json().catch(() => res.text());
    const reply = parseReply(raw);
    waiting.content = reply;
    waiting.isWaiting = false;
    void speak(reply);
  } catch (err) {
    waiting.role = 'error';
    waiting.content = `Error: ${(err as Error).message}`;
    waiting.isWaiting = false;
  } finally {
    isLoading.value = false;
  }
}

const onSubmit = (): void => {
  void sendMessage(draft.value);
};

onMounted(() => {
  if (props.autoGreeting) {
    const greeting = `Hi, I'm ${props.assistantName}!`;
    messages.push({ id: nextId++, role: 'assistant', content: greeting });
    void speak(greeting);
  }
});

onBeforeUnmount(() => {
  ttsEngine?.stop?.();
  ttsEngine?.cleanup?.();
});

const onClose = (): void => {
  open.value = false;
  emit('close');
};

const chatStyle = computed(() => ({
  background: props.transparentChat ? 'transparent' : undefined,
}));

// Re-expose the avatar's imperative API + sendMessage.
defineExpose({
  sendMessage,
  speak,
  get player() {
    return avatarRef.value?.player;
  },
  play: () => avatarRef.value?.play(),
  pause: () => avatarRef.value?.pause(),
  setTalking: (t: boolean) => avatarRef.value?.setTalking(t),
  triggerAction: (id: string) => avatarRef.value?.triggerAction(id),
  cancelAction: (force?: boolean) => avatarRef.value?.cancelAction(force),
  runCommand: (line: string) => avatarRef.value?.runCommand(line),
  getAvailableActions: () => avatarRef.value?.getAvailableActions() ?? [],
});

const onAvatarLoad = (data: AniaAvatarData): void => emit('load', data);
const onActionStart = (id: string): void => emit('actionStart', id);
const onActionEnd = (id: string): void => emit('actionEnd', id);
</script>

<template>
  <div v-if="open" class="ania-chatbot" :class="`ania-chatbot--${theme}`">
    <AniaAvatar
      ref="avatarRef"
      :avatar-url="avatarUrl"
      :avatar-password="avatarPassword"
      :avatar-data="avatarData"
      :auth-token="authToken"
      :width="width"
      :height="height"
      :transparent="transparent"
      :theme="theme"
      :idle-speed="idleSpeed"
      :talk-speed="talkSpeed"
      :auto-calculate-speed="autoCalculateSpeed"
      :lip-sync-enabled="lipSyncEnabled"
      :lip-sync-intensity="lipSyncIntensity"
      :lip-sync-responsiveness="lipSyncResponsiveness"
      :lip-sync-sustain-style="lipSyncSustainStyle"
      :lip-sync-wiggle-speed="lipSyncWiggleSpeed"
      :actions="actions"
      :enable-action-hotkeys="enableActionHotkeys"
      :server-url="serverUrl ?? lipSyncServerUrl"
      :fetch-actions-from-server="fetchActionsFromServer"
      :enable-post-message-control="enablePostMessageControl"
      :post-message-origins="postMessageOrigins"
      :locale="locale"
      @load="onAvatarLoad"
      @action-start="onActionStart"
      @action-end="onActionEnd"
    />

    <div class="ania-chatbot__panel" :style="chatStyle">
      <header class="ania-chatbot__header">
        <span class="ania-chatbot__title">{{ assistantName }}</span>
        <button type="button" class="ania-chatbot__close" aria-label="Close" @click="onClose">
          ×
        </button>
      </header>

      <div class="ania-chatbot__messages">
        <div
          v-for="m in messages"
          :key="m.id"
          class="ania-chatbot__msg"
          :class="`ania-chatbot__msg--${m.role}`"
        >
          {{ m.content }}
        </div>
      </div>

      <form class="ania-chatbot__form" @submit.prevent="onSubmit">
        <input
          v-model="draft"
          class="ania-chatbot__input"
          type="text"
          :placeholder="`Message ${assistantName}…`"
          :disabled="isLoading"
        />
        <button type="submit" class="ania-chatbot__send" :disabled="isLoading || !draft.trim()">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.ania-chatbot {
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
  font-family: system-ui, sans-serif;
}
.ania-chatbot__panel {
  display: flex;
  flex-direction: column;
  width: 320px;
  max-width: 100%;
  height: 280px;
  border-radius: 12px;
  background: #14141f;
  color: #e6e6f0;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.35);
}
.ania-chatbot__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  background: linear-gradient(90deg, #a855f7, #ff1b8d);
  font-weight: 600;
}
.ania-chatbot__close {
  background: none;
  border: none;
  color: inherit;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
}
.ania-chatbot__messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.ania-chatbot__msg {
  padding: 6px 10px;
  border-radius: 10px;
  max-width: 85%;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-word;
}
.ania-chatbot__msg--user {
  align-self: flex-end;
  background: #2a2a45;
}
.ania-chatbot__msg--assistant {
  align-self: flex-start;
  background: #3a2a55;
}
.ania-chatbot__msg--error {
  align-self: flex-start;
  background: #5a1f2f;
}
.ania-chatbot__form {
  display: flex;
  gap: 6px;
  padding: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.ania-chatbot__input {
  flex: 1;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #0e0e18;
  color: inherit;
  outline: none;
}
.ania-chatbot__send {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #a855f7;
  color: white;
  font-weight: 600;
  cursor: pointer;
}
.ania-chatbot__send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
