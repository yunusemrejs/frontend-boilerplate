// js.mjs

// VARIABLES & PATHS
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  src: baseDir + '/assets/js/main.js',
  dest: distDir + '/assets/js/main.min.js',
}

// LOGIC
import { env } from 'process'
import { rollup } from 'rollup'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'


export async function scripts() {
  const bundle = await rollup({
    input: paths.src,
    plugins: [nodeResolve(), commonjs({ include: 'node_modules/**' }), babel({ babelHelpers: 'bundled' })],
  })

  await bundle.write({
    file: paths.dest,
    format: 'iife',
    name: 'main',
    sourcemap: env.BUILD === 'production' ? false : true,
    plugins: env.BUILD === 'production' ? [terser({compress: {passes: 2}, format: {comments: false}})] : false,
  })
}
