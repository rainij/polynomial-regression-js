import { combinations, combinationsWithRepitition } from './itertools'


interface TestCase {
  readonly k: number,
  readonly pool: readonly number[],
  readonly desiredResult: readonly (readonly number[])[],
};


describe('combinations: choose k of n without repitition', () => {
  describe('valid arguments', () => {
    it.each([
      {
        k: 0,
        pool: [],
        desiredResult: [[]],
      },
      {
        k: 0,
        pool: [1],
        desiredResult: [[]],
      },
      {
        k: 0,
        pool: [1, 2, 3],
        desiredResult: [[]],
      },
      {
        k: 1,
        pool: [1, 2, 3, 4, 5],
        desiredResult: [[1], [2], [3], [4], [5]],
      },
      {
        k: 2,
        pool: [1, 2, 3, 4],
        desiredResult: [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]],
      },
      {
        k: 3,
        pool: [1, 2, 3],
        desiredResult: [[1, 2, 3]],
      },
      {
        k: 3,
        pool: [1, 2, 3, 4],
        desiredResult: [[1, 2, 3], [1, 2, 4], [1, 3, 4], [2, 3, 4]],
      },
    ])('case no. %#', ({k, pool, desiredResult}: TestCase) => {
      const actualResult: number[][] = combinations(pool, k);
      expect(actualResult).toEqual(desiredResult);
    });
  });

  describe('invalid arguments', () => {
    it.each([
      -1,  // must be >= 0
      1.3, // must be integer
      3,   // must be <= pool-size
    ])('choose k = %j', (k: number) => {
      expect(() => combinations([1, 2], k)).toThrow();
    });
  });
});


describe('combinationsWithRepitition: choose k of n with repitition', () => {
  describe('valid arguments', () => {
    it.each([
      {
        k: 0,
        pool: [],
        desiredResult: [[]],
      },
      {
        k: 0,
        pool: [1],
        desiredResult: [[]],
      },
      {
        k: 0,
        pool: [1, 2, 3],
        desiredResult: [[]],
      },
      {
        k: 1,
        pool: [1, 2, 3, 4, 5, 6],
        desiredResult: [[1], [2], [3], [4], [5], [6]],
      },
      {
        k: 3,
        pool: [1, 2, 3],
        desiredResult: [
          [1, 1, 1], [2, 1, 1], [3, 1, 1], [2, 2, 1], [3, 2, 1], [3, 3, 1],
          [2, 2, 2], [3, 2, 2], [3, 3, 2], [3, 3, 3]
        ],
      },
      {
        k: 3,
        pool: [1, 2],
        desiredResult: [
          [1, 1, 1], [2, 1, 1], [2, 2, 1], [2, 2, 2]
        ],
      },
    ])('case no. %#', ({k, pool, desiredResult}: TestCase) => {
      const actualResult: number[][] = combinationsWithRepitition(pool, k);
      expect(actualResult).toEqual(desiredResult);
    });
  });

  // TODO test on invalid input,
  describe('invalid arguments', () => {
    it.each([
      -1,  // must be >= 0
      1.3, // must be integer
    ])('choose k = %j', (k: number) => {
      expect(() => combinationsWithRepitition([1, 2], k)).toThrow();
    });
  });
});
