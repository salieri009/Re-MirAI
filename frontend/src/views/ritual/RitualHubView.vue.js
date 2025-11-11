import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useRitualStore } from '@/stores/ritual';
import Button from '@/components/common/Button.vue';
import ShareButton from '@/components/common/ShareButton.vue';
const router = useRouter();
const ritualStore = useRitualStore();
const isLoading = computed(() => ritualStore.isLoading);
const hasActiveRitual = computed(() => ritualStore.hasActiveRitual);
const currentRitual = computed(() => ritualStore.currentRitual);
const canSummon = computed(() => ritualStore.canSummon);
const responsesProgress = computed(() => ritualStore.responsesProgress);
onMounted(async () => {
    await ritualStore.fetchMyRitual();
});
const createRitual = async () => {
    try {
        await ritualStore.createRitual();
    }
    catch (err) {
        console.error('Failed to create ritual:', err);
    }
};
const goToSummon = () => {
    router.push('/summon');
};
const startPracticeSummon = () => {
    // TODO: Navigate to practice summon page or show modal
    alert('Practice summon feature coming soon!');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container-page" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-3xl font-bold text-gradient" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-secondary mt-2" },
});
if (!__VLS_ctx.hasActiveRitual) {
    // @ts-ignore
    [hasActiveRitual,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card text-center space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-xl text-secondary" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        size: "lg",
        loading: (__VLS_ctx.isLoading),
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        size: "lg",
        loading: (__VLS_ctx.isLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (__VLS_ctx.createRitual) });
    const { default: __VLS_6 } = __VLS_2.slots;
    // @ts-ignore
    [isLoading, createRitual,];
    var __VLS_2;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-2xl font-bold mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-between mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "font-bold" },
    });
    (__VLS_ctx.currentRitual?.responsesCount);
    (__VLS_ctx.currentRitual?.minimumResponses);
    // @ts-ignore
    [currentRitual, currentRitual,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-4 progress-bg rounded-full overflow-hidden" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "h-full progress-mystical rounded-full transition-all" },
        ...{ style: ({ width: `${__VLS_ctx.responsesProgress}%` }) },
    });
    // @ts-ignore
    [responsesProgress,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        ...{ class: "block text-sm font-medium text-secondary mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        value: (__VLS_ctx.currentRitual?.invitationUrl),
        readonly: true,
        ...{ class: "input flex-1" },
    });
    // @ts-ignore
    [currentRitual,];
    /** @type {[typeof ShareButton, ]} */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(ShareButton, new ShareButton({
        url: (__VLS_ctx.currentRitual?.invitationUrl || ''),
    }));
    const __VLS_8 = __VLS_7({
        url: (__VLS_ctx.currentRitual?.invitationUrl || ''),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    // @ts-ignore
    [currentRitual,];
    if (__VLS_ctx.canSummon) {
        // @ts-ignore
        [canSummon,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-6" },
        });
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(Button, new Button({
            ...{ 'onClick': {} },
            size: "lg",
        }));
        const __VLS_12 = __VLS_11({
            ...{ 'onClick': {} },
            size: "lg",
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
        let __VLS_14;
        let __VLS_15;
        const __VLS_16 = ({ click: {} },
            { onClick: (__VLS_ctx.goToSummon) });
        const { default: __VLS_17 } = __VLS_13.slots;
        // @ts-ignore
        [goToSummon,];
        var __VLS_13;
    }
    else {
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mt-6" },
        });
        /** @type {[typeof Button, typeof Button, ]} */ ;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent(Button, new Button({
            size: "lg",
            disabled: true,
        }));
        const __VLS_19 = __VLS_18({
            size: "lg",
            disabled: true,
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        const { default: __VLS_21 } = __VLS_20.slots;
        ((__VLS_ctx.currentRitual?.minimumResponses || 3) - (__VLS_ctx.currentRitual?.responsesCount || 0));
        // @ts-ignore
        [currentRitual, currentRitual,];
        var __VLS_20;
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-2xl font-bold mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary mb-6" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "secondary",
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        variant: "secondary",
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = ({ click: {} },
        { onClick: (__VLS_ctx.startPracticeSummon) });
    const { default: __VLS_28 } = __VLS_24.slots;
    // @ts-ignore
    [startPracticeSummon,];
    var __VLS_24;
}
/** @type {__VLS_StyleScopedClasses['container-page']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-bg']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-hidden']} */ ;
/** @type {__VLS_StyleScopedClasses['h-full']} */ ;
/** @type {__VLS_StyleScopedClasses['progress-mystical']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-all']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
