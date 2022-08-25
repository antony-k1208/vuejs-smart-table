import { VNode } from 'vue-demi';
declare const _default: import("vue-demi").DefineComponent<{
    currentPage: {
        type: NumberConstructor;
        required: true;
    };
    totalPages: {
        type: NumberConstructor;
        required: true;
    };
    hideSinglePage: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    maxPageLinks: {
        required: false;
        type: NumberConstructor;
        default: number;
    };
    boundaryLinks: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    directionLinks: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
}, () => VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, Record<string, any>, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<{
    currentPage: number;
    totalPages: number;
    hideSinglePage: boolean;
    maxPageLinks: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
} & {}>, {
    hideSinglePage: boolean;
    maxPageLinks: number;
    boundaryLinks: boolean;
    directionLinks: boolean;
}>;
export default _default;
