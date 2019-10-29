import path from 'path'

const name = 'de-tool';

const resolve = function (dir) {
  return path.resolve(__dirname, dir);
};

const configs = {
  esm: {
    file: resolve(`dist/${name}.esm-bundler.js`),
    format: `esm`
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: `cjs`
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: `iife`,
    name
  }
}

const defaultFormats = ['esm', 'cjs']
const packageFormats = defaultFormats
const packageConfigs = process.env.PROD_ONLY
  ? []
  : packageFormats.map(format => createConfig(configs[format]))

if (process.env.NODE_ENV === 'production') {
  packageFormats.forEach(format => {
    if (format === 'cjs') {
      packageConfigs.push(createProductionConfig(format))
    }
    if (format === 'global' || format === 'esm') {
      packageConfigs.push(createMinifiedConfig(format))
    }
  })
}

export default packageConfigs

function createConfig(output, plugins = []) {
  return {
    input: resolve(`lib/index.js`),
    // Global and Browser ESM builds inlines everything so that they can be
    // used alone.
    plugins,
    output,
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg)
      }
    }
  }
}

function createProductionConfig(format) {
  return createConfig({
    file: resolve(`dist/${name}.${format}.prod.js`),
    format: configs[format].format
  })
}

function createMinifiedConfig(format) {
  const { terser } = require('rollup-plugin-terser')
  return createConfig(
    {
      file: resolve(`dist/${name}.${format}.prod.js`),
      format: configs[format].format,
      name: configs[format].name
    },
    [
      terser()
    ]
  )
}
