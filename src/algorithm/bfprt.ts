/** Return the `k`-th smallest (0-index) element in `arr`.
 *
 * 🚀 linear time
 *
 * linear space
 *
 * Constant space is possible: https://doi.org/10.1007/3-540-19487-8_2
 */
export function bfprt(arr: number[], k: number): number {
  // biome-ignore lint/style/noNonNullAssertion: index is in bounds
  if (arr.length === 1) return arr[0]!;

  const pivot = mom(arr);
  const { small, same, big } = partition(arr, pivot);

  if (k < small.length) return bfprt(small, k);
  else if (k < small.length + same.length) return pivot;
  else return bfprt(big, k - small.length - same.length);
}

function mom(arr: number[]): number {
  // biome-ignore lint/style/noNonNullAssertion: index is in bounds
  if (arr.length < 6) return arr.sort((a, b) => a - b)[arr.length >> 1]!;

  const medians: number[] = [];
  for (let i = 0; i < arr.length; i += 5) {
    medians.push(mom(arr.slice(i, i + 5)));
  }
  return bfprt(medians, medians.length >> 1);
}

export function partition(arr: number[], pivot: number) {
  const small: number[] = [];
  const same: number[] = [];
  const big: number[] = [];

  arr.forEach((num) => {
    if (num < pivot) small.push(num);
    else if (num === pivot) same.push(num);
    else big.push(num);
  });

  return { small, same, big };
}

/** Return the median of `arr`.
 * But if `arr.length` is even, return the larger middle element.
 *
 * 🚀 linear time
 *
 * linear space
 */
export function median(arr: number[]) {
  return bfprt(arr, arr.length >> 1);
}
