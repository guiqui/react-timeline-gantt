export default instance;
declare const instance: Generator;
declare class Generator {
    generateData(): {
        data: any[];
        links: any[];
    };
    addRecord(starDate: any, i: any, result: any): string;
    addLink(startId: any, endId: any, list: any): string;
    createLink(start: any, end: any): {
        id: string;
        start: any;
        startPosition: any;
        end: any;
        endPosition: any;
    };
    randomDate(start: any, end: any): Date;
    getRandomColor(): string;
    setRandomColor(): void;
}
