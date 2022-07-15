import { combinations, combinationsWithRepitition } from './itertools.js'

/// Auxiliary Stuff

/**
 * Testing of itertools functions combinations and combinationsWithRepition
 */
class CombiTester {
  private _combinations: <T>(iterable: Iterable<T>, degree: number) => IterableIterator<T[]>;;

  constructor(combi: <T>(iterable: Iterable<T>, degree: number) => IterableIterator<T[]>) {
    this._combinations = combi;
  }

  // Execute the actual test:
  // Expect to get all k-sets (with/without repitition) from pool
  execute(pool: number[], k: number, desiredResult: number[][]): void {
    let result: number[][] = [];

    for (const comb of this._combinations(pool, k)) {
      result.push([...comb]); // spread operator helps creating copy
    }

    expect(result).toStrictEqual(desiredResult);
  }
}

/// Actual Tests

describe('Tests for itertools', () => {
  describe('Tests for choosing k of n without repitition', () => {
    const combiTester = new CombiTester(combinations);

    it('Choose 2 of 4', () => {
      const k = 2
      const pool = [1, 2, 3, 4];
      const desiredResult = [[1,2], [1,3], [1,4], [2,3], [2,4], [3,4]]

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 1 of 5', () => {
      const k = 1
      const pool = [1, 2, 3, 4, 5];
      const desiredResult = [[1], [2], [3], [4], [5]];

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 3 of 3', () => {
      const k = 3
      const pool = [1, 2, 3];
      const desiredResult = [[1, 2, 3]];

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 0', () => {
      const k = 0
      const pools = [[], [1], [1, 2], [1, 2, 3]];
      const desiredResult = [[]];

      for (const pool of pools) {
        combiTester.execute(pool, k, desiredResult);
      }
    });

    it('Choose less than 0 or more than n', () => {
      // TODO in this case probably good to throw error. Fractions should be
      // forbidden too.
    });
  });

  describe('Tests for choosing k of n with repitition', () => {
    const combiTester = new CombiTester(combinationsWithRepitition);

    it('Choose 2 of 4', () => {
      const k = 2
      const pool = [1, 2, 3, 4];
      const desiredResult = [[1,1], [2,1], [3,1], [4,1], [2,2], [3,2], [4,2], [3,3], [4,3], [4,4]]

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 1 of 6', () => {
      const k = 1
      const pool = [1, 2, 3, 4, 5, 6];
      const desiredResult = [[1], [2], [3], [4], [5], [6]];

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 3 of 3', () => {
      const k = 3
      const pool = [1, 2, 3];
      const desiredResult = [[1, 1, 1], [2, 1, 1], [3, 1, 1], [2, 2, 1], [3, 2, 1], [3, 3, 1], [2, 2, 2], [3, 2, 2],
        [3, 3, 2], [3, 3, 3]];

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 3 of 2', () => {
      const k = 3
      const pool = [1, 2];
      const desiredResult = [[1, 1, 1], [2, 1, 1], [2, 2, 1], [2, 2, 2]];

      combiTester.execute(pool, k, desiredResult);
    });

    it('Choose 0', () => {
      const k = 0
      const pools = [[], [1], [1, 2], [1, 2, 3]];
      const desiredResult = [[]];

      for (const pool of pools) {
        combiTester.execute(pool, k, desiredResult);
      }
    });

    it('Choose less than 0', () => {
      // TODO in this case probably good to throw error. Fractions should be
      // forbidden too.
    });
  });
})
