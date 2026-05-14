import type { CompareFn } from "../type.js";
/** Merge Sort
 *
 * Merge two non-decreasing iterators into a single non-decreasing iterator.
 *
 * 🚀 linear time
 *
 * 🤏 constant space
 */
export declare function mergeSort<T>(arr1: IterableIterator<T>, arr2: IterableIterator<T>, compare: CompareFn<T>): Generator<T, void, unknown>;
//# sourceMappingURL=mergeSort.d.ts.map