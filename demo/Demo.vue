<script setup lang="ts">
import { ref } from 'vue';
// Import from source during dev (vite alias resolves the package to ./src).
import { AniaAvatar } from '../src/index';

const avatar = ref<InstanceType<typeof AniaAvatar> | null>(null);
const url = ref('');
const command = ref('action 1');
const status = ref('idle');

function loadUrl() {
  if (url.value) avatar.value?.load({ url: url.value });
}
function run() {
  const res = avatar.value?.runCommand(command.value);
  status.value = res ? `${res.ok ? 'ok' : 'err'}: ${res.message}` : 'no player';
}
</script>

<template>
  <div class="wrap">
    <h1>ania-avatar-vue</h1>
    <p>Vue 3 wrapper for the Ania animated-avatar player.</p>

    <AniaAvatar
      ref="avatar"
      :width="320"
      :height="320"
      :lip-sync-enabled="true"
      :lip-sync-intensity="0.6"
      @load="status = 'loaded'"
      @talk-start="status = 'talking'"
      @talk-end="status = 'idle'"
      @action-start="(id) => (status = `action: ${id}`)"
    />

    <div class="controls">
      <input v-model="url" placeholder="https://example.com/avatar.ania" />
      <button @click="loadUrl">Load</button>
    </div>

    <div class="controls">
      <button @click="avatar?.play()">Play</button>
      <button @click="avatar?.pause()">Pause</button>
      <button @click="avatar?.setTalking(true)">Talk</button>
      <button @click="avatar?.setTalking(false)">Stop</button>
    </div>

    <div class="controls">
      <input v-model="command" placeholder="e.g. action 1 / speed 2 4 / help" />
      <button @click="run">Run command</button>
    </div>

    <p class="status">status: {{ status }}</p>
  </div>
</template>
