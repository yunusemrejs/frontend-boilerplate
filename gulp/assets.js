// assets.mjs

// VARIABLES & PATHS
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  copy: {
    src: [baseDir + '/assets/fonts/**/*', baseDir + '/assets/vendor/**/*'],
    dest: distDir,
    base: baseDir,
  },
  del: {
    src: [distDir + '/assets/*', `!${distDir}/assets/images`],
  },
}

// LOGIC
import gulp from 'gulp'
const { src, dest } = gulp
import del from 'del'

export function assetscopy() {
  return src(paths.copy.src, { base: paths.copy.base }).pipe(dest(paths.copy.dest))
}

export function clean() {
  return del(paths.del.src, { force: true })
}
