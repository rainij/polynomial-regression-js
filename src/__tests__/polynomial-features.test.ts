import { PolynomialFeatures } from '../index'
import { RegressionError } from '../util/util';
import { PolynomialFeaturesConfig } from '../polynomial-features';

/// Auxiliary function

function fitTransformPolynomialFeatures(degree: number, homogeneous: boolean, interactionOnly: boolean,
  input: number[][], desiredOutput: number[][]) {

  let polyFeatures = new PolynomialFeatures(degree, homogeneous, interactionOnly);
  const output = polyFeatures.fitTransform(input);

  expect(output).toStrictEqual(desiredOutput);
}

/// Following the actual tests

describe('Tests for fit and transform methods', () => {
  it('Two features, degree 2', () => {
    const degree = 2;
    const homogeneous = false;
    const interactionOnly = false;
    const input = [[3,2]];
    const desiredOutput = [[9, 6, 3, 4, 2, 1]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Two features, degree 3', () => {
    const degree = 3;
    const homogeneous = false;
    const interactionOnly = false;
    const input = [[3,2]];
    const desiredOutput = [[27, 18, 9, 12, 6, 3, 8, 4, 2, 1]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Three features, degree 2', () => {
    const degree = 2;
    const homogeneous = false;
    const interactionOnly = false;
    const input = [[5, 3, 2]];
    const desiredOutput = [[25, 15, 10, 5, 9, 6, 3, 4, 2, 1]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Four features, degree 1', () => {
    const degree = 1;
    const homogeneous = false;
    const interactionOnly = false;
    const input = [[7, 5, 3, 2]];
    const desiredOutput = [[7, 5, 3, 2, 1]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('One feature, degree 5', () => {
    const degree = 5;
    const homogeneous = false;
    const interactionOnly = false;
    const input = [[2]];
    const desiredOutput = [[32, 16, 8, 4, 2, 1]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Three features, degree 3, homogeneous', () => {
    const degree = 3;
    const homogeneous = true;
    const interactionOnly = false;
    const input = [[5,3,2]];
    const desiredOutput = [[125, 75, 50, 45, 30, 20, 27, 18, 12, 8]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Two features, degree 3, homogeneous', () => {
    const degree = 3;
    const homogeneous = true;
    const interactionOnly = false;
    const input = [[3,2]];
    const desiredOutput = [[27, 18, 12, 8]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Three features, degree 2, homogeneous', () => {
    const degree = 2;
    const homogeneous = true;
    const interactionOnly = false;
    const input = [[5, 3, 2]];
    const desiredOutput = [[25, 15, 10, 9, 6, 4]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Three features, degree 1, homogeneous', () => {
    const degree = 1;
    const homogeneous = true;
    const interactionOnly = false;
    const input = [[5, 3, 2]];
    const desiredOutput = [[5, 3, 2]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('One feature, degree 6, homogeneous', () => {
    const degree = 6;
    const homogeneous = true;
    const interactionOnly = false;
    const input = [[2]];
    const desiredOutput = [[64]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Four features, degree 2, interaction only', () => {
    const degree = 2;
    const homogeneous = false;
    const interactionOnly = true;
    const input = [[7,5,3,2]];
    const desiredOutput = [[1, 7, 5, 3, 2, 35, 21, 14, 15, 10, 6]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Three features, degree 3, interaction only', () => {
    const degree = 3;
    const homogeneous = false;
    const interactionOnly = true;
    const input = [[5,3,2]];
    const desiredOutput = [[1, 5, 3, 2, 15, 10, 6, 30]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Six features, degree 4, homogeneous, interaction only', () => {
    const degree = 4;
    const homogeneous = true;
    const interactionOnly = true;
    const input = [[13,11,7,5,3,2]];
    const desiredOutput = [[5005, 3003, 2002, 2145, 1430, 858, 1365, 910, 546, 390, 1155, 770, 462, 330, 210]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Six features, degree 6, homogeneous, interaction only', () => {
    const degree = 6;
    const homogeneous = true;
    const interactionOnly = true;
    const input = [[13,11,7,5,3,2]];
    const desiredOutput = [[30030]];

    fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
  });

  it('Degree 0', () => {
    const degree = 0;
    const inputs = [[[]], [[2]], [[3, 2]], [[5, 3, 2]]];
    const desiredOutput = [[1]]

    const flags = [[true, true], [true, false], [false, true], [false, false]] as const;

    for (const flag of flags) {
      const homogeneous = flag[0];
      const interactionOnly = flag[1];

      for (const input of inputs) {
        fitTransformPolynomialFeatures(degree, homogeneous, interactionOnly, input, desiredOutput);
      }
    }
  })
});

describe('Error handling', () => {
  it('Detect invalid config (from constructor)', () => {
    const cases: {pF: PolynomialFeatures, x: number[][]}[] = [];
    const dummy = [[0, 8, 15]];

    cases.push({pF: new PolynomialFeatures(-1), x: dummy});
    cases.push({pF: new PolynomialFeatures(3.14), x: dummy});
    cases.push({pF: new PolynomialFeatures(3, true, true), x: [[1, 2]]});
    cases.push({pF: new PolynomialFeatures(3, false, true), x: [[1, 2]]});

    for (const cs of cases) {
      expect(() => cs.pF.fit(cs.x)).toThrow(RegressionError);
    }
  })

  it('Detect invalid config (from loaded config)', () => {
    const cases: PolynomialFeaturesConfig[] = [];

    cases.push({degree: -3, homogeneous: false, interactionOnly: false, nFeaturesIn: 7});
    cases.push({degree: 0.5, homogeneous: false, interactionOnly: false, nFeaturesIn: 7});
    cases.push({degree: 5, homogeneous: true, interactionOnly: true, nFeaturesIn: 4});
    cases.push({degree: 5, homogeneous: false, interactionOnly: true, nFeaturesIn: 4});
    cases.push({degree: 1, homogeneous: false, interactionOnly: false, nFeaturesIn: 0.5});
    cases.push({degree: -3, homogeneous: false, interactionOnly: false, nFeaturesIn: -3});

    for (const config of cases) {
      const polyFeatures = new PolynomialFeatures();
      expect(() => polyFeatures.fromConfig(config)).toThrow(RegressionError);
    }
  })
})

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
