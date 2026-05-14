/** Manacher's algorithm
 *
 * `return[i]` is the maximum `k` such that `str[i..i-k] == str[i..i+k]`
 *
 * 🚀 linear time
 *
 * 🤏 linear space
 */
export function manacher(str) {
    const dp = Array.from(str).map(() => 1);
    // left: which scans to the rightmost
    // right: the rightmost - 1
    let [left, right] = [0, 0];
    for (let i = 1; i < str.length; i++) {
        // `dp[left * 2 - i]` has the result but at most `right - i + 1`
        // biome-ignore lint/style/noNonNullAssertion: see above
        if (i <= right)
            dp[i] = Math.min(right - i + 1, dp[left * 2 - i]);
        // either stop immediately or scanning new chars
        // biome-ignore lint/style/noNonNullAssertion: i < str.length
        while (str[i - dp[i]] === (str[i + dp[i]] ?? "xx"))
            dp[i]++;
        // update rightmost
        // biome-ignore lint/style/noNonNullAssertion: i < str.length
        if (i + dp[i] - 1 > right)
            [left, right] = [i, i + dp[i] - 1];
    }
    return dp;
}
