export function* combinations_with_replacement<T>(iterable: Iterable<T>, degree: number) {
  let pool = Array.from(iterable);
  let maxi = pool.length-1;

  let indices: number[] = Array.from(Array(degree), () => 0);
  let next: T[] = Array.from(Array(degree), () => pool[0]);
  yield next;

  outerLoop:
  while (true) {
    let n = 0;
    while (indices[n] === maxi) {
      ++n; 
      if (n === degree) break outerLoop;
    }
    let current = indices[n] += 1;
    next[n] = pool[current];
    while (--n >= 0) {
      indices[n] = current;
      next[n] = pool[current];
    }
    yield next;
  }
}