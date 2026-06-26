// ===========================================================================
// ania-avatar-vue — public API
//
// Vue 3 wrapper for the Ania animated-avatar player. Wraps the framework-
// agnostic `ania-avatar-core` engine (bundled into this package's dist) and
// exposes idiomatic Vue 3 building blocks:
//   - <AniaAvatar>      component
//   - <AvatarChatbot>   component
//   - useAniaAvatar()   composable (reactive state + imperative methods)
//   - AniaAvatarPlugin  (app.use(...) to register the components globally)
// ===========================================================================

// ----- Components -----
export { default as AniaAvatar } from './components/AniaAvatar.vue';
export { default as AvatarChatbot } from './components/AvatarChatbot.vue';

// ----- Composable -----
export { useAniaAvatar } from './composables/useAniaAvatar';
export type {
  UseAniaAvatarOptions,
  UseAniaAvatarReturn,
  UseAniaAvatarLipSync,
  ActionsView,
} from './composables/useAniaAvatar';

// ----- Vue plugin -----
export { AniaAvatarPlugin, AniaAvatarPlugin as default } from './plugin';
export type { AniaAvatarPluginOptions } from './plugin';

// ----- Prop / event types -----
export type {
  AniaAvatarProps,
  AvatarChatbotProps,
  AniaAvatarEmits,
  PlayerPosition,
  AvatarTheme,
  LipSyncSustainStyle,
  TTSProvider,
  STTProvider,
} from './props';

// ----- Re-export the core engine surface so consumers don't need a second dep.
// (ania-avatar-core is bundled into this package's dist.)
export {
  createAniaPlayer,
  AniaPlayer,
  AnimationController,
  Emitter,
  buildControllerConfig,
  decryptAniaFile,
  LipSyncAnalyser,
  SpeechRecognizer,
  executeCommand,
  parseCommandLine,
  installPostMessageControl,
  COMMAND_LIST,
  PluginRegistry,
  getDefaultRegistry,
  validatePlugin,
  BUILTIN_PLUGINS,
  registerBuiltins,
  TTS_PROVIDER_TO_PLUGIN,
  STT_PROVIDER_TO_PLUGIN,
  fetchLipSyncConfig,
  fetchActionsConfig,
  buildOpennessMap,
  professionalTTSRequest,
  WakeWordEngine,
  getWakeWordEngine,
  isWakeWordSupported,
  initPiper,
  preloadPiper,
  piperSynthesize,
  getPiperStatus,
  checkPiperStatus,
  disposePiper,
  parseHotkey,
  matchesHotkey,
  playActionAudio,
  calcSpeeds,
  calculateOptimalSpeeds,
  getCachedAvatar,
  setCachedAvatar,
  deleteCachedAvatar,
  clearAvatarCache,
  getCacheStats,
  AvatarCache,
  getString,
  getStringList,
  createTranslator,
  availableLocales,
  hasLocale,
  DEFAULT_LOCALE,
  FALLBACK_LOCALE,
  PLUGIN_KINDS,
} from 'ania-avatar-core';

export type {
  AniaAvatarData,
  AniaAnimationData,
  AnimationControllerConfig,
  ActionConfig,
  ActionInfo,
  LipSyncConfig,
  LipSyncServerConfig,
  TTSConfig,
  TTSResult,
  PlayerOptions,
  LoadSource,
  PlayerEventMap,
  PlayerEventName,
  AniaPlayerInstance,
  PluginKind,
  PluginContext,
  TTSEngine,
  STTEngine,
  Plugin,
  CommandContext,
  CommandResult,
  CommandDescriptor,
  Translator,
} from 'ania-avatar-core';
