import { describe, expect, it } from "bun:test";
import { SegmentTree } from "./SegmentTree";

describe("SegmentTree", () => {
  describe("min mode", () => {
    it("returns Infinity for empty range before any update", () => {
      const tree = new SegmentTree(5, "min");
      expect(tree.queryRange(0, 5)).toBe(Infinity);
      expect(tree.queryRange(1, 3)).toBe(Infinity);
    });

    it("setSingle and queryRange", () => {
      const tree = new SegmentTree(5, "min");
      tree.setSingle(2, 10);
      expect(tree.queryRange(0, 5)).toBe(10);
      expect(tree.queryRange(2, 3)).toBe(10);
      expect(tree.queryRange(0, 2)).toBe(Infinity);
      expect(tree.queryRange(3, 5)).toBe(Infinity);
    });

    it("setRange and queryRange", () => {
      const tree = new SegmentTree(6, "min");
      tree.setRange(1, 4, 7);
      expect(tree.queryRange(0, 6)).toBe(7);
      expect(tree.queryRange(1, 4)).toBe(7);
      expect(tree.queryRange(0, 1)).toBe(Infinity);
      expect(tree.queryRange(4, 6)).toBe(Infinity);
    });

    it("multiple setSingle overwrites and min is correct", () => {
      const tree = new SegmentTree(4, "min");
      tree.setSingle(0, 5);
      tree.setSingle(1, 3);
      tree.setSingle(2, 8);
      tree.setSingle(3, 1);
      expect(tree.queryRange(0, 4)).toBe(1);
      expect(tree.queryRange(0, 2)).toBe(3);
      expect(tree.queryRange(2, 4)).toBe(1);
    });

    it("addRange in min mode", () => {
      const tree = new SegmentTree(3, "min");
      tree.setSingle(0, 2);
      tree.setSingle(1, 4);
      tree.setSingle(2, 6);
      tree.addRange(0, 3, 10);
      expect(tree.queryRange(0, 1)).toBe(12);
      expect(tree.queryRange(0, 3)).toBe(12);
    });

    it("clamps indices to [0, n)", () => {
      const tree = new SegmentTree(3, "min");
      tree.setSingle(1, 5);
      expect(tree.queryRange(-1, 10)).toBe(5);
      expect(tree.queryRange(0, 3)).toBe(5);
    });
  });

  describe("max mode", () => {
    it("returns -Infinity for empty range before any update", () => {
      const tree = new SegmentTree(5, "max");
      expect(tree.queryRange(0, 5)).toBe(-Infinity);
    });

    it("setSingle and queryRange", () => {
      const tree = new SegmentTree(4, "max");
      tree.setSingle(1, 20);
      tree.setSingle(3, 15);
      expect(tree.queryRange(0, 4)).toBe(20);
      expect(tree.queryRange(1, 2)).toBe(20);
      expect(tree.queryRange(3, 4)).toBe(15);
    });

    it("setRange and addRange", () => {
      const tree = new SegmentTree(4, "max");
      tree.setRange(0, 2, 5);
      tree.addRange(0, 2, 3);
      expect(tree.queryRange(0, 2)).toBe(8);
    });
  });

  describe("sum mode", () => {
    it("returns 0 for empty range before any update", () => {
      const tree = new SegmentTree(5, "sum");
      expect(tree.queryRange(0, 5)).toBe(0);
    });

    it("setRange and queryRange", () => {
      const tree = new SegmentTree(5, "sum");
      tree.setRange(0, 3, 2); // [2,2,2,0,0]
      expect(tree.queryRange(0, 3)).toBe(6);
      expect(tree.queryRange(0, 5)).toBe(6);
      expect(tree.queryRange(3, 5)).toBe(0);
    });

    it("addRange and queryRange", () => {
      const tree = new SegmentTree(4, "sum");
      tree.setRange(0, 4, 1);
      tree.addRange(1, 3, 10);
      expect(tree.queryRange(0, 1)).toBe(1);
      expect(tree.queryRange(1, 2)).toBe(11);
      expect(tree.queryRange(1, 3)).toBe(22);
      expect(tree.queryRange(0, 4)).toBe(24);
    });

    it("setSingle and addSingle", () => {
      const tree = new SegmentTree(3, "sum");
      tree.setSingle(0, 1);
      tree.setSingle(1, 2);
      tree.setSingle(2, 3);
      expect(tree.queryRange(0, 3)).toBe(6);
      tree.addSingle(1, 5);
      expect(tree.queryRange(0, 3)).toBe(11);
    });
  });

  describe("edge cases", () => {
    it("n = 1", () => {
      const tree = new SegmentTree(1, "min");
      expect(tree.queryRange(0, 1)).toBe(Infinity);
      tree.setSingle(0, 42);
      expect(tree.queryRange(0, 1)).toBe(42);
    });

    it("empty query range returns identity", () => {
      const minTree = new SegmentTree(5, "min");
      const maxTree = new SegmentTree(5, "max");
      const sumTree = new SegmentTree(5, "sum");
      expect(minTree.queryRange(2, 2)).toBe(Infinity);
      expect(maxTree.queryRange(2, 2)).toBe(-Infinity);
      expect(sumTree.queryRange(2, 2)).toBe(0);
    });

    it("out-of-bounds setRange is clamped", () => {
      const tree = new SegmentTree(3, "min");
      tree.setRange(-10, 10, 7);
      expect(tree.queryRange(0, 3)).toBe(7);
    });
  });

  describe("brute-force consistency (min)", () => {
    it("matches naive array for random setSingle and queryRange", () => {
      const n = 50;
      const tree = new SegmentTree(n, "min");
      const arr: number[] = Array(n).fill(Infinity);

      for (let op = 0; op < 200; op++) {
        if (Math.random() < 0.6) {
          const i = Math.floor(Math.random() * n);
          const v = Math.floor(Math.random() * 1000);
          tree.setSingle(i, v);
          arr[i] = v;
        } else {
          const l = Math.floor(Math.random() * n);
          const r = l + Math.floor(Math.random() * (n - l)) + 1;
          const got = tree.queryRange(l, r);
          const want = Math.min(...arr.slice(l, r));
          expect(got).toBe(want);
        }
      }
    });
  });

  describe("brute-force consistency (sum)", () => {
    it("matches naive array for setRange and addRange", () => {
      const n = 30;
      const tree = new SegmentTree(n, "sum");
      const arr: number[] = Array(n).fill(0);

      for (let op = 0; op < 100; op++) {
        const l = Math.floor(Math.random() * n);
        const r = l + Math.floor(Math.random() * (n - l)) + 1;
        const v = Math.floor(Math.random() * 20) - 5;
        if (Math.random() < 0.5) {
          tree.setRange(l, r, v);
          for (let i = l; i < r; i++) arr[i] = v;
        } else {
          tree.addRange(l, r, v);
          // biome-ignore lint/style/noNonNullAssertion: by range of `r`
          for (let i = l; i < r; i++) arr[i]! += v;
        }
        const ql = Math.floor(Math.random() * n);
        const qr = ql + Math.floor(Math.random() * (n - ql)) + 1;
        const got = tree.queryRange(ql, qr);
        const want = arr.slice(ql, qr).reduce((a, b) => a + b, 0);
        expect(got).toBe(want);
      }
    });
  });

  describe("findLeftmostOptimal", () => {
    it("finds the leftmost minimum index in a range", () => {
      const n = 8;
      const tree = new SegmentTree(n, "min");
      const values = [5, 3, 2, 7, 2, 9, 2, 4];
      values.forEach((v, i) => void tree.setSingle(i, v));

      expect(tree.findLeftmostOptimal(0, 8)).toBe(2);
      expect(tree.findLeftmostOptimal(3, 8)).toBe(4);
      expect(tree.findLeftmostOptimal(5, 7)).toBe(6);
      expect(tree.findLeftmostOptimal(7, 8)).toBe(7);
    });

    it("finds the leftmost maximum index in a range", () => {
      const n = 8;
      const tree = new SegmentTree(n, "max");
      const values = [1, 4, 4, 2, 5, 5, 3, 5];
      values.forEach((v, i) => void tree.setSingle(i, v));

      expect(tree.findLeftmostOptimal(0, 8)).toBe(4);
      expect(tree.findLeftmostOptimal(5, 8)).toBe(5);
      expect(tree.findLeftmostOptimal(6, 8)).toBe(7);
    });
  });
});
