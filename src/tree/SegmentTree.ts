import { unreachable } from "../type";

const fn = {
  min: (a?: number, b?: number) => Math.min(a ?? Infinity, b ?? Infinity),
  max: (a?: number, b?: number) => Math.max(a ?? -Infinity, b ?? -Infinity),
  sum: (a?: number, b?: number) => (a ?? 0) + (b ?? 0),
} as const;

type Mode = keyof typeof fn;

export class SegmentTree {
  private readonly n: number;
  private readonly size: number;
  private readonly values: Float64Array;
  private readonly lazyAdd: Float64Array;
  private readonly lazySet: Float64Array;
  private readonly fn: (a?: number, b?: number) => number;
  private readonly mode: Mode;

  constructor(n: number, mode: Mode) {
    this.n = n;
    this.mode = mode;
    this.fn = fn[mode];

    let size = 1;
    while (size < n) size <<= 1;
    this.size = size;

    const length = size * 2;
    this.values = new Float64Array(length);
    this.lazyAdd = new Float64Array(length);
    this.lazySet = new Float64Array(length);

    const id = this.identity;
    for (let i = 1; i < length; i++) {
      this.values[i] = id;
    }
    this.lazyAdd.fill(NaN);
    this.lazySet.fill(NaN);
  }

  private get identity(): number {
    switch (this.mode) {
      case "min":
        return Infinity;
      case "max":
        return -Infinity;
      case "sum":
        return 0;
    }
    return 0;
  }

  private applySet(idx: number, value: number, len: number): void {
    if (this.mode === "sum") {
      this.values[idx] = value * len;
    } else {
      this.values[idx] = value;
    }
    this.lazySet[idx] = value;
    this.lazyAdd[idx] = NaN;
  }

  private applyAdd(idx: number, delta: number, len: number): void {
    if (this.values[idx] == null) unreachable();
    if (this.lazySet[idx] == null) unreachable();
    if (this.lazyAdd[idx] == null) unreachable();

    if (this.mode === "sum") {
      this.values[idx] += delta * len;
    } else {
      this.values[idx] += delta;
    }
    if (!Number.isNaN(this.lazySet[idx])) {
      this.lazySet[idx] += delta;
    } else if (Number.isNaN(this.lazyAdd[idx])) {
      this.lazyAdd[idx] = delta;
    } else {
      this.lazyAdd[idx] += delta;
    }
  }

  private push(idx: number, len: number): void {
    if (len <= 1) return;
    const pendingSet = this.lazySet[idx] ?? NaN;
    const pendingAdd = this.lazyAdd[idx] ?? NaN;
    if (Number.isNaN(pendingSet) && Number.isNaN(pendingAdd)) return;

    const left = idx << 1;
    const right = left | 1;
    const half = len >> 1;

    if (!Number.isNaN(pendingSet)) {
      this.applySet(left, pendingSet, half);
      this.applySet(right, pendingSet, half);
    }

    if (!Number.isNaN(pendingAdd)) {
      this.applyAdd(left, pendingAdd, half);
      this.applyAdd(right, pendingAdd, half);
    }

    this.lazySet[idx] = NaN;
    this.lazyAdd[idx] = NaN;
  }

  private pull(idx: number): void {
    const left = idx << 1;
    const right = left | 1;
    this.values[idx] = this.fn(this.values[left], this.values[right]);
  }

  setRange(inclusiveLeft: number, exclusiveRight: number, value: number): void {
    if (inclusiveLeft >= exclusiveRight) return;
    inclusiveLeft = Math.max(0, inclusiveLeft);
    exclusiveRight = Math.min(this.n, exclusiveRight);
    if (inclusiveLeft >= exclusiveRight) return;
    this.setRangeRec(1, 0, this.size, inclusiveLeft, exclusiveRight, value);
  }

  private setRangeRec(
    idx: number,
    segL: number,
    segR: number,
    qL: number,
    qR: number,
    value: number,
  ): void {
    if (qR <= segL || segR <= qL) return;
    if (qL <= segL && segR <= qR) {
      this.applySet(idx, value, segR - segL);
      return;
    }
    this.push(idx, segR - segL);
    const mid = (segL + segR) >> 1;
    this.setRangeRec(idx << 1, segL, mid, qL, qR, value);
    this.setRangeRec((idx << 1) | 1, mid, segR, qL, qR, value);
    this.pull(idx);
  }

  setSingle(pos: number, value: number): void {
    this.setRange(pos, pos + 1, value);
  }

  addRange(inclusiveLeft: number, exclusiveRight: number, value: number): void {
    if (inclusiveLeft >= exclusiveRight) return;
    inclusiveLeft = Math.max(0, inclusiveLeft);
    exclusiveRight = Math.min(this.n, exclusiveRight);
    if (inclusiveLeft >= exclusiveRight) return;
    this.addRangeRec(1, 0, this.size, inclusiveLeft, exclusiveRight, value);
  }

  private addRangeRec(
    idx: number,
    segL: number,
    segR: number,
    qL: number,
    qR: number,
    value: number,
  ): void {
    if (qR <= segL || segR <= qL) return;
    if (qL <= segL && segR <= qR) {
      this.applyAdd(idx, value, segR - segL);
      return;
    }
    this.push(idx, segR - segL);
    const mid = (segL + segR) >> 1;
    this.addRangeRec(idx << 1, segL, mid, qL, qR, value);
    this.addRangeRec((idx << 1) | 1, mid, segR, qL, qR, value);
    this.pull(idx);
  }

  addSingle(pos: number, value: number): void {
    this.addRange(pos, pos + 1, value);
  }

  queryRange(inclusiveLeft: number, exclusiveRight: number): number {
    if (inclusiveLeft >= exclusiveRight) return this.identity;
    inclusiveLeft = Math.max(0, inclusiveLeft);
    exclusiveRight = Math.min(this.n, exclusiveRight);
    if (inclusiveLeft >= exclusiveRight) return this.identity;
    return this.queryRangeRec(1, 0, this.size, inclusiveLeft, exclusiveRight);
  }

  private queryRangeRec(
    idx: number,
    segL: number,
    segR: number,
    qL: number,
    qR: number,
  ): number {
    if (qR <= segL || segR <= qL) return this.identity;
    // biome-ignore lint/style/noNonNullAssertion: index is in bounds
    if (qL <= segL && segR <= qR) return this.values[idx]!;
    this.push(idx, segR - segL);
    const mid = (segL + segR) >> 1;
    const left = this.queryRangeRec(idx << 1, segL, mid, qL, qR);
    const right = this.queryRangeRec((idx << 1) | 1, mid, segR, qL, qR);
    return this.fn(left, right);
  }

  querySingle(pos: number): number {
    return this.queryRange(pos, pos + 1);
  }

  findLeftmostOptimal(inclusiveLeft: number, exclusiveRight: number): number {
    if (this.mode === "sum") {
      throw new Error("findLeftmostOptima is only supported for min/max mode");
    }
    if (inclusiveLeft >= exclusiveRight) return -1;
    inclusiveLeft = Math.max(0, inclusiveLeft);
    exclusiveRight = Math.min(this.n, exclusiveRight);
    if (inclusiveLeft >= exclusiveRight) return -1;

    const target = this.queryRange(inclusiveLeft, exclusiveRight);
    if (this.mode === "min" && target === Infinity) return -1;
    if (this.mode === "max" && target === -Infinity) return -1;

    return this.findLeftmostOptimalRec(
      1,
      0,
      this.size,
      inclusiveLeft,
      exclusiveRight,
      target,
    );
  }

  private findLeftmostOptimalRec(
    idx: number,
    segL: number,
    segR: number,
    qL: number,
    qR: number,
    target: number,
  ): number {
    if (segR <= qL || qR <= segL) return -1;

    const fullyInside = qL <= segL && segR <= qR;
    if (fullyInside && this.values[idx] !== target) return -1;

    if (segR - segL === 1) {
      return segL;
    }

    this.push(idx, segR - segL);
    const mid = (segL + segR) >> 1;
    const left = this.findLeftmostOptimalRec(
      idx << 1,
      segL,
      mid,
      qL,
      qR,
      target,
    );
    if (left !== -1) return left;
    return this.findLeftmostOptimalRec(
      (idx << 1) | 1,
      mid,
      segR,
      qL,
      qR,
      target,
    );
  }
}
