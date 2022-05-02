<h1 align="center">
  regression-multivariate-polynomial
</h1>

[![npm version][npm-image]][npm-url]
[![npm download][download-image]][npm-url]

**regression-multivariate-polynomial** is a javascript/typescript library for linear and polynomial regression in multiple variables. It provides a class [PolynomialRegressor][doc-polynomial-regressor-url] for multivariate polynomial regression and a class [PolynomialFeatures][doc-polynomial-features-url] for transforming input features [x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub>] into polynomial features [..., x<sub>1</sub><sup>k<sub>1</sub></sup> x<sub>2</sub><sup>k<sub>2</sub></sup> ... x<sub>n</sub><sup>k<sub>n</sub></sup>, ...].

# Installation

`npm install --save regression-multivariate-polynomial`

# Usage

## PolynomialRegressor

```ts
import { PolynomialRegressor } from 'regression-multivariate-polynomial';

// Y0 = X0^2 + 2*X0X1, Y1 = X1^2 + 5*X0 + 1
// Quadratric functions with two inputs need (at least) seven supporting points:
const x = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1,1], [2,2]];
const y = [[0, 1], [1, 6], [4, 11], [0, 2], [0, 5], [3, 7], [12, 15]];

// Search for a polynomial model of degree = 2.
const model = new PolynomialRegressor(2);
model.fit(x,y) // Training
console.log(model.predict([[3, 3]]));
// [ [27, 25] ]
```

## PolynomialFeatures

```ts
import { PolynomialFeatures } from 'regression-multivariate-polynomial';

const x = [[3, 2]] // Two features: [[a, b]]

// Generate polynomial features up to degree 3
let polyFeatures = new PolynomialFeatures(3);

console.log(polyFeatures.fitTransform(x));
// [ [27, 18, 9, 12, 6, 3, 8, 4, 2, 1] ]
// That is: [ [a^3, a^2b, ab^2, ab, a, b^3, b^2, b, 1] ]
```

# API

API [documentation][doc-url] built by TypeDoc.


# License

[MIT](./LICENSE)

[npm-url]: https://www.npmjs.com/package/regression-multivariate-polynomial

[npm-image]: https://img.shields.io/npm/v/regression-multivariate-polynomial.svg

[download-image]: https://img.shields.io/npm/dm/regression-multivariate-polynomial.svg

[doc-url]: https://rainij.github.io/regression-multivariate-polynomial/index.html

[doc-polynomial-regressor-url]: https://rainij.github.io/regression-multivariate-polynomial/classes/_polynomial_regression_.polynomialregressor.html

[doc-polynomial-features-url]: https://rainij.github.io/regression-multivariate-polynomial/classes/_polynomial_features_.polynomialfeatures.html
