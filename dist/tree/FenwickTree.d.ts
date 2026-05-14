export declare class FenwickTree {
    protected tree: Float64Array;
    constructor(size?: number);
    /** Update the value at the given index (1-indexed). Time: O(log(n))
     *
     * Throws if index is out of bounds.
     */
    update(index: number, value: number): void;
    /** Query the sum of the values in the range [1, index] (1-indexed). Time: O(log(n)) */
    query(index: number): number;
    /** Query the sum of the values in the range [left, right] (1-indexed). Time: O(log(n)) */
    queryRange(left: number, right: number): number;
}
//# sourceMappingURL=FenwickTree.d.ts.map