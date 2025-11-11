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
    ...{ class: "icon-mirror" },
    'aria-hidden': "true",
});
// @ts-ignore
[size, size,];
__VLS_asFunctionalElement(__VLS_intrinsics.defs, __VLS_intrinsics.defs)({});
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "mirror-main",
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
    id: "mirror-light",
    x1: "30%",
    y1: "20%",
    x2: "70%",
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
__VLS_asFunctionalElement(__VLS_intrinsics.linearGradient, __VLS_intrinsics.linearGradient)({
    id: "mirror-shadow",
    x1: "50%",
    y1: "0%",
    x2: "50%",
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
    id: "mirror-3d-shadow",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feGaussianBlur)({
    in: "SourceAlpha",
    stdDeviation: "4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feOffset)({
    dx: "0",
    dy: "6",
    result: "offsetblur",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feComponentTransfer, __VLS_intrinsics.feComponentTransfer)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feFuncA)({
    type: "linear",
    slope: "0.4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.feMerge, __VLS_intrinsics.feMerge)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({});
__VLS_asFunctionalElement(__VLS_intrinsics.feMergeNode)({
    in: "SourceGraphic",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "60",
    cy: "95",
    rx: "35",
    ry: "6",
    fill: "url(#mirror-shadow)",
    opacity: "0.4",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "60",
    cy: "60",
    rx: "38",
    ry: "48",
    fill: "#312e81",
    filter: "url(#mirror-3d-shadow)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "60",
    cy: "58",
    rx: "38",
    ry: "48",
    fill: "url(#mirror-main)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "60",
    cy: "58",
    rx: "32",
    ry: "42",
    fill: "#1e1b4b",
    opacity: "0.3",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "60",
    cy: "58",
    rx: "30",
    ry: "40",
    fill: "url(#mirror-light)",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "50",
    cy: "40",
    rx: "18",
    ry: "24",
    fill: "white",
    opacity: "0.35",
});
__VLS_asFunctionalElement(__VLS_intrinsics.ellipse)({
    cx: "48",
    cy: "35",
    rx: "10",
    ry: "15",
    fill: "white",
    opacity: "0.5",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "40",
    cy: "35",
    r: "2",
    fill: "#a5b4fc",
    opacity: "0.8",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "75",
    cy: "40",
    r: "3",
    fill: "#c7d2fe",
    opacity: "0.6",
});
__VLS_asFunctionalElement(__VLS_intrinsics.circle)({
    cx: "45",
    cy: "75",
    r: "2",
    fill: "#e0e7ff",
    opacity: "0.7",
});
/** @type {__VLS_StyleScopedClasses['icon-mirror']} */ ;
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};
