# 🔐 Organization Contracts

![Build master](https://img.shields.io/travis/OpenST/organization-contracts/master.svg?label=build%20master&style=flat)
![Build develop](https://img.shields.io/travis/OpenST/organization-contracts/develop.svg?label=build%20develop&style=flat)
[![Discuss on Discourse](https://img.shields.io/discourse/https/discuss.openst.org/topics.svg?style=flat)][discourse]
[![Chat on Gitter](https://img.shields.io/gitter/room/ostdotcom/OST-Platform.svg?style=flat)][gitter]

An organization administers other contracts. For an individual contract or a system of contracts, an organization enables limiting execution of certain functions to the organization or other accounts it authorizes (e.g., "workers").

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Project requires [node] and [npm] to be installed.

### Cloning

```bash
git clone git@github.com:OpenST/organization-contracts.git
```

### Installing

Install npm packages:

```bash
cd organization-contracts
npm install
```
## Usage

The contracts and interfaces in this repository are primarily intended for use in other OpenST projects. Please see [Related Work].

### Compiling the contracts

The following npm script compiles updated contracts since the last compile using [truffle]:

```bash
npm run compile
```

To compile all contracts, including the ones that haven't changed:

```bash
npm run compile-all
```

### Testing the contracts

We use the [ganache] blockchain for development. Before running the tests, start `ganache`:

```bash
npm run ganache-cli
```

Test the contracts using [truffle]:

```bash
npm test
```

### Linting

[ESLint] is used to lint js files.

To lint all js files within the `./test` and `./tool` directories, run:

```bash
npm run lint
```

## Related Work

OpenST uses organization contracts and interfaces in [mosaic-contracts], [brandedtoken-contracts], and [openst-contracts] to scale, create, and define blockchain token economies.

## Contributing

There are multiple ways to contribute to this project. However, before contributing, please first review the [Code of Conduct].

We track our [issues] on GitHub.

To contribute code, please review our [Developer Guidelines] and ensure that your submissions adhere to the [Style Guide]; please also be aware, this project is under active development and we have not yet established firm contribution guidelines or acceptance criteria.

### Community

* [Forum][discourse]
* [Gitter]

[brandedtoken-contracts]: https://github.com/OpenSTFoundation/brandedtoken-contracts
[code of conduct]: https://github.com/OpenST/developer-guidelines/blob/master/CODE_OF_CONDUCT.md
[developer guidelines]: https://github.com/OpenST/developer-guidelines
[discourse]: https://discuss.openst.org/
[eslint]: https://eslint.org
[ganache]: https://github.com/trufflesuite/ganache
[gitter]: https://gitter.im/ostdotcom/OST-Platform
[issues]: https://github.com/OpenST/organization-contracts/issues
[mosaic-contracts]: https://github.com/OpenSTFoundation/mosaic-contracts
[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/get-npm
[openst-contracts]: https://github.com/OpenSTFoundation/openst-contracts
[related work]: #related-work
[style guide]: https://github.com/OpenST/developer-guidelines/blob/master/SOLIDITY_STYLE_GUIDE.md
[truffle]: https://github.com/trufflesuite/truffle