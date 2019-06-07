import { combinations_with_replacement } from './util/itertools'

export class PolynomialFeatures {

  constructor(private degree: number,
    private include_bias: boolean = true,
    /* TODO private interaction_only: boolean = false */) {
  }

  transform(x: number[][]): number[][] {
    let y: number[][] = [];
    for (let xi of x) {
      let yi: number[] = [];
      let ximod = this.include_bias ? xi.concat([1]) : xi.concat();
      for (let comb of combinations_with_replacement(ximod, this.degree)) {
        yi.push(comb.reduce((p,c) => p*=c, 1));
      }
      y.push(yi)
    }
    return y;
  }

  sayHello() {
    console.log("Hello from PolynomialFeatures");
  }
}
