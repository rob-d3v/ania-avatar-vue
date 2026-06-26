import { type Ref, type ShallowRef, type ComputedRef } from 'vue';
import { type AniaPlayerInstance, type AniaAvatarData, type ActionConfig, type ActionInfo, type LoadSource, type LipSyncSustainStyle, type CommandContext, type CommandResult } from 'ania-avatar-core';
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
/**
 * Composable that owns an ania-avatar-core player instance and exposes reactive
 * state + imperative controls. Call {@link UseAniaAvatarReturn.mount} from
 * `onMounted` with a template-ref canvas/container.
 */
export declare function useAniaAvatar(options?: UseAniaAvatarOptions): UseAniaAvatarReturn;
/** Helper: a ComputedRef alias for friendlier intellisense if a consumer wants
 * a read-only view of the actions list. */
export type ActionsView = ComputedRef<ActionInfo[]>;
