declare class Registry {
    private data;
    private link;
    constructor();
    registerData(list: any): void;
    registerLinks(list: any): void;
    createAddTo(id: any, list: any, value: any, index: number): void;
    getTask(id: any): any;
    getLinks(id: any): any;
}
declare const instanceRegistry: Registry;
export default instanceRegistry;
