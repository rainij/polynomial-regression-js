import { SVD, Matrix } from 'ml-matrix'

import { PolynomialFeatures, PolynomialFeaturesConfig } from './polynomial-features'

export type PolynomialRegressorConfig = {weights: number[][], polyFeatures: PolynomialFeaturesConfig};

export class PolynomialRegressor {
  private _polyFeatures: PolynomialFeatures;
  private _weights: number[][];

  constructor(degree?: number, include_bias: boolean = true, interaction_only: boolean = false) {
    if (degree) {
      this._polyFeatures = new PolynomialFeatures(degree, include_bias, interaction_only)
    }
  }

  get nFeaturesIn() {
    return this._polyFeatures.nFeaturesIn;
  }

  get nFeaturesOut() {
    return this._weights ? this._weights[0].length : undefined;
  }

  get weights() {
    return this._weights;
  }

  get polyFeatures() {
    return this._polyFeatures;
  }

  fit(x: number[][], y: number[][]) { // TODO error handling
    let xpoly = this._polyFeatures.fitTransform(x);
    this._weights = new SVD(xpoly, { autoTranspose: true }).solve(new Matrix(y)).to2DArray();
  }

  predict(x: number[][]): number[][] {
    const xpoly = this._polyFeatures.transform(x);
    let y: number[][] = [];
    for (let i = 0; i < x.length; ++i) {
      y.push(this.predictPoly(xpoly[i]));
    }
    return y;
  }

  get config(): PolynomialRegressorConfig {
    return {weights: this.weights, polyFeatures: this.polyFeatures ? this.polyFeatures.config : undefined};
  }

  fromConfig(config: PolynomialRegressorConfig) {
    this._weights = config.weights;
    this._polyFeatures = new PolynomialFeatures();
    this._polyFeatures.fromConfig(config.polyFeatures)
  }

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
