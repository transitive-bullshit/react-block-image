# react-block-image ([demo](https://transitive-bullshit.github.io/react-block-image/))

> Replacement react component for `img` that uses a `div` with `background-image` for more control + fallback support.

[![NPM](https://img.shields.io/npm/v/react-block-image.svg)](https://www.npmjs.com/package/react-block-image) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

- **background-image** for easier control over sizing
- **Fallback** image support
- **Loading** customization
- Zero dependencies
- Used in production at [Automagical](https://automagical.ai/)

## Install

```bash
npm install --save react-block-image
# of
yarn add react-block-image
```

## Usage

Check out the ([demo](https://transitive-bullshit.github.io/react-block-image/)) in the [example folder](https://github.com/transitive-bullshit/react-block-image/tree/master/example).

Minimal:

```jsx
import React, { Component } from 'react'

import BlockImage from 'react-block-image'

class Example extends Component {
  render () {
    return (
      <BlockImage src='https://example.com/example.jpg' />
    )
  }
}
```

With fallback image and loading animation:

```jsx
import React, { Component } from 'react'

import BlockImage from 'react-block-image'
import placeholder from './placeholder.jpg'

class Example extends Component {
  render () {
    return (
      <BlockImage
        src='https://example.com/example.jpg'
        fallback={placeholder}
        showPreview={true}
        loader={
          <MyLoadingAnimation />
        }
      />
    )
  }
}
```

## Props

| Property      | Type               | Default                               | Description                                                                                                                                  |
|:--------------|:-------------------|:--------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------|
| `src`         | `string`           | `undefined`                           | Required URL of the preferred image source.                                                                                                  |
| `fallback`    | `string`           | `undefined`                           | Optional URL of a fallback image.                                                                                                            |
| `children`    | `node`             | `undefined`                           | Optional children.                                                                                                                           |
| `showPreview` | `boolean`          | `false`                               | Whether or not to show fallback while preferred `src` is loading.                                                                            |
| `loader`      | `node`             | `undefined`                           | Optional node to show while `src` is loading.                                                                                                |
| `backgroundSize`        | `string`           | `cover`                     | Convenience prop for setting `background-size` on `style`.                                                                                   |
| `backgroundPosition`    | `string`           | `center center`             | Convenience prop for setting `background-position` on `style`.                                                                               |
| `backgroundRepeat`      | `string`           | `no-repeat`                 | Convenience prop for setting `background-repeat` on `style`.                                                                                 |
| `style`                 | `object`           | `undefined`                 | Optional `style` overrides for root element.                                                                                                 |
| `className`             | `string`           | `undefined`                 | Optional `className` override for root element.                                                                                              |
| `...`                   | `...`              | `undefined`                 | All other props are applied to the root element.                                                                                             |

## License

MIT © [transitive-bullshit](https://github.com/transitive-bullshit)

This module was bootstrapped with [create-react-library](https://github.com/transitive-bullshit/create-react-library).
