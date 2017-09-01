import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

import postcss from 'rollup-plugin-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
  entry: 'src/entry.js',
  format: 'es',
  plugins: [
    postcss({
      extensions: [ '.css' ],
      plugins: [
        cssnext({ warnForDuplicates: false, }),
        cssnano()
      ]
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    (process.env.NODE_ENV === 'production' && uglify({}, minify)),
  ],
  external: ['moment'],
  dest: 'yorha.js',
}
