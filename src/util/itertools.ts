export function* combinations_with_replacement<T>(iterable: Iterable<T>, degree: number) {
  const pool = Array.from(iterable);
  const maxi = pool.length-1;

  let indices: number[] = Array.from(Array(degree), () => 0);
  let next: T[] = Array.from(Array(degree), () => pool[0]);
  yield next;

  outerLoop:
  while (true) {
    let n = 0;
    while (indices[n] === maxi) { ++n; }
    if (n === degree) break outerLoop;
    const current = indices[n] += 1;
    next[n] = pool[current];
    while (--n >= 0) {
      indices[n] = current;
      next[n] = pool[current];
    }
    yield next;
  }
}

/**
 * Yield all subsequences of length 'degree' from a given sequence (with length >= degree).
 *
 * For example if the iterable is the array [1,2,3,4] and degree = 2
 * the resulting iterable yields all subsequences of length 2:
 *
 *   [1,2], [1,3], [1,4], [2,3], [2,4], [3,4].
 *
 * The Ordering is given as follows:
 * Start with the degree-subsequence with minimal indices (here [1,2]).
 * Repeat the following:
 *   Generate the next subsequence by selecting the right-most index
 *   which can be incremented by 1 without making the new subsequence invalid (and do that),
 * until this is impossible (then all possible subsequences of lenght degree are visited).
 *
 * See also:
 * https://en.wikipedia.org/wiki/Combination#Enumerating_k-combinations
 *
 * Return null in case degree > length of iterable
 *
 * @param iterable The finite sequence
 * @param degree The length of the subsequences
 */
export function* combinations<T>(iterable: Iterable<T>, degree: number) {
  const pool = Array.from(iterable);

  if (degree > pool.length) return null;

  let indices: number[] = Array.from({length: degree}, (v, k) => k);
  let next: T[] = Array.from({length: degree}, (v, k) => pool[k]);
  yield next;

  while (true) {
    let n = degree-1;
    while (indices[n] === pool.length - degree + n) { --n; };
    if (n === -1) break;
    ++indices[n];
    next[n] = pool[indices[n]];
    while (++n < degree) {
      indices[n] = indices[n-1] + 1;
      next[n] = pool[indices[n]];
    }
    yield next;
  }
}
