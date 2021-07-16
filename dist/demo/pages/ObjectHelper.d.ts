export default instanceObjectHelper;
declare const instanceObjectHelper: ObjectHelper;
declare class ObjectHelper {
    genID(): string;
    deepClone(obj: any): any;
    isObject(value: any): boolean;
}
