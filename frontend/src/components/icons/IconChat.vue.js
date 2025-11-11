/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
const __VLS_props = withDefaults(defineProps(), {
    size: 64
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    size: 64
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
    viewBox: "0 0 120 120",
    width: (__VLS_ctx.size),
    height: (__VLS_ctx.size),
    ...{ class: "icon-chat" },
    'aria-hidden': "true",
});
// @ts-ignore
[size, size,];
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "chat-main",
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
    offset: "50%",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsics.stop)({
    offset: "100%",
    ...{ style: {} },
});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "chat-light",
    x1: "20%",
    y1: "20%",
    x2: "80%",
    y2: "80%",
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
    id: "chat-3d-shadow",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feGaussianBlur)({
    in: "SourceAlpha",
    stdDeviation: "3",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feOffset)({
    dx: "0",
    dy: "5",
    result: "offsetblur",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feComponentTransfer, __VLS_intrinsics.feComponentTransfer)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feFuncA)({
    type: "linear",
    slope: "0.35",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feMerge, __VLS_intrinsics.feMerge)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({
    in: "SourceGraphic",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "60",
    cy: "92",
    rx: "40",
    ry: "5",
    fill: "#4a044e",
    opacity: "0.3",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 25 40 Q 25 28 35 28 L 75 28 Q 85 28 85 40 L 85 65 Q 85 75 75 75 L 55 75 L 45 88 L 48 75 L 35 75 Q 25 75 25 65 Z",
    fill: "#701a75",
    filter: "url(#chat-3d-shadow)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 25 38 Q 25 26 35 26 L 75 26 Q 85 26 85 38 L 85 63 Q 85 73 75 73 L 55 73 L 45 86 L 48 73 L 35 73 Q 25 73 25 63 Z",
    fill: "url(#chat-main)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.path)({
    d: "M 30 38 Q 30 31 37 31 L 73 31 Q 80 31 80 38 L 80 63 Q 80 68 75 68 L 55 68 L 48 78 L 50 68 L 37 68 Q 30 68 30 63 Z",
    fill: "url(#chat-light)",
    opacity: "0.3",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "38",
    y: "42",
    width: "34",
    height: "3",
    rx: "1.5",
    fill: "white",
    opacity: "0.7",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "38",
    y: "52",
    width: "26",
    height: "3",
    rx: "1.5",
    fill: "white",
    opacity: "0.6",
});
__VLS_asFunctionalElement(__VLS_intrinsics.rect)({
    x: "38",
    y: "62",
    width: "30",
    height: "3",
    rx: "1.5",
    fill: "white",
    opacity: "0.5",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "40",
    cy: "38",
    rx: "10",
    ry: "8",
    fill: "white",
    opacity: "0.4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "65",
    cy: "42",
    r: "2",
    fill: "#fae8ff",
    opacity: "0.8",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "70",
    cy: "42",
    r: "2",
    fill: "#f5d0fe",
    opacity: "0.7",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "75",
    cy: "42",
    r: "2",
    fill: "#f0abfc",
    opacity: "0.6",
});
/** @type {__VLS_StyleScopedClasses['icon-chat']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
