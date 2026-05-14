declare const fn: {
    readonly min: (a?: number, b?: number) => number;
    readonly max: (a?: number, b?: number) => number;
    readonly sum: (a?: number, b?: number) => number;
};
type Mode = keyof typeof fn;
export declare class SegmentTree {
    private readonly n;
    private readonly size;
    private readonly values;
    private readonly lazyAdd;
    private readonly lazySet;
    private readonly fn;
    private readonly mode;
    constructor(n: number, mode: Mode);
    private get identity();
    private applySet;
    private applyAdd;
    private push;
    private pull;
    setRange(inclusiveLeft: number, exclusiveRight: number, value: number): void;
    private setRangeRec;
    setSingle(pos: number, value: number): void;
    addRange(inclusiveLeft: number, exclusiveRight: number, value: number): void;
    private addRangeRec;
    addSingle(pos: number, value: number): void;
    queryRange(inclusiveLeft: number, exclusiveRight: number): number;
    private queryRangeRec;
    querySingle(pos: number): number;
    findLeftmostOptimal(inclusiveLeft: number, exclusiveRight: number): number;
    private findLeftmostOptimalRec;
}
export {};
//# sourceMappingURL=SegmentTree.d.ts.map