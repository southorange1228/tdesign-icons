import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import less from 'rollup-plugin-less';
import { terser } from 'rollup-plugin-terser';

// TODO cjs/es都改为rollup打包

const defaults = {
  compilerOptions: {
    declaration: false,
    module: 'es2015',
  },
};

const umdConfig = {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    file: 'dist/index.js',
    name: 'tdesignIconsVue',
    sourcemap: true,
  },
  external: ['vue'],
  plugins: [
    nodeResolve(),
    commonjs(),
    less({ output: 'dist/index.css' }),
    typescript({
      tsconfigOverride: defaults,
    }),
    vue({ template: { optimizeSSR: true } }),
  ],
};

const umdMiniConfig = {
  input: 'src/index.ts',
  output: {
    format: 'umd',
    file: 'dist/index.min.js',
    name: 'tdesignIconsVue',
    sourcemap: true,
  },
  external: ['vue'],
  plugins: [
    nodeResolve(),
    commonjs(),
    less({ output: 'dist/index.min.css', options: { compress: true } }),
    typescript({
      tsconfigOverride: defaults,
    }),
    vue({ template: { optimizeSSR: true } }),
    terser(),
  ],
};
export default [umdConfig, umdMiniConfig];
