/** KMP LPS table
 *
 * `return[i]` is the maximum `k` such that `str[0..k] == str[i-k+1..=i]`,
 * except that `return[0] == 0`
 *
 * 🚀 linear time
 *
 * 🤏 linear space
 */
export function kmp(str) {
    const dp = [0];
    let last = 0;
    for (let i = 1; i < str.length; i++) {
        // biome-ignore lint/style/noNonNullAssertion: last-1 is guaranteed to be in bounds
        while (last > 0 && str[last] !== str[i])
            last = dp[last - 1];
        if (str[last] === str[i])
            last++;
        dp.push(last);
    }
    return dp;
}
