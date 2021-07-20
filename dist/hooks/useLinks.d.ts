export declare const useTaskLinks: (task_id?: string | number | undefined) => {
    index: number;
    id: string | number;
    source: string | number;
    sourceHandle?: string | undefined;
    target: string | number;
    targetHandle?: string | undefined;
}[] | undefined;
export declare const useLink: (id?: string | number | undefined) => {
    index: number;
    id: string | number;
    source: string | number;
    sourceHandle?: string | undefined;
    target: string | number;
    targetHandle?: string | undefined;
} | undefined;
export declare const useLinks: () => {
    index: number;
    id: string | number;
    source: string | number;
    sourceHandle?: string | undefined;
    target: string | number;
    targetHandle?: string | undefined;
}[] | undefined;
