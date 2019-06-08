import { PolynomialFeatures } from '../index'

/// Auxiliary function

function fitTransformPolynomialFeatures(degree: number, include_bias: boolean, interaction_only: boolean,
  input: number[][], desiredOutput: number[][]) {

  let polyFeatures = new PolynomialFeatures(degree, include_bias);
  const output = polyFeatures.fitTransform(input);

  expect(output).toStrictEqual(desiredOutput);
}

/// Following the actual tests

describe('Tests for class PolynomialFeatures', () => {
  it('Two features, degree 2, include bias, full', () => {
    const degree = 2;
    const include_bias = true;
    const interaction_only = false;
    const input = [[3,2]];
    const desiredOutput = [[9, 6, 3, 4, 2, 1]];

    fitTransformPolynomialFeatures(degree, include_bias, interaction_only, input, desiredOutput);
  });

  it('Three features, degree 3, no bias, full', () => {
    const degree = 3;
    const include_bias = false;
    const interaction_only = false;
    const input = [[5,3,2]];
    const desiredOutput = [[125, 75, 50, 45, 30, 20, 27, 18, 12, 8]];

    fitTransformPolynomialFeatures(degree, include_bias, interaction_only, input, desiredOutput);
  });
});
