import { PolynomialFeatures } from '../index'

/// Auxiliary function

function fitTransformPolynomialFeatures(degree: number, homogeneous: boolean, interactionOnly: boolean,
  input: number[][], desiredOutput: number[][]) {

  let polyFeatures = new PolynomialFeatures(degree, homogeneous, interactionOnly);
  const output = polyFeatures.fitTransform(input);

  expect(output).toStrictEqual(desiredOutput);
}

/// Following the actual tests

describe('Tests for fit and transform methods', () => {
  it('Two features, degree 2, include bias, full', () => {
    const degree = 2;
    const homogeneous = false;
    const interactionOnly = false;
    const input = [[3,2]];
    const desiredOutput = [[9, 6, 3, 4, 2, 1]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Three features, degree 3, no bias, full', () => {
    const degree = 3;
    const homogeneous = true;
    const interactionOnly = false;
    const input = [[5,3,2]];
    const desiredOutput = [[125, 75, 50, 45, 30, 20, 27, 18, 12, 8]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Six features, degree 4, no bias, interaction only', () => {
    const degree = 4;
    const homogeneous = true;
    const interactionOnly = true;
    const input = [[13,11,7,5,3,2]];
    const desiredOutput = [[5005, 3003, 2002, 2145, 1430, 858, 1365, 910, 546, 390, 1155, 770, 462, 330, 210]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Four features, degree 2, include bias, interaction only', () => {
    const degree = 2;
    const homogeneous = false;
    const interactionOnly = true;
    const input = [[7,5,3,2]];
    const desiredOutput = [[35, 21, 14, 7, 15, 10, 5, 6, 3, 2]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });
});

describe('Misc', () => {
  it('Save configuration and load again', () => {
    const input = [[7,5,3,2]];
    const desiredOutput = [[105, 70, 42, 30]];

    let polyFeatures = new PolynomialFeatures(3, true, true);
    polyFeatures.fit(input);

    const config = polyFeatures.config;

    let newPolyFeatures = new PolynomialFeatures();
    newPolyFeatures.fromConfig(config);
    const output = newPolyFeatures.transform(input)

    expect(output).toStrictEqual(desiredOutput)
  });
});
