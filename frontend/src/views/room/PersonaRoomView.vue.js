/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { usePersonaStore } from '@/stores/persona';
import { useQuestStore } from '@/stores/quest';
import Button from '@/components/common/Button.vue';
import PersonaCard from '@/components/common/PersonaCard.vue';
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue';
// Stores and router
const router = useRouter();
const personaStore = usePersonaStore();
const questStore = useQuestStore();
// Reactive state for UI feedback (Nielsen: System Status Visibility)
const isSharing = ref(false);
const completingQuest = ref(null);
const shareMessage = ref(null);
const error = ref(null);
// Computed properties
const isLoading = computed(() => personaStore.isLoading || questStore.isLoading);
const persona = computed(() => {
    if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
        return personaStore.persona;
    }
    return null;
});
const activeQuests = computed(() => questStore.activeQuests || []);
const questsLoading = computed(() => questStore.isLoading);
// Quest progress tracking (Nielsen: System Status Visibility)
const completedQuests = computed(() => activeQuests.value.filter(quest => quest.status === 'completed').length);
const totalQuests = computed(() => activeQuests.value.length);
// Initialize data
onMounted(async () => {
    try {
        error.value = null;
        await Promise.all([
            personaStore.fetchPersona(),
            questStore.fetchQuests(),
        ]);
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to load persona room';
        console.error('Error loading persona room:', err);
    }
});
// Navigation functions (Nielsen: User Control & Freedom)
const goToChat = () => {
    if (persona.value) {
        router.push(`/chat/${persona.value.id}`);
    }
};
const goToDashboard = () => {
    router.push('/dashboard');
};
// Share functionality with proper feedback (Nielsen: Error Prevention & Recovery)
const sharePersona = async () => {
    if (!persona.value)
        return;
    isSharing.value = true;
    shareMessage.value = null;
    try {
        // Create shareable URL
        const shareUrl = `${window.location.origin}/profile/${persona.value.id}`;
        const shareText = `Check out my AI Persona: ${persona.value.name}!`;
        // Try native Web Share API first
        if (navigator.share) {
            await navigator.share({
                title: `${persona.value.name} - AI Persona`,
                text: shareText,
                url: shareUrl,
            });
            shareMessage.value = {
                type: 'success',
                text: 'Profile shared successfully!'
            };
        }
        else {
            // Fallback: copy to clipboard
            await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
            shareMessage.value = {
                type: 'success',
                text: 'Link copied to clipboard!'
            };
        }
    }
    catch (err) {
        // Handle user cancellation or errors gracefully
        if (err instanceof Error && err.name !== 'AbortError') {
            shareMessage.value = {
                type: 'error',
                text: 'Failed to share. Please try again.'
            };
        }
    }
    finally {
        isSharing.value = false;
        // Auto-dismiss success messages after 3 seconds
        if (shareMessage.value?.type === 'success') {
            setTimeout(() => {
                shareMessage.value = null;
            }, 3000);
        }
    }
};
// Quest completion with loading state (Nielsen: System Status Visibility)
const completeQuest = async (questId) => {
    completingQuest.value = questId;
    try {
        await questStore.completeQuest(questId);
        // Show success feedback
        shareMessage.value = {
            type: 'success',
            text: 'Quest completed! Reward earned.'
        };
        // Auto-dismiss after 2 seconds
        setTimeout(() => {
            shareMessage.value = null;
        }, 2000);
    }
    catch (err) {
        console.error('Failed to complete quest:', err);
        shareMessage.value = {
            type: 'error',
            text: 'Failed to complete quest. Please try again.'
        };
    }
    finally {
        completingQuest.value = null;
    }
};
// Utility functions
const formatLastInteraction = () => {
    // Mock implementation - in real app, this would use actual data
    return 'Just now';
};
// Error recovery (Nielsen: Help users recover from errors)
const handleRetry = async () => {
    try {
        error.value = null;
        await Promise.all([
            personaStore.fetchPersona(),
            questStore.fetchQuests(),
        ]);
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to reload persona room';
        console.error('Retry failed:', err);
    }
};
// Message management
const dismissMessage = () => {
    shareMessage.value = null;
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['quest-item']} */ ;
/** @type {__VLS_StyleScopedClasses['quest-item']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen bg-akashic" },
    ...{ style: {} },
});
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "min-h-screen flex items-center justify-center" },
        role: "status",
        'aria-live': "polite",
        'aria-label': "Loading persona room",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    /** @type {[typeof LoadingSkeleton, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(LoadingSkeleton, new LoadingSkeleton({
        type: "header",
    }));
    const __VLS_1 = __VLS_0({
        type: "header",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    /** @type {[typeof LoadingSkeleton, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(LoadingSkeleton, new LoadingSkeleton({
        type: "persona",
    }));
    const __VLS_5 = __VLS_4({
        type: "persona",
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    /** @type {[typeof LoadingSkeleton, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(LoadingSkeleton, new LoadingSkeleton({
        type: "card",
    }));
    const __VLS_9 = __VLS_8({
        type: "card",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sr-only" },
    });
    (__VLS_ctx.persona?.name || 'persona');
    // @ts-ignore
    [persona,];
}
else if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card border-red-500/50 bg-red-500/10" },
        role: "alert",
        'aria-live': "assertive",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-shrink-0 text-red-400 text-xl" },
        role: "img",
        'aria-label': "Error",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "font-semibold text-red-300 mb-1" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-red-400 text-sm" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.handleRetry) },
        ...{ class: "mt-3 text-sm text-red-300 hover:text-red-200 underline focus:outline-none focus:ring-2 focus:ring-red-500" },
    });
    // @ts-ignore
    [handleRetry,];
}
else if (__VLS_ctx.persona) {
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        role: "banner",
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        'aria-label': "Breadcrumb",
        ...{ class: "text-sm" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.ol, __VLS_intrinsics.ol)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.goToDashboard) },
        ...{ class: "text-indigo-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded" },
        'aria-label': "Return to dashboard",
    });
    // @ts-ignore
    [goToDashboard,];
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: "text-muted" },
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        ...{ class: "text-white font-medium" },
        'aria-current': "page",
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-3xl font-bold text-gradient" },
        ...{ style: {} },
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary text-sm" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        'aria-label': "Return to main dashboard",
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        'aria-label': "Return to main dashboard",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_15;
    let __VLS_16;
    const __VLS_17 = ({ click: {} },
        { onClick: (__VLS_ctx.goToDashboard) });
    const { default: __VLS_18 } = __VLS_14.slots;
    // @ts-ignore
    [goToDashboard,];
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4" },
        ...{ style: {} },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M10 19l-7-7m0 0l7-7m-7 7h18",
    });
    var __VLS_14;
    __VLS_asFunctionalElement(__VLS_intrinsics.main, __VLS_intrinsics.main)({
        ...{ class: "grid lg:grid-cols-3" },
        ...{ style: {} },
        role: "main",
        'aria-label': "Persona room content",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "lg:col-span-2" },
        role: "region",
        'aria-labelledby': "persona-display-heading",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card hover:shadow-xl transition-shadow duration-300" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sr-only" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        id: "persona-display-heading",
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    /** @type {[typeof PersonaCard, ]} */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(PersonaCard, new PersonaCard({
        persona: (__VLS_ctx.persona),
        size: "full",
    }));
    const __VLS_20 = __VLS_19({
        persona: (__VLS_ctx.persona),
        size: "full",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4 pt-4 border-t border-slate-700 flex items-center justify-between" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-3 h-3 bg-green-400 rounded-full animate-pulse" },
        role: "img",
        'aria-label': "Online status",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-secondary" },
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-xs text-muted" },
    });
    (__VLS_ctx.formatLastInteraction());
    // @ts-ignore
    [formatLastInteraction,];
    __VLS_asFunctionalElement(__VLS_intrinsics.aside, __VLS_intrinsics.aside)({
        ...{ class: "space-y-4" },
        ...{ style: {} },
        role: "complementary",
        'aria-label': "Persona actions and quests",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "card" },
        ...{ style: {} },
        role: "region",
        'aria-labelledby': "actions-heading",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        id: "actions-heading",
        ...{ class: "text-xl font-semibold text-white" },
        ...{ style: {} },
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_23 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        ...{ class: "w-full" },
        'aria-describedby': "chat-description",
    }));
    const __VLS_24 = __VLS_23({
        ...{ 'onClick': {} },
        ...{ class: "w-full" },
        'aria-describedby': "chat-description",
    }, ...__VLS_functionalComponentArgsRest(__VLS_23));
    let __VLS_26;
    let __VLS_27;
    const __VLS_28 = ({ click: {} },
        { onClick: (__VLS_ctx.goToChat) });
    const { default: __VLS_29 } = __VLS_25.slots;
    // @ts-ignore
    [goToChat,];
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4" },
        ...{ style: {} },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    });
    var __VLS_25;
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_30 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "secondary",
        ...{ class: "w-full" },
        disabled: (__VLS_ctx.isSharing),
        loading: (__VLS_ctx.isSharing),
        'aria-describedby': "share-description",
    }));
    const __VLS_31 = __VLS_30({
        ...{ 'onClick': {} },
        variant: "secondary",
        ...{ class: "w-full" },
        disabled: (__VLS_ctx.isSharing),
        loading: (__VLS_ctx.isSharing),
        'aria-describedby': "share-description",
    }, ...__VLS_functionalComponentArgsRest(__VLS_30));
    let __VLS_33;
    let __VLS_34;
    const __VLS_35 = ({ click: {} },
        { onClick: (__VLS_ctx.sharePersona) });
    const { default: __VLS_36 } = __VLS_32.slots;
    // @ts-ignore
    [isSharing, isSharing, sharePersona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "w-4 h-4" },
        ...{ style: {} },
        fill: "none",
        stroke: "currentColor",
        viewBox: "0 0 24 24",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.path)({
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
        'stroke-width': "2",
        d: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z",
    });
    var __VLS_32;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sr-only" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "chat-description",
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        id: "share-description",
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    if (__VLS_ctx.shareMessage) {
        // @ts-ignore
        [shareMessage,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-4 p-3 rounded-lg" },
            ...{ class: (__VLS_ctx.shareMessage.type === 'success' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30') },
            role: "status",
            'aria-live': "polite",
        });
        // @ts-ignore
        [shareMessage,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm" },
            ...{ class: (__VLS_ctx.shareMessage.type === 'success' ? 'text-green-300' : 'text-red-300') },
        });
        // @ts-ignore
        [shareMessage,];
        (__VLS_ctx.shareMessage.text);
        // @ts-ignore
        [shareMessage,];
        __VLS_asFunctionalElement(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.dismissMessage) },
            ...{ class: "text-xs opacity-60 hover:opacity-100" },
            'aria-label': "Dismiss message",
        });
        // @ts-ignore
        [dismissMessage,];
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "card" },
        ...{ style: {} },
        role: "region",
        'aria-labelledby': "quests-heading",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        id: "quests-heading",
        ...{ class: "text-xl font-semibold text-white" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-sm text-secondary" },
    });
    (__VLS_ctx.completedQuests);
    (__VLS_ctx.totalQuests);
    // @ts-ignore
    [completedQuests, totalQuests,];
    if (__VLS_ctx.questsLoading) {
        // @ts-ignore
        [questsLoading,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-center" },
            ...{ style: {} },
        });
        /** @type {[typeof LoadingSkeleton, ]} */ ;
        // @ts-ignore
        const __VLS_37 = __VLS_asFunctionalComponent(LoadingSkeleton, new LoadingSkeleton({
            type: "card",
        }));
        const __VLS_38 = __VLS_37({
            type: "card",
        }, ...__VLS_functionalComponentArgsRest(__VLS_37));
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "sr-only" },
        });
    }
    else if (__VLS_ctx.activeQuests.length > 0) {
        // @ts-ignore
        [activeQuests,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ style: {} },
        });
        for (const [quest] of __VLS_getVForSourceType((__VLS_ctx.activeQuests))) {
            // @ts-ignore
            [activeQuests,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                key: (quest.id),
                ...{ class: "quest-item rounded-lg border transition-colors duration-200" },
                ...{ class: (quest.status === 'completed' ? 'bg-green-500/10 border-green-500/30' : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50') },
                ...{ style: {} },
                role: "article",
                'aria-labelledby': (`quest-${quest.id}-title`),
                tabindex: (quest.status === 'completed' ? -1 : 0),
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-start justify-between" },
                ...{ style: {} },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
                id: (`quest-${quest.id}-title`),
                ...{ class: "font-semibold text-sm" },
                ...{ class: (quest.status === 'completed' ? 'text-green-300' : 'text-white') },
            });
            (quest.title);
            if (quest.status === 'completed') {
                __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                    ...{ class: "text-green-400 text-xs font-medium" },
                    role: "img",
                    'aria-label': "Completed",
                });
            }
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-xs text-secondary" },
                ...{ style: {} },
            });
            (quest.description);
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center justify-between" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "text-xs text-indigo-400" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                role: "img",
                'aria-label': "Reward",
            });
            (quest.reward.amount);
            (quest.reward.type);
            if (quest.status !== 'completed') {
                /** @type {[typeof Button, typeof Button, ]} */ ;
                // @ts-ignore
                const __VLS_41 = __VLS_asFunctionalComponent(Button, new Button({
                    ...{ 'onClick': {} },
                    size: "sm",
                    variant: "ghost",
                    loading: (__VLS_ctx.completingQuest === quest.id),
                    'aria-label': (`Complete quest: ${quest.title}`),
                }));
                const __VLS_42 = __VLS_41({
                    ...{ 'onClick': {} },
                    size: "sm",
                    variant: "ghost",
                    loading: (__VLS_ctx.completingQuest === quest.id),
                    'aria-label': (`Complete quest: ${quest.title}`),
                }, ...__VLS_functionalComponentArgsRest(__VLS_41));
                let __VLS_44;
                let __VLS_45;
                const __VLS_46 = ({ click: {} },
                    { onClick: (...[$event]) => {
                            if (!!(__VLS_ctx.isLoading))
                                return;
                            if (!!(__VLS_ctx.error))
                                return;
                            if (!(__VLS_ctx.persona))
                                return;
                            if (!!(__VLS_ctx.questsLoading))
                                return;
                            if (!(__VLS_ctx.activeQuests.length > 0))
                                return;
                            if (!(quest.status !== 'completed'))
                                return;
                            __VLS_ctx.completeQuest(quest.id);
                            // @ts-ignore
                            [completingQuest, completeQuest,];
                        } });
                const { default: __VLS_47 } = __VLS_43.slots;
                var __VLS_43;
            }
            else {
                __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                    ...{ class: "text-xs text-green-300" },
                });
            }
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-center text-secondary" },
            ...{ style: {} },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-4xl mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs mt-1" },
        });
    }
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-akashic']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['border-red-500/50']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-500/10']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-shrink-0']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-300']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-300']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-red-200']} */ ;
/** @type {__VLS_StyleScopedClasses['underline']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-indigo-300']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:outline-none']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus:ring-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-3']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:col-span-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['pt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border-t']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-700']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-3']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-60']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:opacity-100']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
/** @type {__VLS_StyleScopedClasses['quest-item']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-200']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-start']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
