/** Gusfield's algorithm / Z algorithm
 *
 * `return[i]` is the maximum `k` such that `str[0..k] == str[i..i+k]`,
 * except that `return[0] == 0`
 *
 * 🚀 linear time
 *
 * 🤏 linear space
 */
export function gusfield(str: string) {
  const dp = Array.from(str).map(() => 0);
  // left: which scans to the rightmost
  // right: the rightmost - 1
  let [left, right] = [0, 0];
  for (let i = 1; i < str.length; i++) {
    // `dp[i - left]` has the result but at most `right - i + 1`
    // biome-ignore lint/style/noNonNullAssertion: see above
    if (i <= right) dp[i] = Math.min(right - i + 1, dp[i - left]!);
    // either stop immediately or scanning new chars
    // biome-ignore lint/style/noNonNullAssertion: i < str.length
    while (str[dp[i]!] === (str[i + dp[i]!] ?? "xx")) dp[i]++;
    // update rightmost
    // biome-ignore lint/style/noNonNullAssertion: i < str.length
    if (i + dp[i]! - 1 > right) [left, right] = [i, i + dp[i]! - 1];
  }
  return dp;
}
