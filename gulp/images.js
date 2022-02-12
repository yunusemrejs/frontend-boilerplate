// images.js

// variables & patch
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  images: {
    webp: baseDir + '/assets/images/**/*.{jpg,png,JPG,PNG}',
    svg: baseDir + '/assets/images/**/*.{svg,SVG}',
    dest: distDir,
  },
}

// require
import gulp from 'gulp'
const { src, dest, parallel, series } = gulp
import imagemin from 'gulp-imagemin'
import imageminWebp from 'imagemin-webp'
import imageminSvgo from 'imagemin-svgo'
import changed from 'gulp-changed'
import rename from 'gulp-rename'

// task
function makewebp() {
  return src(paths.images.webp, { base: baseDir + '/' })
    .pipe(imagemin([imageminWebp({ quality: 50 })], { verbose: 'true' }))
    .pipe(rename({ extname: '.webp' }))
    .pipe(dest(paths.images.dest))
}
function makesvg() {
  return src(paths.images.svg, { base: baseDir + '/' })
    .pipe(changed(paths.images.dest))
    .pipe(imagemin([
        imageminSvgo({
          plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }]
        })
      ], { verbose: true }))
    .pipe(dest(paths.images.dest))
}

// export
export let images = series(makesvg, makewebp)
