import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { usePersonaStore } from '@/stores/persona';
import { useRitualStore } from '@/stores/ritual';
import Button from '@/components/common/Button.vue';
import PersonaCard from '@/components/common/PersonaCard.vue';
import LoadingSkeleton from '@/components/common/LoadingSkeleton.vue';
const router = useRouter();
const authStore = useAuthStore();
const personaStore = usePersonaStore();
const ritualStore = useRitualStore();
const isLoading = computed(() => authStore.isLoading || personaStore.isLoading || ritualStore.isLoading);
const error = computed(() => authStore.error || personaStore.error || ritualStore.error);
const user = computed(() => authStore.user);
const persona = computed(() => {
    if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
        return personaStore.persona;
    }
    return null;
});
const personaStatus = computed(() => {
    if (!personaStore.persona)
        return null;
    if ('status' in personaStore.persona) {
        return personaStore.persona.status;
    }
    return 'ready';
});
const currentRitual = computed(() => ritualStore.currentRitual);
const hasActiveRitual = computed(() => ritualStore.hasActiveRitual);
const canSummon = computed(() => ritualStore.canSummon);
const responsesProgress = computed(() => ritualStore.responsesProgress);
const isCreatingRitual = computed(() => ritualStore.isLoading);
// User initials for avatar
const userInitials = computed(() => {
    const name = user.value?.displayName || 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
});
onMounted(async () => {
    await Promise.all([
        authStore.fetchUserProfile(),
        personaStore.fetchPersona(),
        ritualStore.fetchMyRitual(),
    ]);
});
const createRitual = async () => {
    try {
        await ritualStore.createRitual();
    }
    catch (err) {
        console.error('Failed to create ritual:', err);
    }
};
const goToRitual = () => {
    router.push('/ritual');
};
const goToSummon = () => {
    router.push('/summon');
};
const goToRoom = () => {
    if (persona.value) {
        router.push(`/room/${persona.value.id}`);
    }
};
const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};
const copyRitualLink = async () => {
    const url = currentRitual.value?.invitationUrl;
    if (url) {
        try {
            await navigator.clipboard.writeText(url);
            // You could add a toast notification here
        }
        catch {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
};
// Nielsen Heuristic: Help users recover from errors
const handleRetry = async () => {
    try {
        await Promise.all([
            authStore.fetchUserProfile(),
            personaStore.fetchPersona(),
            ritualStore.fetchMyRitual(),
        ]);
    }
    catch (error) {
        console.error('Retry failed:', error);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "min-h-screen bg-akashic" },
    ...{ style: {} },
});
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-8" },
        role: "status",
        'aria-live': "polite",
        'aria-label': "Loading dashboard",
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
        type: "progress",
    }));
    const __VLS_9 = __VLS_8({
        type: "progress",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sr-only" },
    });
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
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "card bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/20" },
        ...{ style: {} },
        role: "banner",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg" },
        role: "img",
        'aria-label': (`Avatar for ${__VLS_ctx.user?.displayName}`),
    });
    // @ts-ignore
    [user,];
    (__VLS_ctx.userInitials);
    // @ts-ignore
    [userInitials,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-xl font-semibold text-white" },
        ...{ style: {} },
    });
    (__VLS_ctx.user?.displayName);
    // @ts-ignore
    [user,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-sm text-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center" },
        ...{ style: {} },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-yellow-400" },
        role: "img",
        'aria-label': "Energy",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-medium text-yellow-400" },
        'aria-label': "Current energy points",
    });
    (__VLS_ctx.user?.memoryCrystals || 0);
    // @ts-ignore
    [user,];
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-muted hover:text-white" },
        'aria-label': "Sign out of your account",
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        variant: "ghost",
        size: "sm",
        ...{ class: "text-muted hover:text-white" },
        'aria-label': "Sign out of your account",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_15;
    let __VLS_16;
    const __VLS_17 = ({ click: {} },
        { onClick: (__VLS_ctx.handleLogout) });
    const { default: __VLS_18 } = __VLS_14.slots;
    // @ts-ignore
    [handleLogout,];
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
        d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    });
    var __VLS_14;
    __VLS_asFunctionalElement(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "grid lg:grid-cols-2" },
        ...{ style: {} },
        role: "main",
        'aria-label': "Persona management section",
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card hover:shadow-xl transition-shadow duration-300" },
        ...{ style: {} },
        role: "region",
        'aria-label': "Your AI Persona status",
    });
    if (__VLS_ctx.personaStatus === 'summoning') {
        // @ts-ignore
        [personaStatus,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-center space-y-6 py-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-pulse" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-10 h-10 text-white" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M13 10V3L4 14h7v7l9-11h-7z",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "text-xl font-semibold text-white mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-secondary" },
        });
    }
    else if (__VLS_ctx.personaStatus === 'ready' && __VLS_ctx.persona) {
        // @ts-ignore
        [personaStatus, persona,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-4" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "text-xl font-semibold text-white" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center space-x-1" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "w-2 h-2 bg-green-400 rounded-full" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-sm text-green-400" },
        });
        /** @type {[typeof PersonaCard, ]} */ ;
        // @ts-ignore
        const __VLS_19 = __VLS_asFunctionalComponent(PersonaCard, new PersonaCard({
            persona: (__VLS_ctx.persona),
            size: "compact",
        }));
        const __VLS_20 = __VLS_19({
            persona: (__VLS_ctx.persona),
            size: "compact",
        }, ...__VLS_functionalComponentArgsRest(__VLS_19));
        // @ts-ignore
        [persona,];
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_23 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            ...{ class: "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
        }));
        const __VLS_24 = __VLS_23({
            ...{ 'onClick': {} },
            ...{ class: "w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_23));
        let __VLS_26;
        let __VLS_27;
        const __VLS_28 = ({ click: {} },
            { onClick: (__VLS_ctx.goToRoom) });
        const { default: __VLS_29 } = __VLS_25.slots;
        // @ts-ignore
        [goToRoom,];
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-4 h-4 mr-2" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
        });
        var __VLS_25;
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-center space-y-6 py-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-32 h-32 mx-auto bg-gradient-to-br from-slate-700 to-slate-600 rounded-2xl flex items-center justify-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-16 h-16 text-slate-400" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M12 6v6m0 0v6m0-6h6m-6 0H6",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "text-xl font-semibold text-white mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-secondary mb-6" },
        });
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_30 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            ...{ class: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
        }));
        const __VLS_31 = __VLS_30({
            ...{ 'onClick': {} },
            ...{ class: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_30));
        let __VLS_33;
        let __VLS_34;
        const __VLS_35 = ({ click: {} },
            { onClick: (__VLS_ctx.goToRitual) });
        const { default: __VLS_36 } = __VLS_32.slots;
        // @ts-ignore
        [goToRitual,];
        var __VLS_32;
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card hover:shadow-xl transition-shadow duration-300" },
    });
    if (__VLS_ctx.hasActiveRitual) {
        // @ts-ignore
        [hasActiveRitual,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-6" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center justify-between" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "text-xl font-semibold text-white" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-right" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-sm text-secondary" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "font-semibold text-white" },
        });
        (__VLS_ctx.currentRitual?.responsesCount || 0);
        // @ts-ignore
        [currentRitual,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "space-y-3" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex justify-between items-center text-sm" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-secondary" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "font-medium text-white" },
        });
        (Math.round(__VLS_ctx.responsesProgress));
        // @ts-ignore
        [responsesProgress,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "relative" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-full bg-slate-700 rounded-full h-3 overflow-hidden" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out" },
            ...{ style: ({ width: `${__VLS_ctx.responsesProgress}%` }) },
        });
        // @ts-ignore
        [responsesProgress,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex justify-between mt-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center space-x-1" },
            ...{ class: ((__VLS_ctx.currentRitual?.responsesCount || 0) >= 1 ? 'text-green-400' : 'text-slate-500') },
        });
        // @ts-ignore
        [currentRitual,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center space-x-1" },
            ...{ class: ((__VLS_ctx.currentRitual?.responsesCount || 0) >= 2 ? 'text-green-400' : 'text-slate-500') },
        });
        // @ts-ignore
        [currentRitual,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex items-center space-x-1" },
            ...{ class: ((__VLS_ctx.currentRitual?.responsesCount || 0) >= 3 ? 'text-green-400' : 'text-slate-500') },
        });
        // @ts-ignore
        [currentRitual,];
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "text-xs" },
        });
        if (__VLS_ctx.canSummon) {
            // @ts-ignore
            [canSummon,];
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex items-center space-x-3 mb-3" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "text-green-400" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "font-medium text-green-400" },
            });
            /** @type {[typeof Button, typeof Button, ]} */ ;
            // @ts-ignore
            const __VLS_37 = __VLS_asFunctionalComponent(Button, new Button({
                ...{ 'onClick': {} },
                ...{ class: "w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" },
            }));
            const __VLS_38 = __VLS_37({
                ...{ 'onClick': {} },
                ...{ class: "w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_37));
            let __VLS_40;
            let __VLS_41;
            const __VLS_42 = ({ click: {} },
                { onClick: (__VLS_ctx.goToSummon) });
            const { default: __VLS_43 } = __VLS_39.slots;
            // @ts-ignore
            [goToSummon,];
            var __VLS_39;
        }
        else {
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "space-y-4" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "text-sm text-secondary" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "flex gap-2" },
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.input)({
                value: (__VLS_ctx.currentRitual?.invitationUrl),
                readonly: true,
                ...{ class: "input flex-1 text-sm bg-slate-700/50 border-slate-600" },
            });
            // @ts-ignore
            [currentRitual,];
            /** @type {[typeof Button, typeof Button, ]} */ ;
            // @ts-ignore
            const __VLS_44 = __VLS_asFunctionalComponent(Button, new Button({
                ...{ 'onClick': {} },
                variant: "ghost",
                ...{ class: "px-3 text-indigo-400 hover:text-indigo-300" },
            }));
            const __VLS_45 = __VLS_44({
                ...{ 'onClick': {} },
                variant: "ghost",
                ...{ class: "px-3 text-indigo-400 hover:text-indigo-300" },
            }, ...__VLS_functionalComponentArgsRest(__VLS_44));
            let __VLS_47;
            let __VLS_48;
            const __VLS_49 = ({ click: {} },
                { onClick: (__VLS_ctx.copyRitualLink) });
            const { default: __VLS_50 } = __VLS_46.slots;
            // @ts-ignore
            [copyRitualLink,];
            __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "w-4 h-4" },
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24",
            });
            __VLS_asFunctionalElement(__VLS_intrinsics.path)({
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
                'stroke-width': "2",
                d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
            });
            var __VLS_46;
        }
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "text-center space-y-6 py-8" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "w-20 h-20 mx-auto bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full flex items-center justify-center" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-10 h-10 text-indigo-400" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
        __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
            ...{ class: "text-xl font-semibold text-white mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-secondary mb-6 max-w-sm mx-auto" },
        });
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_51 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            loading: (__VLS_ctx.isCreatingRitual),
            ...{ class: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
        }));
        const __VLS_52 = __VLS_51({
            ...{ 'onClick': {} },
            loading: (__VLS_ctx.isCreatingRitual),
            ...{ class: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" },
        }, ...__VLS_functionalComponentArgsRest(__VLS_51));
        let __VLS_54;
        let __VLS_55;
        const __VLS_56 = ({ click: {} },
            { onClick: (__VLS_ctx.createRitual) });
        const { default: __VLS_57 } = __VLS_53.slots;
        // @ts-ignore
        [isCreatingRitual, createRitual,];
        __VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            ...{ class: "w-4 h-4 mr-2" },
            fill: "none",
            stroke: "currentColor",
            viewBox: "0 0 24 24",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.path)({
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            'stroke-width': "2",
            d: "M12 6v6m0 0v6m0-6h6m-6 0H6",
        });
        var __VLS_53;
    }
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-akashic']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
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
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500/10']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-500/10']} */ ;
/** @type {__VLS_StyleScopedClasses['border-indigo-500/20']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-12']} */ ;
/** @type {__VLS_StyleScopedClasses['h-12']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-yellow-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-muted']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['lg:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-pulse']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-1']} */ ;
/** @type {__VLS_StyleScopedClasses['w-2']} */ ;
/** @type {__VLS_StyleScopedClasses['h-2']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-purple-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-32']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-slate-700']} */ ;
/** @type {__VLS_StyleScopedClasses['to-slate-600']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-16']} */ ;
/** @type {__VLS_StyleScopedClasses['h-16']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-purple-700']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:shadow-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-300']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['text-right']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-3']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['relative']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-700']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-3']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['via-purple-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-pink-500']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['duration-500']} */ ;
/** @type {__VLS_StyleScopedClasses['ease-out']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-green-500/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-emerald-500/20']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-green-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-x-3']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-green-400']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-green-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-emerald-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-green-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-emerald-700']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-700/50']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-600']} */ ;
/** @type {__VLS_StyleScopedClasses['px-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-400']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:text-indigo-300']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['py-8']} */ ;
/** @type {__VLS_StyleScopedClasses['w-20']} */ ;
/** @type {__VLS_StyleScopedClasses['h-20']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-br']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500/20']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-500/20']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['w-10']} */ ;
/** @type {__VLS_StyleScopedClasses['h-10']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-400']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-white']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-gradient-to-r']} */ ;
/** @type {__VLS_StyleScopedClasses['from-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['to-purple-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:from-indigo-600']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:to-purple-700']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
