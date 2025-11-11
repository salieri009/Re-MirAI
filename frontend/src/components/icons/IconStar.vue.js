/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
const __VLS_props = withDefaults(defineProps(), {
    size: 24
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    size: 24
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 100 100",
    width: (__VLS_ctx.size),
    height: (__VLS_ctx.size),
    ...{ class: "icon-star" },
    'aria-hidden': "true",
});
// @ts-ignore
[size, size,];
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "star-gradient",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%",
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "0%",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsics.filter, __VLS_intrinsics.filter)({
    id: "star-shadow",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feDropShadow)({
    dx: "1",
    dy: "2",
    stdDeviation: "2",
    'flood-opacity': "0.4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 50 10 L 55 35 L 80 35 L 60 50 L 65 75 L 50 60 L 35 75 L 40 50 L 20 35 L 45 35 Z",
    fill: "url(#star-gradient)",
    filter: "url(#star-shadow)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 50 10 L 55 35 L 50 30 Z",
    fill: "white",
    opacity: "0.6",
});
/** @type {__VLS_StyleScopedClasses['icon-star']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
