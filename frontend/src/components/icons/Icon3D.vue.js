/// <reference types="D:/UTS/ToyProjecT_2/frontend/node_modules/.vue-global-types/vue_3.5_0.d.ts" />
import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    size: 'md'
});
const sizeClass = computed(() => {
    const sizes = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-20 h-20',
        xl: 'w-24 h-24'
    };
    return sizes[props.size];
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_defaults = {
    size: 'md'
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['icon-3d']} */ ;
__VLS_asFunctionalElement(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "icon-3d" },
    ...{ class: (__VLS_ctx.sizeClass) },
});
// @ts-ignore
[sizeClass,];
var __VLS_0 = {};
/** @type {__VLS_StyleScopedClasses['icon-3d']} */ ;
// @ts-ignore
var __VLS_1 = __VLS_0;
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
