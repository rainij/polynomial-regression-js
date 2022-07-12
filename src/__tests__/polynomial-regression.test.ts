import { PolynomialRegressor } from '../index.js'

import * as data1 from '../../data/example1.js'
import * as data2 from '../../data/example2.js'

/// Auxiliary function

function fitAndTestPolynomialRegressor(xtrain: number[][], ytrain: number[][],
xtest: number[][], ytest: number[][], degree: number,
homogeneous: boolean = false, interactiveOnly: boolean = false, numDigits: number = 6) {

  let polyReg = new PolynomialRegressor(degree, homogeneous, interactiveOnly);
  polyReg.fit(xtrain, ytrain);

  const ypredict = polyReg.predict(xtest);
  expectToBeCloseTo(ypredict, ytest, numDigits);
}

function expectToBeCloseTo(ypredict: number[][], ytest: number[][],
numDigits: number = 6) {

  expect(ytest.length).toStrictEqual(ypredict.length);
  expect(ytest[0]!.length).toStrictEqual(ypredict[0]!.length);

  for (let i=0; i < ytest.length; ++i) {
    for (let j=0; j < ytest[0]!.length; ++j) {
      expect(ypredict[i]![j]).toBeCloseTo(ytest[i]![j]!, numDigits);
    }
  }
}

/// Following the actual tests

describe('Exactly polynomial laws and small data sets', () => {
  it('Univariate, degree 2', () => {
    const degree = 2;

    // y = x**2 + 3*x + 5
    const xtrain = [[0], [1], [2]]; // exactly enough data
    const ytrain = [[5], [9], [15]];

    const xtest = [[3]];
    const ytest = [[23]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });

  it('Univariate, degree 5', () => {
    const degree = 5;

    // y = -3*x**5 + 18*x**4 + 122*x**3 - 3.9*x**2 - x + 77
    const xtrain = [[3], [-5], [0.9], [8], [-3.7], [0.2], [-9.7], [1.5], [0.9]]; // more than enough data
    const ytrain = [[4061.9], [5359.5], [171.91733], [37707.4], [-698.54849],
                    [77.64784], [305346.55651], [546.81875], [171.91733]]

    let xtest = [[-3.14], [11.1]]
    let ytest = [[-1069.7828605727998], [-65828.40973000004]]

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });

  it('(2,1)-variate, degree 3', () => {
    const degree = 3;

    // y = 1.1*x1**3 + 5*x1*x2**2 + x1*x2 - x2**2 + 5.9
    const xtrain = [[0,1], [2.1,3], [-3.9,9.7], [-2,-2], [7,0.8], [4.1,4], [8.3, -2.9],
                   [-1.3,9.9], [11.3,3.33], [4.4,-5.6], [8.8, 0.6], [9.1,-9.2]]; // 10 would be enough
    const ytrain = [[4.9], [107.8871], [-2026.0258999999996], [-42.9], [410.56000000000006],
                   [410.1130999999999], [951.4007000000001], [-744.4617000000001], [2246.1496500000003],
                   [733.5224], [776.2792000000003], [4517.588099999998]];

    const xtest = [[13.1,5.0], [-17.6, 12], [0.1,0.2]];
    const ytest = [[4156.8001], [-19018.2536], [5.9011000000000005]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });

  it('(2,2)-variate, degree 1', () => {
    const degree = 1;

    // y = [3*x1 + 5.5*x2, -1.2*x1 + x2 - 1.23]
    const xtrain = [[1, 2], [3.5, 7.9], [-3, 1.3], [7, -7]]; // 3 would be enough
    const ytrain = [[14.0, -0.43], [53.95, 2.47], [-1.85, 3.67], [-17.5, -16.63]];

    const xtest = [[0, 0], [1, 0], [0, 1], [1, 1]];
    const ytest = [[0.0, -1.23], [3.0, -2.43], [5.5, -0.23], [8.5, -1.43]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });
});

describe('Homogeneous and small data sets', () => {
  it('Univariate, degree 2', () => {
    const degree = 2;

    // y = -3*x**2
    const xtrain = [[0], [1], [2]]; // more than enough data
    const ytrain = [[0], [-3], [-12]];

    const xtest = [[3]];
    const ytest = [[-27]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree, true);
  });

  it('(3,2)-variate, degree 1', () => {
    const degree = 1;

    // y1 = x1 + x2 + 2*x3, y2 = -x1 + 6*x2
    const xtrain = [[0,1,2], [-4,1,0], [0,1,-2]]; // exactly enough data
    const ytrain = [[5,6], [-3,10], [-3,6]];

    const xtest = [[0,0,0], [0,0,1], [0,1,0], [1,0,0]];
    const ytest = [[0,0], [2,0], [1,6], [1,-1]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree, true);
  });
});

describe('Interaction only, small data sets', () => {
  it('Univariate, degree 1', () => {
    const degree = 1;

    // y = x**2
    const xtrain = [[0], [1], [2]]; // more than enough data
    const ytrain = [[0], [1], [4]];

    const xtest = [[0], [1]];
    const ytest = [[-1/3], [5/3]]; // 2*x - 1/3

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree, false, true);
  });
});

describe('Homogeneous and interaction only, small data sets', () => {
  it('(3,1)-variate, degree 3', () => {
    const degree = 3;

    // y = x1*x2*x3 + 1
    const xtrain = [[0, 0, 0], [1, 1, 1]];
    const ytrain = [[1], [2]];

    const xtest = [[2, 2, 2]];
    const ytest = [[16]]; // 2*x1*x2*x3

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree, true, true);
  });
});

describe('Artificial polynomial data with noise (few houndred samples)', () => {
  it(`(3,1)-variate, degree ${data1.degree}, number samples ${data1.trainInput.length}`, () => {
    fitAndTestPolynomialRegressor(data1.trainInput, data1.trainOutput,
      data1.testInput, data1.testPredicted, data1.degree);
  });

  it(`(4,1)-variate, degree ${data2.degree}, number samples ${data2.trainInput.length}`, () => {
    fitAndTestPolynomialRegressor(data2.trainInput, data2.trainOutput,
      data2.testInput, data2.testPredicted, data2.degree);
  });
});

describe('Degree 0', () => {
  it('(n,1)-variate for n = 0, 1, 2, 3', () => {
    for (const n of [0, 1, 2, 3]) {
      const xtrainMaker = (k: number) => new Array(k).fill(new Array(n).fill(2.71)); // exact value irrelevant
      const xtest =[new Array(n).fill(3.14)]; // exact value irrelevant

      const cases: {ytrain: number[][], ytest: number[][], xtrain: number[][]}[]  = [];

      cases.push({ytrain: [[0.3], [0.6]], ytest: [[0.45]], xtrain: xtrainMaker(2)});
      cases.push({ytrain: [[1.1], [1.6]], ytest: [[1.35]], xtrain: xtrainMaker(2)});
      cases.push({ytrain: [[1], [2], [3]], ytest: [[2]], xtrain: xtrainMaker(3)});
      cases.push({ytrain: [[1], [2], [4]], ytest: [[2+1/3]], xtrain: xtrainMaker(3)});
      cases.push({ytrain: [[1], [3], [-17], [3.4]], ytest: [[-2.4]], xtrain: xtrainMaker(4)});
      cases.push({ytrain: [[4], [3], [4], [3]], ytest: [[3.5]], xtrain: xtrainMaker(4)});
      cases.push({ytrain: [[1], [2], [3], [4]], ytest: [[2.5]], xtrain: xtrainMaker(4)});

      for (const cs of cases) {
        const flags = [[true, true], [true, false], [false, true], [false, false]];

        for (const flag of flags) {
          const homogeneous = flag[0];
          const interactiveOnly = flag[1];
          fitAndTestPolynomialRegressor(cs.xtrain, cs.ytrain, xtest, cs.ytest, 0, homogeneous, interactiveOnly);
        }
      }
    }
  });
});

describe('Misc', () => {
  it('Save configuration and load again', () => {
    let polyReg = new PolynomialRegressor(data1.degree);
    polyReg.fit(data1.trainInput, data1.trainOutput);

    const config = polyReg.config;

    let newPolyReg = new PolynomialRegressor();
    newPolyReg.fromConfig(config);
    const ypredict = newPolyReg.predict(data1.testInput)

    expectToBeCloseTo(ypredict, data1.testPredicted);
  });
});

