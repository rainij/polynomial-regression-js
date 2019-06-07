import { combinations_with_replacement } from './util/itertools'

export class PolynomialFeatures {

  constructor(private degree: number,
    private include_bias: boolean = true,
    /* TODO private interaction_only: boolean = false */) {
  }

  transform(x: number[][]): number[][] {
    if (this.include_bias) {
      for (let xi of x) {
        xi.push(1);
      }
    }

    let y: number[][] = [];
    for (let xi of x) {
      let yi: number[] = [];
      console.log(xi);
      for (let comb of combinations_with_replacement(xi, this.degree)) {
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
