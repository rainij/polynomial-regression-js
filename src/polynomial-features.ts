import { combinations, combinationsWithRepitition } from './util/itertools'
import { RegressionError } from './util/util'

/** For internal use only */
export type PolynomialFeaturesConfig = { degree: number, homogeneous: boolean,
  interactionOnly: boolean, nFeaturesIn: number };

/**
 * Transforms feature vectors to vectors of certain monomials thereof.
 *
 * E.g. after setting options (degree, homogeneous, interactionOnly), and
 * *fit()*ing, *transform()*s lists of feature vectors like [a, b, c], where a,
 * b and c are numbers, into the following possible outputs
 *
 * - [a^2, ba, ca, a, b^2, cb, b, c^2, c, 1] (degree = 2), that is, all
 *   monomials in a, b, c up to degree two.
 *
 * - [a^2, ba, ca, b^2, cb, c^2] (degree = 2, homogeneous = true), that is, all
 *   monomials in a, b, c of degree exactly equal to two.
 *
 * - [ab, ac, bc] (degree = 2, homogeneous = true, interactionOnly = true), that
 *   is, all monomials in a, b, c of degree exactly equal to two and no feature
 *   raised to a power larger than one.
 *
 * - [ab, ac, a, bc, b, c, 1] (degree = 2, homogeneous = false, interactionOnly
 *   = true), that is, all monomials in a, b, c of degree at most two and no
 *   feature raised to a power larger than one.
 *
 * Of course, the number of features is not restricted to three, but must be the
 * same in each feature vector of the list to be *transformed()*.
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

    if (degree !== undefined) {
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

  /** Saves configuration to a simple option-bag.
   *
   * The configuration specifies the internal state of PolynomialFeatures
   * completely. Hence the config of the transformer can be used to save it to a
   * file.
  */
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

    this.assertValidConfig();
  }

  /** Sets the number of input features.
   *
   * Call this method before transform(...). Afterwards the transform(...)
   * method will only accept input with the correct number of features.
  */
  fit(x: number[][]) { // TODO probably one could improve this
    this._nFeaturesIn = x[0].length;
    this.assertValidConfig(); // After fitting we should have a valid config
  }

  /**
   * Returns the list of polynomial features corresponding to x.
   *
   * @param x List of features vectors (with same number of features each).
   */
  transform(x: number[][]): number[][] {
    let y: number[][] = [];
    for (const xi of x) {
      if (xi.length !== this.nFeaturesIn) {
        let message = `Invalid input: Input dimension is ${xi.length} expected ${this.nFeaturesIn}.`;
        if (!this.nFeaturesIn) message += ' Maybe you forgot to fit(...) the data.';
        throw new RegressionError(message);
      }
      let yi: number[] = [];
      const ximod = this._homogeneous ? xi.concat() : xi.concat([1]); // concat() makes a copy
      for (const comb of this._combinations(ximod, this._degree)) {
        yi.push(comb.reduce((p,c) => p*=c, 1));
      }
      if (this.interactionOnly && !this._homogeneous && this.degree !== 0) yi.push(1);
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

  /**
   * Throw error in case of invalid configuration.
   */
  assertValidConfig() {
    if (this._degree === undefined || this._homogeneous === undefined || this._nFeaturesIn === undefined
        || this._combinations === undefined) {
      throw new RegressionError("Incomplete configuration not allowed")
    }

    if (this.degree < 0) {
      throw new RegressionError("Degree not allowed to be negative");
    }

    if (this.degree % 1 !== 0) {
      throw new RegressionError("Degree must be integer");
    }

    if (this.homogenous && this.interactionOnly && this.degree > this.nFeaturesIn) {
      throw new RegressionError("Degree cannot exceed number of input features in homogenous-and-interactionOnly-mode");
    }

    if (this.nFeaturesIn % 1 !== 0) {
      throw new RegressionError("Number of input features must be integer");
    }

    if (this.nFeaturesIn < 0) {
      throw new RegressionError("Number of input features cannot be negative");
    }
  }
}
