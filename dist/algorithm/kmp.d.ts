/** KMP LPS table
 *
 * `return[i]` is the maximum `k` such that `str[0..k] == str[i-k+1..=i]`,
 * except that `return[0] == 0`
 *
 * 🚀 linear time
 *
 * 🤏 linear space
 */
export declare function kmp(str: string): number[];
//# sourceMappingURL=kmp.d.ts.map