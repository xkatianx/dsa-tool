/** The function you use for `Array.prototype.sort()`:
 * Function used to determine the order of the elements.
 * It is expected to return a negative value if the first
 * argument is less than the second argument, zero if
 * they're equal, and a positive value otherwise.
 */
export type CompareFn<T> = (a: T, b: T) => number;
