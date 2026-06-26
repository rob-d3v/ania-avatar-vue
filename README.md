# ania-avatar-vue

Vue 3 wrapper for the **Ania animated-avatar player**. It wraps the framework-
agnostic [`ania-avatar-core`](https://github.com/rob-d3v/ania-avatar-core)
engine and exposes idiomatic Vue 3 building blocks:

- **`<AniaAvatar>`** — mounts the avatar on a `<canvas>` and reacts to props.
- **`<AvatarChatbot>`** — `<AniaAvatar>` plus a chat panel (webhook + TTS).
- **`useAniaAvatar()`** — Composition API composable with reactive state +
  imperative methods (`runCommand`, `triggerAction`, `setTalking`, `play`, `pause`, …).
- **`AniaAvatarPlugin`** — optional `app.use(...)` to register the components globally.

The core engine is **bundled into this package's `dist`**, so you only install
one dependency and the CDN build is fully self-contained.

## Install

```bash
npm install ania-avatar-vue
# vue is a peer dependency (>=3.3)
```

## Quick start — `<AniaAvatar>`

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { AniaAvatar } from 'ania-avatar-vue';

const avatar = ref();

function wave() {
  avatar.value?.triggerAction('wave');
}
</script>

<template>
  <AniaAvatar
    ref="avatar"
    avatar-url="/avatars/ania.ania"
    avatar-password="secret"
    :width="320"
    :height="320"
    :lip-sync-enabled="true"
    :lip-sync-intensity="0.6"
    @load="() => console.log('avatar loaded')"
    @talk-start="() => console.log('talking')"
    @action-start="(id) => console.log('action', id)"
  />
  <button @click="wave">Wave</button>
</template>
```

## Quick start — `useAniaAvatar()` composable

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAniaAvatar } from 'ania-avatar-vue';

const canvas = ref<HTMLCanvasElement | null>(null);

const {
  loaded, isTalking, actions, activeAction,
  mount, runCommand, triggerAction, setTalking, play, pause,
} = useAniaAvatar({
  avatarUrl: '/avatars/ania.ania',
  width: 320,
  height: 320,
  lipSync: { enabled: true, intensity: 0.6 },
});

// Call `mount(el)` once with your canvas/container; it creates the core player,
// wires events to the reactive refs above, and auto-loads `avatarUrl`.
onMounted(() => {
  if (canvas.value) mount(canvas.value);
});
</script>

<template>
  <canvas ref="canvas" :width="320" :height="320" />
  <p>Talking: {{ isTalking }} · loaded: {{ loaded }}</p>
  <button @click="runCommand('action 1')">Action 1</button>
  <button @click="setTalking(true)">Talk</button>
</template>
```

> In practice you'll usually use `<AniaAvatar>`, which calls `mount()` for you on
> a managed `<canvas>`. Use the composable directly when you want full control of
> the DOM / multiple players.

## `<AvatarChatbot>` (chat + TTS)

```vue
<template>
  <AvatarChatbot
    avatar-url="/avatars/ania.ania"
    webhook-url="https://n8n.example.com/webhook/ania"
    :enable-tts="true"
    tts-provider="browser"
    assistant-name="Ania"
    @close="() => console.log('closed')"
  />
</template>
```

## Global registration (plugin)

```ts
import { createApp } from 'vue';
import { AniaAvatarPlugin } from 'ania-avatar-vue';
import App from './App.vue';

createApp(App).use(AniaAvatarPlugin).mount('#app');
// Now <AniaAvatar> and <AvatarChatbot> are available everywhere.
```

## CDN (`<script>`)

The UMD build exposes the global **`AniaAvatarVue`**. Vue must be loaded first.

```html
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
<script src="https://cdn.jsdelivr.net/gh/rob-d3v/ania-avatar-vue/dist/index.umd.cjs"></script>
<div id="app">
  <ania-avatar avatar-url="https://example.com/avatar.ania" :width="320" :height="320"></ania-avatar>
</div>
<script>
  const { createApp } = Vue;
  createApp().use(AniaAvatarVue.AniaAvatarPlugin).mount('#app');
</script>
```

(`unpkg.com/ania-avatar-vue` resolves the same file via the `unpkg` field once
published to npm.)

## Props

`<AniaAvatar>` props mirror the React library
([`ania-avatar-react`](https://github.com/rob-d3v/ania-avatar-core)):

| Prop | Type | Notes |
| ---- | ---- | ----- |
| `avatarUrl` | `string` | URL to a `.ania` file |
| `avatarPassword` | `string` | password for an encrypted (personal) file |
| `avatarData` | `AniaAvatarData` | already-decrypted data (skips download) |
| `authToken` | `string` | Bearer token for the URL download |
| `position` | `'bottom-left' \| 'bottom-right' \| 'top-left' \| 'top-right'` | |
| `width` / `height` | `number` | canvas pixel size (default 320) |
| `transparent` | `boolean` | transparent container background |
| `theme` | `'dark' \| 'light' \| 'blue' \| 'purple'` | |
| `idleSpeed` / `talkSpeed` | `number` | animation speeds |
| `autoCalculateSpeed` | `boolean` | derive speeds from fps |
| `lipSyncEnabled` | `boolean` | |
| `lipSyncIntensity` | `number` | 0..1 |
| `lipSyncResponsiveness` | `number` | 0.05..1 |
| `lipSyncSustainStyle` | `'hold' \| 'wiggle'` | |
| `lipSyncWiggleSpeed` | `number` | 1..6 |
| `actions` | `ActionConfig[]` | |
| `enableActionHotkeys` | `boolean` | |
| `wakeWordEnabled` / `wakeWordModelUrl` / `wakeWordThreshold` | | wake-word |
| `enablePostMessageControl` / `postMessageOrigins` | | external control |

`<AvatarChatbot>` adds: `webhookUrl`, `tts*` (`ttsProvider`, `ttsVoice`,
`ttsRate`, `ttsPitch`, `ttsLang`, `ttsApiKey`, …), `stt*`, `assistantName`,
`enableTTS`, `autoGreeting`, and more.

### Events

`load`, `talkStart`, `talkEnd`, `actionStart`, `actionEnd`, `close`.

### Imperative API (via template ref / composable)

`load`, `play`, `pause`, `setTalking`, `triggerAction`, `cancelAction`,
`configureActions`, `configureLipsSync`, `setSpeeds`, `getAvailableActions`,
`runCommand(line)`.

`runCommand` runs a desktop-style command line, e.g.
`runCommand('action 1')`, `runCommand('speed 2 4')`, `runCommand('help')`.

## License

MIT
