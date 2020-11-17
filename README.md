![Node.js CI](https://github.com/dc-js/react-dc-js/workflows/Node.js%20CI/badge.svg)
[![npm version](https://badge.fury.io/js/react-dc-js.svg)](https://badge.fury.io/js/react-dc-js)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# Dc.js for React

React-dc-js is a library built around [dc.js](https://github.com/dc-js/dc.js) to provide React
chart bindings.
Our goal is to provide simple components to render endless dimensional charting possibilities built to work natively with
[crossfilter](http://crossfilter.github.io/crossfilter/) rendered using [d3.js](https://d3js.org/).

> 👋️ **Note**: Dc.js for React is not yet fully finished and is still under heavy development.
Documentation for specific chart properties won't be available before the 
> [first stable release](https://github.com/dc-js/react-dc-js/projects/1).

![Preview](preview.gif)

## Installation

### Using npm

```shell script
$ npm install react-dc-js
```

## Usage

This library makes an effort to seamlessly integrate with dc.js, maintaining the JSX components very similar
to each chart method usage. Most of the chart attributes are available with the exact same name as the
original function.

```javascript
import { PieChart } from 'react-dc-js';
import crossfilter from 'crossfilter2';

function YourChart() {
  const cx = crossfilter(data)
  const dimension = cx.dimension(d => d.propName)

  return <PieChart dimension={dimension} group={dimension.group()} />
}
```

## Experimenting

We provide a playground and a development server for you to experiment with any use-case. Inside the folder
`playground/` you shall find create-react-app bootstrapped with react-dc-js.

```shell script
$ npm install

$ cd playground
$ npm install
$ npm start
```

Optionally, you can also use `npm link` if you prefer to import from `react-dc-js` inside playground.

### Contributing

We welcome community support with both pull requests and reporting bugs.

To enable hot compilation while experimenting in the playground, run in a new tab:

```shell script
$ npm run build:watch
```

react-dc-js is linted with `prettier` and provides `flow.js` as a static type checker.

## License

react-dc-js is an open source javascript library and licensed under
[Apache License v2](http://www.apache.org/licenses/LICENSE-2.0.html).
