export declare const useDataItem: (id: string | number) => {
    index: number;
    id: string | number;
    start: Date;
    end: Date;
    name: string;
    color?: string | undefined;
} | undefined;
export declare const useData: () => {
    index: number;
    id: string | number;
    start: Date;
    end: Date;
    name: string;
    color?: string | undefined;
}[] | undefined;
