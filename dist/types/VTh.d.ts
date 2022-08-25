import { PropType } from 'vue-demi';
import { SortKey, SortOrder } from './types';
declare const _default: import("vue-demi").DefineComponent<{
    sortKey: {
        type: PropType<SortKey>;
        required: false;
        default: any;
    };
    customSort: {
        type: PropType<(a: any, b: any, sortOrder: SortOrder) => number>;
        required: false;
        default: any;
    };
    defaultSort: {
        type: PropType<"desc" | "asc">;
        required: false;
        validator: (value: any) => boolean;
        default: any;
    };
}, () => import("vue-demi").VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, ("defaultSort" | "sortChanged")[], "defaultSort" | "sortChanged", import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<{
    sortKey: SortKey;
    customSort: (a: any, b: any, sortOrder: SortOrder) => number;
    defaultSort: "desc" | "asc";
} & {}>, {
    sortKey: SortKey;
    customSort: (a: any, b: any, sortOrder: SortOrder) => number;
    defaultSort: "desc" | "asc";
}>;
export default _default;
