/** Boyer-Moore Voting Algorithm
 *
 * Return the majority element or null if absent.
 *
 * 🚀 linear time
 *
 * 🤏 constant space
 */
export function boyerMoore<T>(arr: T[]): T | null {
  let ans: T | null = null;
  let count = 0;
  arr.forEach((v) => {
    if (count === 0) ans = v;
    if (v === ans) count++;
    else count--;
  });

  count = 0;
  arr.forEach((v) => {
    if (v === ans) count++;
  });

  return count > arr.length / 2 ? ans : null;
}
