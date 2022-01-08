// images.mjs

// VARIABLES & PATHS
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  images: {
    src: baseDir + '/assets/images/**/*',
    dest: distDir + '/assets/images',
  },
}

// LOGIC
import gulp from 'gulp'
const { src, dest } = gulp
import imagemin from 'gulp-imagemin'
import changed from 'gulp-changed'

export function images() {
  return src(paths.images.src)
    .pipe(changed(paths.images.dest))
    .pipe(imagemin({ verbose: 'true' }))
    .pipe(dest(paths.images.dest))
}
