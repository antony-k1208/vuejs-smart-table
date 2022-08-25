import { Sort, State, TableState } from './types';
import { ComputedRef, Ref } from 'vue-demi';
export declare class Store {
    state: State;
    private readonly emit;
    filteredData: ComputedRef<any[]>;
    sortedData: ComputedRef<any[]>;
    totalItems: ComputedRef<number>;
    totalPages: ComputedRef<number>;
    paginationEnabled: ComputedRef<0 | number | undefined>;
    displayData: ComputedRef<any[]>;
    tableState: ComputedRef<TableState>;
    constructor(emitFn: (event: string, payload: any) => void);
    revealItem(item: any | ((item: any) => boolean)): boolean;
    selectRow(row: any): void;
    selectRows(rows: any[]): void;
    deselectRow(row: any): void;
    deselectRows(rows: any[]): void;
    selectAll(): void;
    deselectAll(): void;
    setSort({ sortKey, customSort, sortOrder, sortId }: Sort): void;
    syncProp<K extends keyof State>(key: K, reference: Ref, deep?: boolean): void;
}
