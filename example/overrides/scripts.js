'use strict'

module.exports = (config, env) => {
  // remove enforced pre-eslint validation during dev
  const eslintIndex = config.module.rules.findIndex(getEslintRule)
  if (eslintIndex >= 0) {
    config.module.rules = config.module.rules.slice(0, eslintIndex).concat(config.module.rules.slice(eslintIndex + 1))
  }

  // allow for extending default eslint options via standard eslintrc
  // eslint.use[0].options.useEslintrc = true

  return config
}

function getEslintRule (rule) {
  const { enforce, use } = rule
  return (enforce === 'pre' && use && use[0] && use[0].loader)
}
