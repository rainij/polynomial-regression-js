import { SVD, Matrix } from 'ml-matrix'

import { PolynomialFeatures, PolynomialFeaturesConfig } from './polynomial-features'

/** For internal use only */
export type PolynomialRegressorConfig = {weights: number[][], polyFeatures: PolynomialFeaturesConfig};

/**
 * Model for performing multivariate polynomial regression.
 *
 * Train the model by *fit()*ing it on data available for training. Afterwards
 * *predict()*ion is possible.
 *
 * The model is implemented as a pipe consisting of two steps. First the input
 * is transformed by the class PolynomialFeatures, this reduces the problem to a
 * *linear* regression problem. Hence in the second step we simply apply linear
 * regression.
 */
export class PolynomialRegressor {
  private _polyFeatures: PolynomialFeatures;
  private _weights: number[][];

  /**
   * Basic configuration. You can skip configuration by providing no arguments.
   *
   * In case no arguments are given you have to use the method fromConfig(...)
   * to set up a configuration in order to use the method fit(...).
   *
   * For the exact meaning of the arguments see the documentation of
   * PolynomialFeatures.
   *
   * @param degree Highest order of the monomials
   * @param homogeneous Whether to include only highest order monomials
   * @param interactionOnly Whether to disallow higher powers of single features
   */
  constructor(degree?: number, homogeneous: boolean = false, interactionOnly: boolean = false) {
    if (degree) {
      this._polyFeatures = new PolynomialFeatures(degree, homogeneous, interactionOnly)
    }
  }

  /** Number of input features. */
  get nFeaturesIn() {
    return this._polyFeatures.nFeaturesIn;
  }

  /** Number of output features. */
  get nFeaturesOut() {
    return this._weights ? this._weights[0].length : undefined;
  }

  /** The weight matrix of the underlying linear regression model. */
  get weights() {
    return this._weights;
  }

  /** Instance of PolynomialFeatures responsible for transforming the input. */
  get polyFeatures() {
    return this._polyFeatures;
  }

  /**
   * Trains the model.
   *
   * @param x List of input vectors.
   * @param y List of corresponding desired output vectors.
   */
  fit(x: number[][], y: number[][]) { // TODO error handling
    let xpoly = this._polyFeatures.fitTransform(x);
    this._weights = new SVD(xpoly, { autoTranspose: true }).solve(new Matrix(y)).to2DArray();
  }

  /**
   * Make predictions.
   *
   * @param x List of inputs.
   */
  predict(x: number[][]): number[][] {
    const xpoly = this._polyFeatures.transform(x);
    let y: number[][] = [];
    for (let i = 0; i < x.length; ++i) {
      y.push(this.predictPoly(xpoly[i]));
    }
    return y;
  }

  /** Saves configuration to a simple option-bag
   *
   * The configuration specifies the internal state of a PolynomialRegressor
   * completely. Hence the config of a fitted model can be used to save the
   * model to a file.
  */
  get config(): PolynomialRegressorConfig {
    return {weights: this.weights, polyFeatures: this.polyFeatures ? this.polyFeatures.config : undefined};
  }

  /** Loads configuration from simple option-bag.
   *
   * @param config The configuration to load from.
   */
  fromConfig(config: PolynomialRegressorConfig) {
    this._weights = config.weights;
    this._polyFeatures = new PolynomialFeatures();
    this._polyFeatures.fromConfig(config.polyFeatures)
  }

  /** For internal use only. */
  private predictPoly(xpoly: number[]): number[] {
    let y = Array.from(Array(this.nFeaturesOut), () => 0);
    for (let i = 0; i < xpoly.length; ++i) {
      for (let j = 0; j < this.nFeaturesOut; ++j) {
        y[j] += this._weights[i][j] * xpoly[i];
      }
    }
    return y;
  }
}
