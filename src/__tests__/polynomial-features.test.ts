import { PolynomialFeatures } from '../index'

/// Auxiliary function

function fitTransformPolynomialFeatures(degree: number, include_bias: boolean, interaction_only: boolean,
  input: number[][], desiredOutput: number[][]) {

  let polyFeatures = new PolynomialFeatures(degree, include_bias, interaction_only);
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

  it('Six features, degree 4, no bias, interaction only', () => {
    const degree = 4;
    const include_bias = false;
    const interaction_only = true;
    const input = [[13,11,7,5,3,2]];
    const desiredOutput = [[5005, 3003, 2002, 2145, 1430, 858, 1365, 910, 546, 390, 1155, 770, 462, 330, 210]];

    fitTransformPolynomialFeatures(degree, include_bias, interaction_only, input, desiredOutput);
  });

  it('Four features, degree 2, include bias, interaction only', () => {
    const degree = 2;
    const include_bias = true;
    const interaction_only = true;
    const input = [[7,5,3,2]];
    const desiredOutput = [[35, 21, 14, 7, 15, 10, 5, 6, 3, 2]];

    fitTransformPolynomialFeatures(degree, include_bias, interaction_only, input, desiredOutput);
  });
});
