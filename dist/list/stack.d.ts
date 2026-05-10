export declare class Stack<T> {
    protected values: T[];
    get length(): number;
    get top(): T | undefined;
    at(index: number): T | undefined;
    push(val: T): void;
    pop(): T | undefined;
}
//# sourceMappingURL=stack.d.ts.map