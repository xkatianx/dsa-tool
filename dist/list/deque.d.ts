import { Stack } from "./stack.js";
export declare class Deque<T> {
    protected left: Stack<T>;
    protected right: Stack<T>;
    get length(): number;
    get first(): T | undefined;
    get last(): T | undefined;
    at(index: number): T | undefined;
    protected moveLeft(): void;
    protected moveRight(): void;
    push(item: T): void;
    pop(): T | undefined;
    unshift(item: T): void;
    shift(): T | undefined;
    iter(): Generator<readonly [T, number, this], void, unknown>;
    iterRight(): Generator<readonly [T, number, this], void, unknown>;
}
//# sourceMappingURL=deque.d.ts.map