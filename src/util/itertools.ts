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

export function* combinations<T>(iterable: Iterable<T>, degree: number) {
  const pool = Array.from(iterable);
  const maxi = pool.length-1;

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
