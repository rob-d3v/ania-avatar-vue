// useAniaAvatar — the Composition API composable powering <AniaAvatar>.
//
// Creates an ania-avatar-core player on a target <canvas> (or container), keeps
// reactive state (loaded / talking / actions / activeAction / error), and
// exposes imperative methods (runCommand / triggerAction / setTalking / play /
// pause / ...). Both the <AniaAvatar> component and standalone consumers use it.

import {
  ref,
  shallowRef,
  onBeforeUnmount,
  type Ref,
  type ShallowRef,
  type ComputedRef,
} from 'vue';
import {
  createAniaPlayer,
  executeCommand,
  installPostMessageControl,
  type AniaPlayerInstance,
  type AniaAvatarData,
  type ActionConfig,
  type ActionInfo,
  type LoadSource,
  type LipSyncSustainStyle,
  type CommandContext,
  type CommandResult,
  type PlayerOptions,
} from 'ania-avatar-core';

/** Lip-sync knobs accepted by {@link useAniaAvatar}. */
export interface UseAniaAvatarLipSync {
  enabled?: boolean;
  intensity?: number;
  responsiveness?: number;
  sustainStyle?: LipSyncSustainStyle | null;
  wiggleSpeed?: number | null;
  opennessMap?: number[] | null;
}

/** Options for {@link useAniaAvatar}. Mirrors the <AniaAvatar> props subset that
 * drives the underlying engine. */
export interface UseAniaAvatarOptions {
  /** URL to a `.ania` file. */
  avatarUrl?: string;
  /** Password for an encrypted (personal) `.ania` file. */
  avatarPassword?: string;
  /** Already-decrypted avatar data (skips download + decrypt). */
  avatarData?: AniaAvatarData | null;
  /** Bearer token sent as `Authorization` when downloading a URL. */
  authToken?: string;
  /** Canvas pixel width. */
  width?: number;
  /** Canvas pixel height. */
  height?: number;
  /** Override idle animation speed. */
  idleSpeed?: number;
  /** Override talk animation speed. */
  talkSpeed?: number;
  /** Auto-derive idle/talk speeds from the avatar fps. */
  autoCalculateSpeed?: boolean;
  /** Lip-sync configuration. */
  lipSync?: UseAniaAvatarLipSync;
  /** Initial actions to register. */
  actions?: ActionConfig[];
  /** Base server URL for fetching actions / lip-sync config by contentHash. */
  serverUrl?: string;
  /** Fetch additional actions config from the server on load. */
  fetchActionsFromServer?: boolean;
  /** Start the render loop immediately after a successful load. Default true. */
  autoplay?: boolean;
  /** Locale for any built-in strings the engine resolves. */
  locale?: string;
  /** Install an origin-allowlisted window.postMessage command listener. */
  enablePostMessageControl?: boolean;
  /** Allowed origins for postMessage control. Use ['*'] to allow all (unsafe). */
  postMessageOrigins?: string[];
  /** Extra command-context fields (e.g. speak/ask) merged into runCommand ctx. */
  commandContext?: Partial<CommandContext>;
  /** Event callbacks. */
  onLoad?: (data: AniaAvatarData) => void;
  onTalkStart?: () => void;
  onTalkEnd?: () => void;
  onActionStart?: (actionId: string) => void;
  onActionEnd?: (actionId: string) => void;
  onError?: (error: Error) => void;
}

/** Reactive state + imperative methods returned by {@link useAniaAvatar}. */
export interface UseAniaAvatarReturn {
  /** The live underlying core player instance (null until mounted). */
  player: ShallowRef<AniaPlayerInstance | null>;
  /** True once a `.ania` file (or data) has loaded successfully. */
  loaded: Ref<boolean>;
  /** True while the avatar is in the talking state. */
  isTalking: Ref<boolean>;
  /** Currently-registered actions (id+name). */
  actions: Ref<ActionInfo[]>;
  /** The id of the currently-playing action, or null. */
  activeAction: Ref<string | null>;
  /** The last load/engine error, or null. */
  error: Ref<Error | null>;
  /** True if a load is in flight. */
  loading: Ref<boolean>;
  /** True if the render loop is running. */
  isPlaying: Ref<boolean>;
  /** Mount the engine onto a target canvas/container. Called by <AniaAvatar>. */
  mount: (target: HTMLCanvasElement | HTMLElement) => AniaPlayerInstance;
  /** Tear down the engine + listeners. Registered with onBeforeUnmount. */
  destroy: () => void;
  /** Load an avatar (url/password/data or raw AniaAvatarData). */
  load: (source?: AniaAvatarData | LoadSource) => Promise<AniaAvatarData | undefined>;
  /** Start the render loop. */
  play: () => void;
  /** Stop the render loop (frame freezes). */
  pause: () => void;
  /** Force the talking/idle state. */
  setTalking: (talking: boolean) => void;
  /** Trigger an action by id (or 1-based index, when run via runCommand). */
  triggerAction: (id: string) => boolean;
  /** Cancel the active action. */
  cancelAction: (force?: boolean) => void;
  /** Replace the registered action set. */
  configureActions: (actions: ActionConfig[]) => void;
  /** Configure advanced lip-sync. */
  configureLipsSync: (config: UseAniaAvatarLipSync) => void;
  /** Set idle/talk speeds at runtime. */
  setSpeeds: (idleSpeed?: number, talkSpeed?: number) => void;
  /** All currently-registered actions as id+name pairs. */
  getAvailableActions: () => ActionInfo[];
  /** Run a desktop-style command line (e.g. "action 1", "speed 2 4"). */
  runCommand: (line: string, extraCtx?: Partial<CommandContext>) => CommandResult;
}

const DEFAULT_LIP_SUSTAIN: LipSyncSustainStyle = 'wiggle';
const DEFAULT_WIGGLE = 2;

/**
 * Composable that owns an ania-avatar-core player instance and exposes reactive
 * state + imperative controls. Call {@link UseAniaAvatarReturn.mount} from
 * `onMounted` with a template-ref canvas/container.
 */
export function useAniaAvatar(options: UseAniaAvatarOptions = {}): UseAniaAvatarReturn {
  const player: ShallowRef<AniaPlayerInstance | null> = shallowRef(null);
  const loaded = ref(false);
  const isTalking = ref(false);
  const actions = ref<ActionInfo[]>([]);
  const activeAction = ref<string | null>(null);
  const error = ref<Error | null>(null);
  const loading = ref(false);
  const isPlaying = ref(false);

  let removePostMessage: (() => void) | null = null;
  const unsubscribers: Array<() => void> = [];

  const buildPlayerOptions = (): PlayerOptions => {
    const lip = options.lipSync;
    return {
      width: options.width,
      height: options.height,
      autoplay: options.autoplay,
      idleSpeed: options.idleSpeed,
      talkSpeed: options.talkSpeed,
      autoCalculateSpeed: options.autoCalculateSpeed,
      serverUrl: options.serverUrl,
      fetchActionsFromServer: options.fetchActionsFromServer,
      locale: options.locale,
      lipSync: lip
        ? {
            enabled: !!lip.enabled,
            intensity: lip.intensity,
            responsiveness: lip.responsiveness,
            sustainStyle: (lip.sustainStyle ?? undefined) as LipSyncSustainStyle | undefined,
            wiggleSpeed: lip.wiggleSpeed ?? undefined,
            opennessMap: lip.opennessMap ?? undefined,
          }
        : undefined,
    };
  };

  const refreshActions = (): void => {
    actions.value = player.value?.getAvailableActions() ?? [];
  };

  const baseCommandContext = (): CommandContext => ({
    player: player.value ?? undefined,
    getActions: () => player.value?.getAvailableActions() ?? [],
    triggerAction: (id: string) => {
      player.value?.triggerAction(id);
    },
    cancelAction: () => player.value?.cancelAction(),
    setVisible: (visible: boolean) => (visible ? play() : pause()),
    getVisible: () => isPlaying.value,
    setSpeeds: (idle: number, talk: number) => player.value?.setSpeeds(idle, talk),
    ...options.commandContext,
  });

  function mount(target: HTMLCanvasElement | HTMLElement): AniaPlayerInstance {
    if (player.value) return player.value;

    const inst = createAniaPlayer(target, buildPlayerOptions());
    player.value = inst;

    // Wire core events -> reactive state + callbacks.
    unsubscribers.push(
      inst.on('load', (data) => {
        loaded.value = true;
        loading.value = false;
        error.value = null;
        refreshActions();
        options.onLoad?.(data);
      }),
      inst.on('talkStart', () => {
        isTalking.value = true;
        options.onTalkStart?.();
      }),
      inst.on('talkEnd', () => {
        isTalking.value = false;
        options.onTalkEnd?.();
      }),
      inst.on('actionStart', (id) => {
        activeAction.value = id;
        options.onActionStart?.(id);
      }),
      inst.on('actionEnd', (id) => {
        if (activeAction.value === id) activeAction.value = null;
        options.onActionEnd?.(id);
      }),
      inst.on('error', (err) => {
        error.value = err;
        loading.value = false;
        options.onError?.(err);
      })
    );

    // Register initial actions (if any) before/after load.
    if (options.actions && options.actions.length > 0) {
      inst.configureActions(options.actions);
      refreshActions();
    }

    // Optional postMessage external control.
    if (options.enablePostMessageControl) {
      removePostMessage = installPostMessageControl(baseCommandContext(), {
        origins: options.postMessageOrigins ?? [],
      });
    }

    // Auto-load if a source was provided up front.
    const hasSource = !!(options.avatarData || options.avatarUrl);
    if (hasSource) void load();

    return inst;
  }

  async function load(
    source?: AniaAvatarData | LoadSource
  ): Promise<AniaAvatarData | undefined> {
    if (!player.value) return undefined;
    const src: AniaAvatarData | LoadSource =
      source ??
      (options.avatarData
        ? { data: options.avatarData }
        : {
            url: options.avatarUrl,
            password: options.avatarPassword,
            authToken: options.authToken,
          });
    loading.value = true;
    error.value = null;
    loaded.value = false;
    try {
      const data = await player.value.load(src);
      isPlaying.value = options.autoplay !== false;
      return data;
    } catch (err) {
      // 'error' event already updates error.value; swallow so callers can await.
      return undefined;
    }
  }

  function play(): void {
    player.value?.play();
    isPlaying.value = true;
  }

  function pause(): void {
    player.value?.pause();
    isPlaying.value = false;
  }

  function setTalking(talking: boolean): void {
    player.value?.setTalking(talking);
    // event listeners also flip isTalking; set eagerly for snappy UI.
    isTalking.value = talking;
  }

  function triggerAction(id: string): boolean {
    return player.value?.triggerAction(id) ?? false;
  }

  function cancelAction(force?: boolean): void {
    player.value?.cancelAction(force);
  }

  function configureActions(next: ActionConfig[]): void {
    player.value?.configureActions(next);
    refreshActions();
  }

  function configureLipsSync(config: UseAniaAvatarLipSync): void {
    player.value?.configureLipsSync(
      !!config.enabled,
      config.intensity,
      config.responsiveness,
      config.opennessMap ?? null,
      (config.sustainStyle ?? DEFAULT_LIP_SUSTAIN) as LipSyncSustainStyle,
      config.wiggleSpeed ?? DEFAULT_WIGGLE
    );
  }

  function setSpeeds(idleSpeed?: number, talkSpeed?: number): void {
    player.value?.setSpeeds(idleSpeed, talkSpeed);
  }

  function getAvailableActions(): ActionInfo[] {
    return player.value?.getAvailableActions() ?? [];
  }

  function runCommand(line: string, extraCtx?: Partial<CommandContext>): CommandResult {
    if (!player.value) return { ok: false, message: 'Player not mounted.' };
    const ctx: CommandContext = { ...baseCommandContext(), ...extraCtx };
    return executeCommand(line, ctx);
  }

  function destroy(): void {
    removePostMessage?.();
    removePostMessage = null;
    for (const off of unsubscribers.splice(0)) off();
    player.value?.destroy();
    player.value = null;
    loaded.value = false;
    isPlaying.value = false;
    isTalking.value = false;
    activeAction.value = null;
  }

  onBeforeUnmount(destroy);

  return {
    player,
    loaded,
    isTalking,
    actions,
    activeAction,
    error,
    loading,
    isPlaying,
    mount,
    destroy,
    load,
    play,
    pause,
    setTalking,
    triggerAction,
    cancelAction,
    configureActions,
    configureLipsSync,
    setSpeeds,
    getAvailableActions,
    runCommand,
  };
}

/** Helper: a ComputedRef alias for friendlier intellisense if a consumer wants
 * a read-only view of the actions list. */
export type ActionsView = ComputedRef<ActionInfo[]>;
