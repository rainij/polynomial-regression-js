/** Basic combinatorial utility. For internal use only. */

/**
 * Yield all k-combinations with repition from a given sequence.
 *
 * For example if the iterable is the array [1,2,3,4] and k = 2 the resulting
 * generator yields all multi-subsequences of length 2:
 *
 *   [1,1], [2,1], [3,1], [4,1], [2,2], [3,2], [4,2], [3,3], [4,3], [4,4].
 *
 * The elements are ordered lexicographically.
 *
 * Remark: If n is the length of the iterable, there are n+k-1 over k such
 * combinations.
 *
 * See also:
 * https://en.wikipedia.org/wiki/Combination#Number_of_combinations_with_repetition
 *
 * @param iterable A finite sequence
 * @param k The length of the combinations: 1, 2, 3, ...
 */
export function* combinationsWithRepitition<T>(iterable: Iterable<T>, k: number) {
  if (k < 0) return [];

  const pool = Array.from(iterable);
  const maxi = pool.length-1;

  if (k < 0 || k % 1 !== 0) {
    throw new Error("k must be a non-negative integer.")
  }

  if (k > 0 && pool[0] === undefined) {
    throw new Error("If k is non-zero, iterable is not allowed to be empty.")
  }

  const indices: number[] = Array.from(Array(k), () => 0);
  const next: T[] = indices.map(() => pool[0]!);

  yield next;

  outerLoop:
  while (true) {
    let n = 0;
    while (indices[n] === maxi) { ++n; }
    if (n === k) break outerLoop;
    const current = indices[n] += 1;
    next[n] = pool[current]!;
    while (--n >= 0) {
      indices[n] = current;
      next[n] = pool[current]!;
    }
    yield next;
  }
}

/**
 * Yield all k-combinations from a given sequence .
 *
 * For example if the iterable is the array [1,2,3,4] and k = 2 the resulting
 * generator yields all subsequences of length 2:
 *
 *   [1,2], [1,3], [1,4], [2,3], [2,4], [3,4].
 *
 * The ordering is given as follows: Start with the k-combination with minimal
 * indices (here [1,2]), then repeat the following: Generate the next
 * combination by selecting the right-most index which can be incremented by 1
 * without making the new combination invalid (and do that), until this is
 * impossible (then all possible k-combinations are visited).
 *
 * Throws in case k > length of iterable
 *
 * Remark: If n is the length of iterable, the number of generated
 * k-combinations is given by the binomal coefficient n over k.
 *
 * See also:
 * https://en.wikipedia.org/wiki/Combination#Enumerating_k-combinations
 *
 * @param iterable A finite sequence
 * @param k The length of the combinations: 1, 2, 3, ...
 */
export function* combinations<T>(iterable: Iterable<T>, k: number) {
  const pool = Array.from(iterable);

  if (k > pool.length || k < 0 || k % 1 !== 0) {
    throw new Error("k must be in {0, 1, 2, ..., n}, where n is the length of the iterable.")
  }

  const indices: number[] = Array.from({length: k}, (_, i) => i);
  const next: T[] = indices.map(i => pool[i]!);
  yield next;

  while (true) {
    let n = k-1;
    while (indices[n] === pool.length - k + n) { --n; };
    if (n === -1) break;
    ++indices[n];
    next[n] = pool[indices[n]!]!;
    while (++n < k) {
      indices[n] = indices[n-1]! + 1;
      next[n] = pool[indices[n]!]!;
    }
    yield next;
  }
}
