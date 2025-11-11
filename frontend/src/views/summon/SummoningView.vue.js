import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePersonaStore } from '@/stores/persona';
import Button from '@/components/common/Button.vue';
import PersonaCard from '@/components/common/PersonaCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
const router = useRouter();
const personaStore = usePersonaStore();
const selectedMode = ref(null);
const selectedArchetype = ref('');
const isLoading = ref(false);
const isSummoning = computed(() => personaStore.isSummoning || personaStore.isPersonaSummoning);
const persona = computed(() => {
    if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
        return personaStore.persona;
    }
    return null;
});
onMounted(async () => {
    await personaStore.fetchPersona();
});
const selectMode = (mode) => {
    selectedMode.value = mode;
};
const initiateSummoning = async () => {
    if (!selectedMode.value)
        return;
    if (selectedMode.value === 'Alchemic' && !selectedArchetype.value)
        return;
    isLoading.value = true;
    try {
        await personaStore.summonPersona(selectedMode.value, selectedMode.value === 'Alchemic' ? selectedArchetype.value : undefined);
        // Polling is handled by the store
    }
    catch (err) {
        console.error('Failed to initiate summoning:', err);
    }
    finally {
        isLoading.value = false;
    }
};
const goToRoom = () => {
    if (persona.value) {
        router.push(`/room/${persona.value.id}`);
    }
};
const goToChat = () => {
    if (persona.value) {
        router.push(`/chat/${persona.value.id}`);
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
    ...{ class: "min-h-screen bg-akashic flex items-center justify-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "container-page text-center space-y-8" },
});
if (__VLS_ctx.isSummoning) {
    // @ts-ignore
    [isSummoning,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-6xl animate-bounce" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-4xl font-bold text-gradient" },
    });
    /** @type {[typeof LoadingSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(LoadingSpinner, new LoadingSpinner({
        size: "lg",
        text: "Weaving the Relational Crystals...",
    }));
    const __VLS_1 = __VLS_0({
        size: "lg",
        text: "Weaving the Relational Crystals...",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary max-w-md mx-auto" },
    });
}
else if (__VLS_ctx.persona && __VLS_ctx.persona.status === 'ready') {
    // @ts-ignore
    [persona, persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "space-y-8 animate-fade-in" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-4xl font-bold text-gradient" },
    });
    /** @type {[typeof PersonaCard, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(PersonaCard, new PersonaCard({
        persona: (__VLS_ctx.persona),
    }));
    const __VLS_5 = __VLS_4({
        persona: (__VLS_ctx.persona),
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex gap-4 justify-center" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        size: "lg",
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
        size: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = ({ click: {} },
        { onClick: (__VLS_ctx.goToRoom) });
    const { default: __VLS_14 } = __VLS_10.slots;
    // @ts-ignore
    [goToRoom,];
    var __VLS_10;
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "secondary",
        size: "lg",
    }));
    const __VLS_16 = __VLS_15({
        ...{ 'onClick': {} },
        variant: "secondary",
        size: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    let __VLS_18;
    let __VLS_19;
    const __VLS_20 = ({ click: {} },
        { onClick: (__VLS_ctx.goToChat) });
    const { default: __VLS_21 } = __VLS_17.slots;
    // @ts-ignore
    [goToChat,];
    var __VLS_17;
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card max-w-2xl mx-auto" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-2xl font-bold mb-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid md:grid-cols-2 gap-6 mb-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isSummoning))
                    return;
                if (!!(__VLS_ctx.persona && __VLS_ctx.persona.status === 'ready'))
                    return;
                __VLS_ctx.selectMode('Fated');
                // @ts-ignore
                [selectMode,];
            } },
        ...{ class: "card cursor-pointer hover:scale-105 transition-transform" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-xl font-bold mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (...[$event]) => {
                if (!!(__VLS_ctx.isSummoning))
                    return;
                if (!!(__VLS_ctx.persona && __VLS_ctx.persona.status === 'ready'))
                    return;
                __VLS_ctx.selectMode('Alchemic');
                // @ts-ignore
                [selectMode,];
            } },
        ...{ class: "card cursor-pointer hover:scale-105 transition-transform" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h3, __VLS_intrinsics.h3)({
        ...{ class: "text-xl font-bold mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary" },
    });
    if (__VLS_ctx.selectedMode === 'Alchemic') {
        // @ts-ignore
        [selectedMode,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "mb-6" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.label, __VLS_intrinsics.label)({
            ...{ class: "block text-sm font-medium text-secondary mb-2" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.select, __VLS_intrinsics.select)({
            value: (__VLS_ctx.selectedArchetype),
            ...{ class: "input" },
        });
        // @ts-ignore
        [selectedArchetype,];
        __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            value: "",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            value: "Tsundere",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            value: "Yandere",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            value: "Kuudere",
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.option, __VLS_intrinsics.option)({
            value: "Genki",
        });
    }
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_22 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        size: "lg",
        disabled: (__VLS_ctx.selectedMode === 'Alchemic' && !__VLS_ctx.selectedArchetype),
        loading: (__VLS_ctx.isLoading),
    }));
    const __VLS_23 = __VLS_22({
        ...{ 'onClick': {} },
        size: "lg",
        disabled: (__VLS_ctx.selectedMode === 'Alchemic' && !__VLS_ctx.selectedArchetype),
        loading: (__VLS_ctx.isLoading),
    }, ...__VLS_functionalComponentArgsRest(__VLS_22));
    let __VLS_25;
    let __VLS_26;
    const __VLS_27 = ({ click: {} },
        { onClick: (__VLS_ctx.initiateSummoning) });
    const { default: __VLS_28 } = __VLS_24.slots;
    // @ts-ignore
    [selectedMode, selectedArchetype, isLoading, initiateSummoning,];
    var __VLS_24;
}
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-akashic']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['container-page']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['text-6xl']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-bounce']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-fade-in']} */ ;
/** @type {__VLS_StyleScopedClasses['text-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['block']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
