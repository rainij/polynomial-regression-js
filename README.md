<h1 align="center">
  polynomial-regression-js
</h1>

[![npm version][npm-image]][npm-url]
[![npm download][download-image]][npm-url]

**polynomial-regression-js** is a typescript library for linear and polynomial regression in
multiple variables. It provides a class [PolynomialRegressor][doc-polynomial-regressor-url] for
multivariate polynomial regression and a class [PolynomialFeatures][doc-polynomial-features-url] for
transforming input features [x<sub>1</sub>, x<sub>2</sub>, ..., x<sub>n</sub>] into polynomial
features [..., x<sub>1</sub><sup>k<sub>1</sub></sup> x<sub>2</sub><sup>k<sub>2</sub></sup>
... x<sub>n</sub><sup>k<sub>n</sub></sup>, ...].

There is an old version of the library `regression-multivariate-polynomial ` [![npm
download][download-image]][npm-url] which is still widely used. If you use it I encourage you to
switch from the latest version of the old library to the oldest version of the new library. They are
supposed to be identical.

# Installation

`npm install --save @rainij/polynomial-regression-js`

# Usage

## PolynomialRegressor

```ts
import { PolynomialRegressor } from '@rainij/polynomial-regression-js';

// Y0 = X0^2 + 2*X0*X1, Y1 = X1^2 + 5*X0 + 1
// Quadratric functions with two inputs need (at least) seven supporting points:
const x = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 1], [2, 2]];
const y = [[0, 1], [1, 6], [4, 11], [0, 2], [0, 5], [3, 7], [12, 15]];

// Search for a polynomial model of degree = 2.
const model = new PolynomialRegressor(2);
model.fit(x,y) // Training
console.log(model.predict([[3, 3]]));
// [ [27, 25] ]
```

## PolynomialFeatures

```ts
import { PolynomialFeatures } from '@rainij/polynomial-regression-js';

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

[npm-url]: https://www.npmjs.com/package/@rainij/polynomial-regression-js

[npm-url-old]: https://www.npmjs.com/package/regression-multivariate-polynomial

[npm-image]: https://img.shields.io/npm/v/@rainij/polynomial-regression-js.svg

[npm-image-old]: https://img.shields.io/npm/v/regression-multivariate-polynomial.svg

[download-image]: https://img.shields.io/npm/dm/@rainij/polynomial-regression-js.svg

[download-image-old]: https://img.shields.io/npm/dm/regression-multivariate-polynomial.svg

[doc-url]: https://rainij.github.io/polynomial-regression-js/

[doc-polynomial-regressor-url]: https://rainij.github.io/polynomial-regression-js/classes/PolynomialRegressor.html

[doc-polynomial-features-url]: https://rainij.github.io/polynomial-regression-js/classes/PolynomialFeatures.html
