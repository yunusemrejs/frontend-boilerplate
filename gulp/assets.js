// assets.mjs

// variables & paths
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  copy: {
    src: [baseDir + '/assets/fonts/**/*'],
    dest: distDir,
    base: baseDir,
  },
  bif: {
    src: baseDir + '/assets/vendor/bootstrap-icons/font/fonts/**/*',
    dest: distDir + '/assets/fonts/bootstrap-icons',
  },
  del: {
    src: [
      distDir,
      // '!' + distDir + '/assets/images/**/*.{webp,svg}',
    ],
  },
}

// require
import gulp from 'gulp'
const { src, dest, parallel, series, watch } = gulp
import { deleteAsync as del } from 'del'

// tasks
function assets() {
  return src(paths.copy.src, { base: paths.copy.base }).pipe(dest(paths.copy.dest))
}
function bifcopy() {
  return src(paths.bif.src).pipe(dest(paths.bif.dest))
}
function clean() {
  return del(paths.del.src, { force: true })
}

// export
let assetscopy = series(assets, bifcopy)
export { assetscopy, clean }
