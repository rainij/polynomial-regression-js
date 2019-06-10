import { combinations, combinationsWithRepitition } from './util/itertools'

/** For internal use only */
export type PolynomialFeaturesConfig = { degree: number, homogeneous: boolean,
  interactionOnly: boolean, nFeaturesIn: number };

/**
 * Translates feature vectors to vectors of certain monomials thereof.
 *
 * E.g. after setting certain parameters (degree, ...), translates this: [x, y],
 * where x and y are numbers, into [x^2, y*x, x, y^2, y, 1], that is, all
 * monomials in x and y up to degree = 2.
 */
export class PolynomialFeatures {
  private _degree: number;
  private _nFeaturesIn: number;
  private _homogeneous: boolean;
  private _combinations:
            <T>(iterable: Iterable<T>, degree: number) => IterableIterator<T[]>;

  /**
   * Basic configuration. You can skip configuration by providing no arguments.
   *
   * In case no arguments are given you have to use the method fromConfig(...)
   * to set up a configuration in order to use the methods fit(...),
   * transform(...) and fitTransform(...).
   *
   * @param degree Highest order of the monomials
   * @param homogeneous Whether to include only highest order monomials
   * @param interactionOnly Whether to disallow higher powers of single features
   */
  constructor(degree?: number, homogeneous: boolean = false,
    interactionOnly: boolean = false ) {

    if (degree) {
      this._degree = degree;
      this._homogeneous = homogeneous;
      this._combinations = interactionOnly ? combinations
                                           : combinationsWithRepitition;
    }
  }

  /** Configuration option 'degree' */
  get degree() {
    return this._degree;
  }

  /** Configuration option 'homogenous' */
  get homogenous() {
    return this._homogeneous;
  }

  /** Configuration option 'interactionOnly' */
  get interactionOnly() {
    return (this._combinations === combinations);
  }

  /**
   * Number of input features.
   *
   * The only configuration option which is set by the fit method.
   */
  get nFeaturesIn() {
    return this._nFeaturesIn;
  }

  /** Saves configuration to a simple option-bag */
  get config(): PolynomialFeaturesConfig {
    return { degree: this.degree, homogeneous: this.homogenous,
      interactionOnly: this.interactionOnly, nFeaturesIn: this.nFeaturesIn };
  }

  /** Loads configuration from simple option-bag. */
  fromConfig(config: PolynomialFeaturesConfig) {
    this._degree = config.degree;
    this._homogeneous = config.homogeneous;
    this._combinations = config.interactionOnly ? combinations
                                                : combinationsWithRepitition;
    this._nFeaturesIn = config.nFeaturesIn;
  }

  /** Sets the number of input features.
   *
   * Call this method before transform(...). Afterwards the transform(...)
   * method will only accept input with the correct number of features.
  */
  fit(x: number[][]) { // TODO probably one could improve this
    this._nFeaturesIn = x[0].length;
  }

  /**
   * Returns the list of polynomial features corresponding to x.
   *
   * @param x List of features vectors.
   */
  transform(x: number[][]): number[][] {
    let y: number[][] = [];
    for (let xi of x) {
      if (xi.length !== this.nFeaturesIn) {
        let message = `Invalid input: Input dimension is ${xi.length} expected ${this.nFeaturesIn}.`;
        if (!this.nFeaturesIn) message += ' Maybe you forgot to fit(...) the data.';
        throw Error(message);
      }
      let yi: number[] = [];
      const ximod = this._homogeneous ? xi.concat() : xi.concat([1]);
      for (let comb of this._combinations(ximod, this._degree)) {
        yi.push(comb.reduce((p,c) => p*=c, 1));
      }
      y.push(yi)
    }
    return y;
  }

  /**
   * Same as applying first fit(...) and then transform(...) to x.
   *
   * @param x List of features vectors.
   */
  fitTransform(x: number[][]): number[][] {
    this.fit(x);
    return this.transform(x);
  }
}
