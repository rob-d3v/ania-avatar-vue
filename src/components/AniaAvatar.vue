<script setup lang="ts">
// <AniaAvatar> — Vue 3 wrapper around the ania-avatar-core engine.
//
// Renders a <canvas>, creates a core player on mount, watches reactive props to
// re-load / re-configure the engine, and re-exposes imperative controls via
// defineExpose so a parent template-ref can drive it.

import { ref, computed, onMounted, watch, defineExpose } from 'vue';
import type { AniaAvatarData } from 'ania-avatar-core';
import {
  useAniaAvatar,
  type UseAniaAvatarLipSync,
} from '../composables/useAniaAvatar';
import type { AniaAvatarProps, AniaAvatarEmits } from '../props';

const props = withDefaults(defineProps<AniaAvatarProps>(), {
  width: 320,
  height: 320,
  transparent: false,
  theme: 'dark',
  autoCalculateSpeed: false,
  lipSyncEnabled: false,
  enableActionHotkeys: false,
  enablePostMessageControl: false,
});

const emit = defineEmits<AniaAvatarEmits>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

// Build a lip-sync bag from the flat props.
const lipSyncConfig = (): UseAniaAvatarLipSync => ({
  enabled: props.lipSyncEnabled,
  intensity: props.lipSyncIntensity,
  responsiveness: props.lipSyncResponsiveness,
  sustainStyle: props.lipSyncSustainStyle ?? undefined,
  wiggleSpeed: props.lipSyncWiggleSpeed ?? undefined,
});

const avatar = useAniaAvatar({
  avatarUrl: props.avatarUrl,
  avatarPassword: props.avatarPassword,
  avatarData: props.avatarData ?? null,
  authToken: props.authToken,
  width: props.width,
  height: props.height,
  idleSpeed: props.idleSpeed,
  talkSpeed: props.talkSpeed,
  autoCalculateSpeed: props.autoCalculateSpeed,
  lipSync: lipSyncConfig(),
  actions: props.actions,
  serverUrl: props.serverUrl ?? props.lipSyncServerUrl,
  fetchActionsFromServer: props.fetchActionsFromServer,
  locale: props.locale,
  enablePostMessageControl: props.enablePostMessageControl,
  postMessageOrigins: props.postMessageOrigins,
  onLoad: (data: AniaAvatarData) => emit('load', data),
  onTalkStart: () => emit('talkStart'),
  onTalkEnd: () => emit('talkEnd'),
  onActionStart: (id: string) => emit('actionStart', id),
  onActionEnd: (id: string) => emit('actionEnd', id),
});

onMounted(() => {
  if (!canvasRef.value) return;
  avatar.mount(canvasRef.value);

  // Optional initial action after first load.
  if (props.initialAction) {
    const off = avatar.player.value?.on('load', () => {
      if (props.initialAction) avatar.triggerAction(props.initialAction);
      off?.();
    });
  }
});

// --- Reactive prop -> engine wiring ---

// Re-load when the source changes.
watch(
  () => [props.avatarUrl, props.avatarPassword, props.authToken],
  () => {
    if (!avatar.player.value) return;
    if (props.avatarUrl) {
      void avatar.load({
        url: props.avatarUrl,
        password: props.avatarPassword,
        authToken: props.authToken,
      });
    }
  }
);

watch(
  () => props.avatarData,
  (data) => {
    if (data && avatar.player.value) void avatar.load({ data });
  }
);

// Re-configure lip-sync on any lip-sync prop change.
watch(
  () => [
    props.lipSyncEnabled,
    props.lipSyncIntensity,
    props.lipSyncResponsiveness,
    props.lipSyncSustainStyle,
    props.lipSyncWiggleSpeed,
  ],
  () => {
    if (avatar.player.value) avatar.configureLipsSync(lipSyncConfig());
  }
);

// Re-configure actions when the action set changes.
watch(
  () => props.actions,
  (next) => {
    if (next && avatar.player.value) avatar.configureActions(next);
  },
  { deep: true }
);

// Re-apply speeds at runtime.
watch(
  () => [props.idleSpeed, props.talkSpeed],
  () => {
    if (avatar.player.value) avatar.setSpeeds(props.idleSpeed, props.talkSpeed);
  }
);

const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
  background: props.transparent ? 'transparent' : undefined,
}));

const canvasStyle = computed(() => ({
  display: 'block',
  width: '100%',
  height: '100%',
}));

// Expose imperative API to parent template-refs.
defineExpose({
  player: avatar.player,
  loaded: avatar.loaded,
  isTalking: avatar.isTalking,
  actions: avatar.actions,
  activeAction: avatar.activeAction,
  error: avatar.error,
  load: avatar.load,
  play: avatar.play,
  pause: avatar.pause,
  setTalking: avatar.setTalking,
  triggerAction: avatar.triggerAction,
  cancelAction: avatar.cancelAction,
  configureActions: avatar.configureActions,
  configureLipsSync: avatar.configureLipsSync,
  setSpeeds: avatar.setSpeeds,
  getAvailableActions: avatar.getAvailableActions,
  runCommand: avatar.runCommand,
});
</script>

<template>
  <div class="ania-avatar" :class="`ania-avatar--${theme}`" :style="containerStyle">
    <canvas
      ref="canvasRef"
      class="ania-avatar__canvas"
      :width="width"
      :height="height"
      :style="canvasStyle"
    />
    <slot
      :loaded="avatar.loaded.value"
      :is-talking="avatar.isTalking.value"
      :active-action="avatar.activeAction.value"
      :actions="avatar.actions.value"
      :error="avatar.error.value"
    />
  </div>
</template>

<style scoped>
.ania-avatar {
  position: relative;
  display: inline-block;
  line-height: 0;
}
.ania-avatar__canvas {
  border-radius: 8px;
}
</style>
