import { combinations_with_replacement } from './util/itertools'

export class PolynomialFeatures {
  private _nFeaturesIn: number;

  constructor(private degree: number,
    private include_bias: boolean = true,
    /* TODO private interaction_only: boolean = false */) {
  }

  get nFeaturesIn() {
    return this._nFeaturesIn;
  }

  fit(x: number[][]) { // TODO this is only a preliminary version of fit
    this._nFeaturesIn = x[0].length;
  }

  transform(x: number[][]): number[][] {
    let y: number[][] = [];
    for (let xi of x) {
      if (xi.length !== this.nFeaturesIn) {
        let message = `Invalid input: Input dimension is ${xi.length} expected ${this.nFeaturesIn}.`;
        if (!this.nFeaturesIn) message += ' Maybe you forgot to fit(...) the data.';
        throw Error(message);
      }
      let yi: number[] = [];
      const ximod = this.include_bias ? xi.concat([1]) : xi.concat();
      for (let comb of combinations_with_replacement(ximod, this.degree)) {
        yi.push(comb.reduce((p,c) => p*=c, 1));
      }
      y.push(yi)
    }
    return y;
  }

  fitTransform(x: number[][]): number[][] {
    this.fit(x);
    return this.transform(x);
  }
}
