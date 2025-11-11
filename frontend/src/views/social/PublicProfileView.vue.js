import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { socialService } from '@/services/api';
import Button from '@/components/common/Button.vue';
import PersonaCard from '@/components/common/PersonaCard.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const persona = ref(null);
const isLoading = ref(true);
onMounted(async () => {
    try {
        persona.value = await socialService.getPublicProfile(userId);
    }
    catch (err) {
        console.error('Failed to load public profile:', err);
    }
    finally {
        isLoading.value = false;
    }
});
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
if (__VLS_ctx.isLoading) {
    // @ts-ignore
    [isLoading,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex justify-center items-center min-h-screen" },
    });
    /** @type {[typeof LoadingSpinner, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(LoadingSpinner, new LoadingSpinner({
        size: "lg",
    }));
    const __VLS_1 = __VLS_0({
        size: "lg",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else if (__VLS_ctx.persona) {
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "max-w-2xl mx-auto space-y-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-3xl font-bold text-gradient mb-2" },
    });
    (__VLS_ctx.persona.name);
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary" },
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
        ...{ class: "card text-center space-y-4" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
    }));
    const __VLS_9 = __VLS_8({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    let __VLS_11;
    let __VLS_12;
    const __VLS_13 = ({ click: {} },
        { onClick: (__VLS_ctx.goToLogin) });
    const { default: __VLS_14 } = __VLS_10.slots;
    // @ts-ignore
    [goToLogin,];
    var __VLS_10;
}
/** @type {__VLS_StyleScopedClasses['container-page']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-8']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
