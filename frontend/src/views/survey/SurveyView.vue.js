/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRitualStore } from '@/stores/ritual';
import Button from '@/components/common/Button.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
const route = useRoute();
const router = useRouter();
const ritualStore = useRitualStore();
const ritualId = route.params.ritualId;
const creatorName = ref('');
const questions = ref([]);
const currentQuestionIndex = ref(0);
const answers = ref({});
const selectedAnswer = ref('');
const isLoading = ref(true);
const error = ref(null);
const currentQuestion = computed(() => {
    if (questions.value.length > 0 && currentQuestionIndex.value < questions.value.length) {
        return questions.value[currentQuestionIndex.value];
    }
    return null;
});
onMounted(async () => {
    try {
        const response = await ritualStore.fetchRitual(ritualId);
        creatorName.value = response.creatorName;
        questions.value = response.questions;
        // Restore previous answer if exists
        if (currentQuestion.value) {
            selectedAnswer.value = answers.value[currentQuestion.value.id] || '';
        }
    }
    catch (err) {
        error.value = 'Failed to load survey';
        console.error('Failed to load survey:', err);
    }
    finally {
        isLoading.value = false;
    }
});
const selectAnswer = (optionId) => {
    selectedAnswer.value = optionId;
    if (currentQuestion.value?.id) {
        answers.value[currentQuestion.value.id] = optionId;
    }
};
const nextQuestion = async () => {
    if (!selectedAnswer.value || !currentQuestion.value)
        return;
    answers.value[currentQuestion.value.id] = selectedAnswer.value;
    if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value++;
        const nextQuestion = currentQuestion.value;
        selectedAnswer.value = nextQuestion ? answers.value[nextQuestion.id] || '' : '';
    }
    else {
        // Submit
        await submitSurvey();
    }
};
const previousQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
        const prevQuestion = currentQuestion.value;
        selectedAnswer.value = prevQuestion ? answers.value[prevQuestion.id] || '' : '';
    }
};
const submitSurvey = async () => {
    isLoading.value = true;
    try {
        const response = await ritualStore.submitResponse(ritualId, answers.value);
        router.push(response.resultUrl);
    }
    catch (err) {
        error.value = 'Failed to submit survey';
        console.error('Failed to submit survey:', err);
    }
    finally {
        isLoading.value = false;
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
        text: "Loading survey...",
    }));
    const __VLS_1 = __VLS_0({
        size: "lg",
        text: "Loading survey...",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
else if (__VLS_ctx.error) {
    // @ts-ignore
    [error,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card bg-red-900 bg-opacity-20 border-red-500" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-red-400" },
    });
    (__VLS_ctx.error);
    // @ts-ignore
    [error,];
}
else if (__VLS_ctx.questions.length > 0 && __VLS_ctx.currentQuestion) {
    // @ts-ignore
    [questions, currentQuestion,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "max-w-2xl mx-auto space-y-8" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card text-center" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-3xl font-bold text-gradient mb-2" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary" },
    });
    (__VLS_ctx.creatorName);
    // @ts-ignore
    [creatorName,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-indigo-400 mt-2 font-medium" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mb-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "text-sm text-secondary mb-2" },
    });
    (__VLS_ctx.currentQuestionIndex + 1);
    (__VLS_ctx.questions.length);
    // @ts-ignore
    [questions, currentQuestionIndex,];
    __VLS_asFunctionalElement(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-2xl font-bold mb-6" },
    });
    (__VLS_ctx.currentQuestion.text);
    // @ts-ignore
    [currentQuestion,];
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "grid md:grid-cols-2 gap-4" },
    });
    for (const [option] of __VLS_getVForSourceType((__VLS_ctx.currentQuestion.options))) {
        // @ts-ignore
        [currentQuestion,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ onClick: (...[$event]) => {
                    if (!!(__VLS_ctx.isLoading))
                        return;
                    if (!!(__VLS_ctx.error))
                        return;
                    if (!(__VLS_ctx.questions.length > 0 && __VLS_ctx.currentQuestion))
                        return;
                    __VLS_ctx.selectAnswer(option.id);
                    // @ts-ignore
                    [selectAnswer,];
                } },
            key: (option.id),
            ...{ class: "card cursor-pointer hover:scale-105 transition-transform border-2" },
            ...{ class: (__VLS_ctx.selectedAnswer === option.id ? 'border-indigo-500' : 'border-gray-700') },
        });
        // @ts-ignore
        [selectedAnswer,];
        if (option.imageUrl) {
            __VLS_asFunctionalElement(__VLS_intrinsics.img)({
                src: (option.imageUrl),
                alt: (option.text),
                ...{ class: "w-full h-32 object-cover rounded-lg mb-3" },
            });
        }
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "font-medium text-center" },
        });
        (option.text);
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-6 flex justify-between" },
    });
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "ghost",
        disabled: (__VLS_ctx.currentQuestionIndex === 0),
    }));
    const __VLS_5 = __VLS_4({
        ...{ 'onClick': {} },
        variant: "ghost",
        disabled: (__VLS_ctx.currentQuestionIndex === 0),
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    let __VLS_7;
    let __VLS_8;
    const __VLS_9 = ({ click: {} },
        { onClick: (__VLS_ctx.previousQuestion) });
    const { default: __VLS_10 } = __VLS_6.slots;
    // @ts-ignore
    [currentQuestionIndex, previousQuestion,];
    var __VLS_6;
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_11 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.selectedAnswer),
    }));
    const __VLS_12 = __VLS_11({
        ...{ 'onClick': {} },
        disabled: (!__VLS_ctx.selectedAnswer),
    }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    let __VLS_14;
    let __VLS_15;
    const __VLS_16 = ({ click: {} },
        { onClick: (__VLS_ctx.nextQuestion) });
    const { default: __VLS_17 } = __VLS_13.slots;
    // @ts-ignore
    [selectedAnswer, nextQuestion,];
    (__VLS_ctx.currentQuestionIndex === __VLS_ctx.questions.length - 1 ? 'Submit' : 'Next');
    // @ts-ignore
    [questions, currentQuestionIndex,];
    var __VLS_13;
}
/** @type {__VLS_StyleScopedClasses['container-page']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-red-900']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-opacity-20']} */ ;
/** @type {__VLS_StyleScopedClasses['border-red-500']} */ ;
/** @type {__VLS_StyleScopedClasses['text-red-400']} */ ;
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
/** @type {__VLS_StyleScopedClasses['text-indigo-400']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-2xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['md:grid-cols-2']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['cursor-pointer']} */ ;
/** @type {__VLS_StyleScopedClasses['hover:scale-105']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-transform']} */ ;
/** @type {__VLS_StyleScopedClasses['border-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-full']} */ ;
/** @type {__VLS_StyleScopedClasses['h-32']} */ ;
/** @type {__VLS_StyleScopedClasses['object-cover']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['mb-3']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-center']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
