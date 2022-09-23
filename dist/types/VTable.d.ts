import { PropType, InjectionKey } from 'vue-demi';
import { Filters, SelectionMode, TableState } from './types';
import { Store } from './Store';
export declare const storeKey: InjectionKey<Store>;
declare const _default: import("vue-demi").DefineComponent<{
    data: {
        type: ArrayConstructor;
        required: true;
    };
    filters: {
        type: PropType<Filters>;
        required: false;
        default: () => {};
    };
    currentPage: {
        type: NumberConstructor;
        required: false;
        default: any;
    };
    pageSize: {
        type: NumberConstructor;
        required: false;
        default: any;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        required: false;
        default: string;
        validator: (val: string) => boolean;
    };
    selectedClass: {
        required: false;
        type: StringConstructor;
        default: string;
    };
    selectOnClick: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    hideSortIcons: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    sortIconPosition: {
        required: false;
        type: StringConstructor;
        default: string;
    };
    sortHeaderClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    headlessMode: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}, {
    store: Store;
    tableState: import("vue-demi").ComputedRef<TableState>;
    allRowsSelected: import("vue-demi").ComputedRef<boolean>;
    toggleAllRows: () => void;
    selectAll: () => void;
    deselectAll: () => void;
    selectRows: (rows: any[]) => void;
    selectRow: (row: any) => void;
    deselectRows: (rows: any[]) => void;
    deselectRow: (row: any) => void;
    revealItem: (item: any) => boolean;
    slots: Readonly<{
        [name: string]: import("vue-demi").Slot;
    }>;
}, unknown, {}, {}, import("vue-demi").ComponentOptionsMixin, import("vue-demi").ComponentOptionsMixin, {
    stateChanged: (state: TableState) => true;
    totalPagesChanged: (pages: number) => true;
    totalItemsChanged: (pages: number) => true;
}, string, import("vue-demi").VNodeProps & import("vue-demi").AllowedComponentProps & import("vue-demi").ComponentCustomProps, Readonly<import("vue-demi").ExtractPropTypes<{
    data: {
        type: ArrayConstructor;
        required: true;
    };
    filters: {
        type: PropType<Filters>;
        required: false;
        default: () => {};
    };
    currentPage: {
        type: NumberConstructor;
        required: false;
        default: any;
    };
    pageSize: {
        type: NumberConstructor;
        required: false;
        default: any;
    };
    selectionMode: {
        type: PropType<SelectionMode>;
        required: false;
        default: string;
        validator: (val: string) => boolean;
    };
    selectedClass: {
        required: false;
        type: StringConstructor;
        default: string;
    };
    selectOnClick: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    hideSortIcons: {
        required: false;
        type: BooleanConstructor;
        default: boolean;
    };
    sortIconPosition: {
        required: false;
        type: StringConstructor;
        default: string;
    };
    sortHeaderClass: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    headlessMode: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
}>> & {
    onTotalPagesChanged?: (pages: number) => any;
    onTotalItemsChanged?: (pages: number) => any;
    onStateChanged?: (state: TableState) => any;
}, {
    filters: Filters;
    selectionMode: SelectionMode;
    selectOnClick: boolean;
    selectedClass: string;
    hideSortIcons: boolean;
    currentPage: number;
    pageSize: number;
    sortIconPosition: string;
    sortHeaderClass: string;
    headlessMode: boolean;
}>;
export default _default;
