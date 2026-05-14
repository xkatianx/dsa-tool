import { describe, expect, it } from "bun:test";
import { mergeSort } from "./mergeSort";

describe("mergeSort", () => {
  const numberCompare = (a: number, b: number) => a - b;
  const stringCompare = (a: string, b: string) => a.localeCompare(b);

  describe("with numbers", () => {
    it("should merge two sorted arrays of equal length", () => {
      const arr1 = [1, 3, 5, 7][Symbol.iterator]();
      const arr2 = [2, 4, 6, 8][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it("should merge two sorted arrays of different lengths", () => {
      const arr1 = [1, 3, 5][Symbol.iterator]();
      const arr2 = [2, 4, 6, 8, 10][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([1, 2, 3, 4, 5, 6, 8, 10]);
    });

    it("should handle one empty array", () => {
      const arr1 = [1, 2, 3][Symbol.iterator]();
      const arr2 = [][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([1, 2, 3]);
    });

    it("should handle both empty arrays", () => {
      const arr1 = [][Symbol.iterator]();
      const arr2 = [][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([]);
    });

    it("should handle arrays with duplicate values", () => {
      const arr1 = [1, 2, 2, 3][Symbol.iterator]();
      const arr2 = [2, 2, 4, 5][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([1, 2, 2, 2, 2, 3, 4, 5]);
    });

    it("should handle single element arrays", () => {
      const arr1 = [5][Symbol.iterator]();
      const arr2 = [3][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([3, 5]);
    });

    it("should handle negative numbers", () => {
      const arr1 = [-5, -3, -1][Symbol.iterator]();
      const arr2 = [-4, -2, 0][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([-5, -4, -3, -2, -1, 0]);
    });
  });

  describe("with strings", () => {
    it("should merge two sorted string arrays", () => {
      const arr1 = ["apple", "cherry", "grape"][Symbol.iterator]();
      const arr2 = ["banana", "date", "fig"][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, stringCompare));
      expect(result).toEqual([
        "apple",
        "banana",
        "cherry",
        "date",
        "fig",
        "grape",
      ]);
    });

    it("should handle empty string arrays", () => {
      const arr1 = ["a", "b"][Symbol.iterator]();
      const arr2 = [][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, stringCompare));
      expect(result).toEqual(["a", "b"]);
    });
  });

  describe("with custom objects", () => {
    interface Person {
      name: string;
      age: number;
    }

    const personCompare = (a: Person, b: Person) => a.age - b.age;

    it("should merge arrays of custom objects", () => {
      const arr1: Person[] = [
        { name: "Alice", age: 25 },
        { name: "Charlie", age: 35 },
      ];
      const arr2: Person[] = [
        { name: "Bob", age: 30 },
        { name: "David", age: 40 },
      ];

      const result = Array.from(
        mergeSort(
          arr1[Symbol.iterator](),
          arr2[Symbol.iterator](),
          personCompare,
        ),
      );
      expect(result).toEqual([
        { name: "Alice", age: 25 },
        { name: "Bob", age: 30 },
        { name: "Charlie", age: 35 },
        { name: "David", age: 40 },
      ]);
    });
  });

  describe("edge cases", () => {
    it("should handle arrays where all elements in first array are smaller", () => {
      const arr1 = [1, 2, 3][Symbol.iterator]();
      const arr2 = [4, 5, 6][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle arrays where all elements in second array are smaller", () => {
      const arr1 = [4, 5, 6][Symbol.iterator]();
      const arr2 = [1, 2, 3][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should handle arrays with zero values", () => {
      const arr1 = [-1, 0, 1][Symbol.iterator]();
      const arr2 = [-2, 0, 2][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([-2, -1, 0, 0, 1, 2]);
    });

    it("should handle very large numbers", () => {
      const arr1 = [Number.MAX_SAFE_INTEGER - 1, Number.MAX_SAFE_INTEGER][
        Symbol.iterator
      ]();
      const arr2 = [Number.MAX_SAFE_INTEGER - 2][Symbol.iterator]();

      const result = Array.from(mergeSort(arr1, arr2, numberCompare));
      expect(result).toEqual([
        Number.MAX_SAFE_INTEGER - 2,
        Number.MAX_SAFE_INTEGER - 1,
        Number.MAX_SAFE_INTEGER,
      ]);
    });
  });

  describe("iterator behavior", () => {
    it("should work with generator functions", () => {
      function* gen1() {
        yield 1;
        yield 3;
        yield 5;
      }

      function* gen2() {
        yield 2;
        yield 4;
        yield 6;
      }

      const result = Array.from(mergeSort(gen1(), gen2(), numberCompare));
      expect(result).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("should not consume iterators beyond necessary", () => {
      let callCount1 = 0;
      let callCount2 = 0;

      const arr1 = {
        *[Symbol.iterator]() {
          callCount1++;
          yield 1;
          callCount1++;
          yield 3;
        },
      };

      const arr2 = {
        *[Symbol.iterator]() {
          callCount2++;
          yield 2;
          callCount2++;
          yield 4;
        },
      };

      const result = Array.from(
        mergeSort(
          arr1[Symbol.iterator](),
          arr2[Symbol.iterator](),
          numberCompare,
        ),
      );
      expect(result).toEqual([1, 2, 3, 4]);
      // Each iterator should be called exactly twice (once for each element)
      expect(callCount1).toBe(2);
      expect(callCount2).toBe(2);
    });
  });
});
