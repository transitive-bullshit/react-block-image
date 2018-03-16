'use strict'

const stylesOverrides = require('./overrides/styles')
const scriptsOverrides = require('./overrides/scripts')

module.exports = (config, env) => {
  config = stylesOverrides(config, env)
  config = scriptsOverrides(config, env)

  // console.log(JSON.stringify(config, null, '  '))
  return config
}
