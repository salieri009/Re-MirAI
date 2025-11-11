/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { ref } from 'vue';
import Button from './Button.vue';
const props = withDefaults(defineProps(), {
    title: 'Check out my Persona!',
    text: 'My friends think I\'m a... See yours!',
});
const copied = ref(false);
const platforms = [
    {
        name: 'Instagram',
        share: (url) => {
            // Instagram doesn't support direct sharing, so copy to clipboard
            copyToClipboard(url);
        },
    },
    {
        name: 'Twitter',
        share: (url, text) => {
            const shareText = text || 'Check this out!';
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`, '_blank');
        },
    },
    {
        name: 'WhatsApp',
        share: (url, text) => {
            const shareText = text || 'Check this out!';
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`, '_blank');
        },
    },
];
const shareToPlatform = (platform) => {
    platform.share(props.url, props.text);
};
const copyLink = async () => {
    await copyToClipboard(props.url);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
};
const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
    }
    catch {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    title: 'Check out my Persona!',
    text: 'My friends think I\'m a... See yours!',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex gap-2" },
});
for (const [platform] of __VLS_getVForSourceType((__VLS_ctx.platforms))) {
    // @ts-ignore
    [platforms,];
    /** @type {[typeof Button, typeof Button, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(Button, new Button({
        ...{ 'onClick': {} },
        key: (platform.name),
        variant: "secondary",
        size: "sm",
    }));
    const __VLS_1 = __VLS_0({
        ...{ 'onClick': {} },
        key: (platform.name),
        variant: "secondary",
        size: "sm",
    }, ...__VLS_functionalComponentArgsRest(__VLS_0));
    let __VLS_3;
    let __VLS_4;
    const __VLS_5 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.shareToPlatform(platform);
                // @ts-ignore
                [shareToPlatform,];
            } });
    const { default: __VLS_6 } = __VLS_2.slots;
    (platform.name);
    var __VLS_2;
}
/** @type {[typeof Button, typeof Button, ]} */ ;
// @ts-ignore
const __VLS_7 = __VLS_asFunctionalComponent(Button, new Button({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
}));
const __VLS_8 = __VLS_7({
    ...{ 'onClick': {} },
    variant: "ghost",
    size: "sm",
}, ...__VLS_functionalComponentArgsRest(__VLS_7));
let __VLS_10;
let __VLS_11;
const __VLS_12 = ({ click: {} },
    { onClick: (__VLS_ctx.copyLink) });
const { default: __VLS_13 } = __VLS_9.slots;
// @ts-ignore
[copyLink,];
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
    d: "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
});
var __VLS_9;
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['w-4']} */ ;
/** @type {__VLS_StyleScopedClasses['h-4']} */ ;
/** @type {__VLS_StyleScopedClasses['mr-2']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
