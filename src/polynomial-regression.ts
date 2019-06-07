import { SVD, Matrix } from 'ml-matrix'

import { PolynomialFeatures } from './polynomial-features'

export class PolynomialRegressor {
  private polyFeatures: PolynomialFeatures;
  private weights: number[][];

  constructor(degree: number, include_bias: boolean = true) {
    this.polyFeatures = new PolynomialFeatures(degree, include_bias)
  }

  get nFeaturesIn() {
    return this.polyFeatures.nFeaturesIn;
  }

  get nFeaturesOut() {
    return this.weights ? this.weights[0].length : undefined;
  }

  fit(x: number[][], y: number[][]) { // TODO error handling
    console.log("start fit");
    let xpoly = this.polyFeatures.fitTransform(x);
    this.weights = new SVD(xpoly, { autoTranspose: true }).solve(new Matrix(y)).to2DArray();
  }

  predict(x: number[][]): number[][] {
    const xpoly = this.polyFeatures.transform(x);
    let y: number[][] = [];
    for (let i = 0; i < x.length; ++i) {
      y.push(this.predictPoly(xpoly[i]));
    }
    return y;
  }

  private predictPoly(xpoly: number[]): number[] {
    let y = Array.from(Array(this.nFeaturesOut), () => 0);
    for (let i = 0; i < xpoly.length; ++i) {
      for (let j = 0; j < this.nFeaturesOut; ++j) {
        y[j] += this.weights[i][j] * xpoly[i];
      }
    }
    return y;
  }
}
