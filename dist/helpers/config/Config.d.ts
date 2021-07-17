declare class Config {
    private data;
    constructor();
    load: (values?: any) => void;
    populate(values: any, defvalues: any, final: any): void;
    isObject(value: any): boolean;
    get values(): any;
}
declare const config: Config;
export default config;
