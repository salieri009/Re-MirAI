import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    size: 'md',
    text: '',
});
const sizeClass = computed(() => ({
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-16',
}[props.size]));
const spinnerSizeClass = computed(() => ({
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
}[props.size]));
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    size: 'md',
    text: '',
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
    ...{ class: (['flex items-center justify-center', __VLS_ctx.sizeClass]) },
});
// @ts-ignore
[sizeClass,];
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    ...{ class: "animate-spin text-indigo-500" },
    ...{ class: (__VLS_ctx.spinnerSizeClass) },
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
});
// @ts-ignore
[spinnerSizeClass,];
__VLS_asFunctionalElement(__VLS_intrinsics.circle, __VLS_intrinsics.circle)({
    ...{ class: "opacity-25" },
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    'stroke-width': "4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path, __VLS_intrinsics.path)({
    ...{ class: "opacity-75" },
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z",
});
if (__VLS_ctx.text) {
    // @ts-ignore
    [text,];
    __VLS_asFunctionalElement(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ml-3 text-secondary" },
    });
    (__VLS_ctx.text);
    // @ts-ignore
    [text,];
}
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
/** @type {__VLS_StyleScopedClasses['text-indigo-500']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-25']} */ ;
/** @type {__VLS_StyleScopedClasses['opacity-75']} */ ;
/** @type {__VLS_StyleScopedClasses['ml-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-secondary']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
