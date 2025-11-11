import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from '@/components/common/Button.vue';
import PersonaCard from '@/components/common/PersonaCard.vue';
const router = useRouter();
const persona = ref(null);
onMounted(async () => {
    // TODO: Fetch the actual persona from the ritual result
    // For now, we'll use mock data
    try {
        // This would be: const userId = await getUserIdFromRitual(ritualId)
        // persona.value = await socialService.getPublicProfile(userId)
        persona.value = null; // Placeholder
    }
    catch (err) {
        console.error('Failed to load persona result:', err);
    }
});
const goToLanding = () => {
    router.push('/');
};
const goToLogin = () => {
    router.push('/login');
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
    ...{ class: "max-w-2xl mx-auto space-y-8" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card text-center" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
    ...{ class: "text-3xl font-bold text-gradient mb-4" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-secondary mb-6" },
});
if (__VLS_ctx.persona) {
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    /** @type {[typeof PersonaCard, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(PersonaCard, new PersonaCard({
        persona: (__VLS_ctx.persona),
    }));
    const __VLS_1 = __VLS_0({
        persona: (__VLS_ctx.persona),
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    // @ts-ignore
    [persona,];
}
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "card text-center space-y-6" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-2xl font-bold" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-secondary" },
});
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-4 justify-center" },
});
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_4 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    size: "lg",
}));
const __VLS_5 = __VLS_4({
    ...{ 'onClick': {} },
    size: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_4));
let __VLS_7;
let __VLS_8;
const __VLS_9 = ({ click: {} },
    { onClick: (__VLS_ctx.goToLanding) });
const { default: __VLS_10 } = __VLS_6.slots;
// @ts-ignore
[goToLanding,];
var __VLS_6;
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_11 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "lg",
}));
const __VLS_12 = __VLS_11({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "lg",
}, ...__VLS_functionalComponentArgsRest(__VLS_11));
let __VLS_14;
let __VLS_15;
const __VLS_16 = ({ click: {} },
    { onClick: (__VLS_ctx.goToLogin) });
const { default: __VLS_17 } = __VLS_13.slots;
// @ts-ignore
[goToLogin,];
var __VLS_13;
/** @type {__VLS_StyleScopedClasses['container-page']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
