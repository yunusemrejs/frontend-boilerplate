// html.mjs

// VARIABLES & PATHS
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site

// LOGIC
import gulp from 'gulp'
const { src, dest } = gulp
import panini from 'panini'

export function html() {
  panini.refresh()
  return src(baseDir + '/*.html', { base: baseDir + '/' })
    .pipe(
      panini({
        root: baseDir + '/',
        layouts: baseDir + '/layouts/',
        partials: baseDir + '/includes/',
        helpers: baseDir + '/helpers/',
        data: baseDir + '/data/',
      })
    )
    .pipe(dest(distDir + '/'))
}
