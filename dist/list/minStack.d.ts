import type { CompareFn } from "../type.js";
import { Stack } from "./stack.js";
export declare class MinStack<T> extends Stack<T> {
    private compare;
    protected mins: T[];
    constructor(compare: CompareFn<T>);
    /** Get the current minimum. Time: O(1) */
    get min(): T | undefined;
    /** Push a new element onto the stack. Time: amortized O(1) + O(`compare`) */
    push(val: T): undefined;
    /** Pop the latest element. Time: amortized O(1) */
    pop(): T | undefined;
}
//# sourceMappingURL=minStack.d.ts.map