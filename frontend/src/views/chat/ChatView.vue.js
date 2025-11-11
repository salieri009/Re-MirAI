/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
import { usePersonaStore } from '@/stores/persona';
import Button from '@/components/common/Button.vue';
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
const router = useRouter();
const personaStore = usePersonaStore();
const messageInput = ref('');
const isSending = ref(false);
const chatContainer = ref(null);
const isLoading = computed(() => personaStore.isLoading);
const persona = computed(() => {
    if (personaStore.persona && 'status' in personaStore.persona && personaStore.persona.status === 'ready') {
        return personaStore.persona;
    }
    return null;
});
const chatHistory = computed(() => personaStore.chatHistory);
onMounted(async () => {
    await personaStore.fetchChatHistory();
    scrollToBottom();
});
watch(chatHistory, () => {
    nextTick(() => {
        scrollToBottom();
    });
});
const scrollToBottom = () => {
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};
const sendMessage = async () => {
    if (!messageInput.value.trim() || isSending.value)
        return;
    const message = messageInput.value.trim();
    messageInput.value = '';
    isSending.value = true;
    try {
        await personaStore.sendMessage(message);
    }
    catch (err) {
        console.error('Failed to send message:', err);
        messageInput.value = message; // Restore message on error
    }
    finally {
        isSending.value = false;
    }
};
const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};
const goToRoom = () => {
    if (persona.value) {
        router.push(`/room/${persona.value.id}`);
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
if (__VLS_ctx.isLoading && __VLS_ctx.chatHistory.length === 0) {
    // @ts-ignore
    [isLoading, chatHistory,];
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
else {
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "max-w-4xl mx-auto space-y-6" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "flex items-center justify-between" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({
        ...{ class: "text-3xl font-bold text-gradient" },
    });
    (__VLS_ctx.persona?.name || 'Your Persona');
    // @ts-ignore
    [persona,];
    __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-secondary" },
    });
    (__VLS_ctx.persona?.archetype);
    // @ts-ignore
    [persona,];
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_4 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        variant: "ghost",
    }));
    const __VLS_5 = __VLS_4({
        ...{ 'onClick': {} },
        variant: "ghost",
    }, ...__VLS_functionalComponentArgsRest(__VLS_4));
    let __VLS_7;
    let __VLS_8;
    const __VLS_9 = ({ click: {} },
        { onClick: (__VLS_ctx.goToRoom) });
    const { default: __VLS_10 } = __VLS_6.slots;
    // @ts-ignore
    [goToRoom,];
    var __VLS_6;
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card h-96 overflow-y-auto space-y-4" },
        ref: "chatContainer",
    });
    /** @type {typeof __VLS_ctx.chatContainer} */ ;
    // @ts-ignore
    [chatContainer,];
    for (const [message, index] of __VLS_getVForSourceType((__VLS_ctx.chatHistory))) {
        // @ts-ignore
        [chatHistory,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            key: (index),
            ...{ class: ([
                    'flex',
                    message.sender === 'user' ? 'justify-end' : 'justify-start',
                ]) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: ([
                    'max-w-xs md:max-w-md rounded-lg p-4',
                    message.sender === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-card text-white border border-gray-700',
                ]) },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "whitespace-pre-wrap" },
        });
        (message.message);
        __VLS_asFunctionalElement(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "text-xs opacity-70 mt-2" },
        });
        (__VLS_ctx.formatTime(message.timestamp));
        // @ts-ignore
        [formatTime,];
    }
    if (__VLS_ctx.isSending) {
        // @ts-ignore
        [isSending,];
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "flex justify-start" },
        });
        __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "bg-card rounded-lg p-4 border border-gray-700" },
        });
        /** @type {[typeof LoadingSpinner, ]} */ ;
        // @ts-ignore
        const __VLS_11 = __VLS_asFunctionalComponent(LoadingSpinner, new LoadingSpinner({
            size: "sm",
        }));
        const __VLS_12 = __VLS_11({
            size: "sm",
        }, ...__VLS_functionalComponentArgsRest(__VLS_11));
    }
    __VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "card" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsics.form, __VLS_intrinsics.form)({
        ...{ onSubmit: (__VLS_ctx.sendMessage) },
        ...{ class: "flex gap-4" },
    });
    // @ts-ignore
    [sendMessage,];
    __VLS_asFunctionalElement(__VLS_intrinsics.input)({
        value: (__VLS_ctx.messageInput),
        type: "text",
        placeholder: "Type your message...",
        ...{ class: "input flex-1" },
        disabled: (__VLS_ctx.isSending),
    });
    // @ts-ignore
    [isSending, messageInput,];
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(Button, new Button({
        type: "submit",
        disabled: (!__VLS_ctx.messageInput.trim() || __VLS_ctx.isSending),
        loading: (__VLS_ctx.isSending),
    }));
    const __VLS_16 = __VLS_15({
        type: "submit",
        disabled: (!__VLS_ctx.messageInput.trim() || __VLS_ctx.isSending),
        loading: (__VLS_ctx.isSending),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_18 } = __VLS_17.slots;
    // @ts-ignore
    [isSending, isSending, messageInput,];
    var __VLS_17;
}
/** @type {__VLS_StyleScopedClasses['container-page']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['min-h-screen']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-4xl']} */ ;
/** @type {__VLS_StyleScopedClasses['mx-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['text-3xl']} */ ;
/** @type {__VLS_StyleScopedClasses['font-bold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-gradient']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['h-96']} */ ;
/** @type {__VLS_StyleScopedClasses['overflow-y-auto']} */ ;
/** @type {__VLS_StyleScopedClasses['space-y-4']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['max-w-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['md:max-w-md']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['whitespace-pre-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-70']} */ ;
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-start']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-card']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-gray-700']} */ ;
/** @type {__VLS_StyleScopedClasses['card']} */ ;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['input']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
