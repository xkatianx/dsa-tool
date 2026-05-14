/** Return first `k` min/max unique values in order and their amount in `arr`.
 *
 * O(`kn`) time
 *
 * O(`k`) space
 */
export function minMaxK(arr: number[], k: number) {
  const min = Array.from({ length: k }, () => ({
    value: Infinity,
    amount: 0,
  }));
  const max = Array.from({ length: k }, () => ({
    value: -Infinity,
    amount: 0,
  }));

  arr.forEach((value) => {
    let [minDone, maxDone] = [false, false];
    for (let i = 0; i < k; i++) {
      if (!minDone) {
        // biome-ignore lint/style/noNonNullAssertion: i < k
        const obj = min[i]!;
        if (value < obj.value) {
          min.splice(i, 0, { value, amount: 1 });
          min.splice(-1);
          minDone = true;
        } else if (value === obj.value) {
          obj.amount++;
          minDone = true;
        }
      }
      if (!maxDone) {
        // biome-ignore lint/style/noNonNullAssertion: i < k
        const obj = max[i]!;
        if (value > obj.value) {
          max.splice(i, 0, { value, amount: 1 });
          max.splice(-1);
          maxDone = true;
        } else if (value === obj.value) {
          obj.amount++;
          maxDone = true;
        }
      }
      if (minDone && maxDone) break;
    }
  });
  return { min, max };
}
