import { combinations, combinations_with_repitition } from './util/itertools'

export type PolynomialFeaturesConfig = { degree: number, include_bias: boolean,
  interaction_only: boolean, nFeaturesIn: number };

export class PolynomialFeatures {
  private _degree: number;
  private _nFeaturesIn: number;
  private _include_bias: boolean;
  private _combinations:
            <T>(iterable: Iterable<T>, degree: number) => IterableIterator<T[]>;

  constructor(degree?: number, include_bias: boolean = true,
    interaction_only: boolean = false ) {

    if (degree) {
      this._degree = degree;
      this._include_bias = include_bias;
      this._combinations = interaction_only ? combinations
                                            : combinations_with_repitition;
    }
  }

  get degree() {
    return this._degree;
  }

  get include_bias() {
    return this._include_bias;
  }

  get interaction_only() {
    return (this._combinations === combinations);
  }

  get nFeaturesIn() {
    return this._nFeaturesIn;
  }

  get config(): PolynomialFeaturesConfig {
    return { degree: this.degree, include_bias: this.include_bias,
      interaction_only: this.interaction_only, nFeaturesIn: this.nFeaturesIn };
  }

  fromConfig(config: PolynomialFeaturesConfig) {
    this._degree = config.degree;
    this._include_bias = config.include_bias;
    this._combinations = config.interaction_only ? combinations
                                                 : combinations_with_repitition;
    this._nFeaturesIn = config.nFeaturesIn;
  }

  fit(x: number[][]) { // TODO probably one could improve this
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
      const ximod = this._include_bias ? xi.concat([1]) : xi.concat();
      for (let comb of this._combinations(ximod, this._degree)) {
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
