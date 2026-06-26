import type { AniaAvatarData } from 'ania-avatar-core';
import { type UseAniaAvatarLipSync } from '../composables/useAniaAvatar';
import type { AniaAvatarProps } from '../props';
declare var __VLS_1: {
    loaded: boolean;
    isTalking: boolean;
    activeAction: string | null;
    actions: import("ania-avatar-core").ActionInfo[];
    error: Error | null;
};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<AniaAvatarProps, {
    player: import("vue").ShallowRef<import("ania-avatar-core").AniaPlayerInstance | null>;
    loaded: import("vue").Ref<boolean, boolean>;
    isTalking: import("vue").Ref<boolean, boolean>;
    actions: import("vue").Ref<import("ania-avatar-core").ActionInfo[], import("ania-avatar-core").ActionInfo[]>;
    activeAction: import("vue").Ref<string | null, string | null>;
    error: import("vue").Ref<Error | null, Error | null>;
    load: (source?: AniaAvatarData | import("ania-avatar-core").LoadSource) => Promise<AniaAvatarData | undefined>;
    play: () => void;
    pause: () => void;
    setTalking: (talking: boolean) => void;
    triggerAction: (id: string) => boolean;
    cancelAction: (force?: boolean) => void;
    configureActions: (actions: import("ania-avatar-core").ActionConfig[]) => void;
    configureLipsSync: (config: UseAniaAvatarLipSync) => void;
    setSpeeds: (idleSpeed?: number, talkSpeed?: number) => void;
    getAvailableActions: () => import("ania-avatar-core").ActionInfo[];
    runCommand: (line: string, extraCtx?: Partial<import("ania-avatar-core").CommandContext>) => import("ania-avatar-core").CommandResult;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    load: (data: AniaAvatarData) => any;
    talkStart: () => any;
    talkEnd: () => any;
    actionStart: (actionId: string) => any;
    actionEnd: (actionId: string) => any;
    close: () => any;
}, string, import("vue").PublicProps, Readonly<AniaAvatarProps> & Readonly<{
    onLoad?: ((data: AniaAvatarData) => any) | undefined;
    onTalkStart?: (() => any) | undefined;
    onTalkEnd?: (() => any) | undefined;
    onActionStart?: ((actionId: string) => any) | undefined;
    onActionEnd?: ((actionId: string) => any) | undefined;
    onClose?: (() => any) | undefined;
}>, {
    width: number;
    height: number;
    transparent: boolean;
    theme: import("..").AvatarTheme;
    autoCalculateSpeed: boolean;
    lipSyncEnabled: boolean;
    enableActionHotkeys: boolean;
    enablePostMessageControl: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
