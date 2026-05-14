import type { CompareFn } from "../type.js";
import { Deque } from "./deque.js";
import { MinStack } from "./minStack.js";
export declare class MinDeque<T> extends Deque<T> {
    private compare;
    protected left: MinStack<T>;
    protected right: MinStack<T>;
    constructor(compare: CompareFn<T>);
    /** Get the current minimum. Time: O(1) + O(`compare`) */
    get min(): T | undefined;
    protected moveLeft(): void;
}
//# sourceMappingURL=minDeque.d.ts.map