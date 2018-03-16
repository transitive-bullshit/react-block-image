'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = (config, env) => {
  if (env === 'development') {
    return styleOverridesDevelopment(config)
  } else if (env === 'production') {
    return styleOverridesProduction(config)
  } else {
    return config
  }
}

function styleOverridesDevelopment (config) {
  const styleRule = config.module.rules.find(getStyleRuleDevelopment)
  styleRule.use = [
    {
      loader: require.resolve('style-loader')
    },
    {
      loader: require.resolve('css-loader'),
      options: {
        importLoaders: 1,
        localIdentName: '[local]__[path][name]__[hash:base64:5]',
        modules: true,
        sourceMap: true
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss'
      }
    }
  ]

  return config
}

function styleOverridesProduction (config) {
  const cssFilename = 'static/css/[name].[contenthash:8].css'
  const shouldUseRelativeAssetPaths = false

  const extractTextPluginOptions = shouldUseRelativeAssetPaths
    ? { publicPath: Array(cssFilename.split('/').length).join('../') }
    : {}

  const styleRule = config.module.rules.find(getStyleRuleProduction)
  styleRule.loader = ExtractTextPlugin.extract(
    Object.assign(
      {
        fallback: require.resolve('style-loader'),
        use: [
          {
            loader: require.resolve('css-loader'),
            options: {
              localIdentName: '[local]__[path][name]__[hash:base64:5]',
              importLoaders: 1,
              minimize: true,
              modules: true,
              sourceMap: true
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9' // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      extractTextPluginOptions
    )
  )

  return config
}

function getStyleRuleDevelopment (rule) {
  const loader = rule.use && rule.use[0]

  return (loader && typeof loader === 'string' && loader.indexOf('style-loader') > 0)
}

function getStyleRuleProduction (rule) {
  const loader = rule.loader && rule.loader[1] && rule.loader[1] && rule.loader[1].loader

  return (loader && typeof loader === 'string')
}
