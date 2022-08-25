import { SortOrder } from './types';
export declare function createIcon(props: {
    vbWidth: number;
    vbHeight: number;
    d: string;
    opacity?: number;
    disabled?: boolean;
}): import("vue-demi").VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>;
export declare function createSortIcon(order: SortOrder): import("vue-demi").VNode<import("vue-demi").RendererNode, import("vue-demi").RendererElement, {
    [key: string]: any;
}>;
