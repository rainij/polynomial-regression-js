import { PolynomialRegressor } from '../index'

/// Auxiliary function

function fitAndTestPolynomialRegressor(xtrain: number[][], ytrain: number[][],
  xtest: number[][], ytest: number[][], degree: number, numDigits: number = 6) {

  let polyReg = new PolynomialRegressor(degree);
  polyReg.fit(xtrain, ytrain);

  const ypredict = polyReg.predict(xtest);

  for (let i=0; i < ytest.length; ++i) {
    for (let j=0; j < ytest[0].length; ++j) {
      expect(ypredict[i][j]).toBeCloseTo(ytest[i][j], numDigits);
    }
  }
}

/// Following the actual tests

describe('Exactly polynomial laws and small data sets', () => {
  it('Univariate, degree 2', () => {
    let degree = 2;

    // y = x**2 + 3*x + 5
    const xtrain = [[0], [1], [2]]; // exactly enough data
    const ytrain = [[5], [9], [15]];

    const xtest = [[3]];
    const ytest = [[23]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });

  it('Univariate, degree 5', () => {
    let degree = 5;

    // y = -3*x**5 + 18*x**4 + 122*x**3 - 3.9*x**2 - x + 77
    const xtrain = [[3], [-5], [0.9], [8], [-3.7], [0.2], [-9.7], [1.5], [0.9]]; // more than enough data
    const ytrain = [[4061.9], [5359.5], [171.91733], [37707.4], [-698.54849],
                    [77.64784], [305346.55651], [546.81875], [171.91733]]

    let xtest = [[-3.14], [11.1]]
    let ytest = [[-1069.7828605727998], [-65828.40973000004]]

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });

  it('(2,1)-variate, degree 3', () => {
    let degree = 3;

    // y = 1.1*x**3 + 5*x*y**2 + x*y - y**2 + 5.9
    const xtrain = [[0,1], [2.1,3], [-3.9,9.7], [-2,-2], [7,0.8], [4.1,4], [8.3, -2.9],
                   [-1.3,9.9], [11.3,3.33], [4.4,-5.6], [8.8, 0.6], [9.1,-9.2]]; // 10 would be enough
    const ytrain = [[4.9], [107.8871], [-2026.0258999999996], [-42.9], [410.56000000000006],
                   [410.1130999999999], [951.4007000000001], [-744.4617000000001], [2246.1496500000003],
                   [733.5224], [776.2792000000003], [4517.588099999998]];

    const xtest = [[13.1,5.0], [-17.6, 12], [0.1,0.2]];
    const ytest = [[4156.8001], [-19018.2536], [5.9011000000000005]];

    fitAndTestPolynomialRegressor(xtrain, ytrain, xtest, ytest, degree);
  });
});
