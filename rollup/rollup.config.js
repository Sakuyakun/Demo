import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/entry.js',
  format: 'es',
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      },
    }),
    babel({
      exclude: 'node_modules/**'
    })
  ],
  external: ['moment'],
  dest: 'yorha.js',
}