// gulpfile.js

// VARIABLES & PATHS
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
const fileswatch = 'html,htm,php,txt,js,mjs,scss,sass,css,jpg,png,svg,json,md' // List of files extensions for watching & hard reload

// LOGIC
import gulp from 'gulp'
const { parallel, series, watch } = gulp
import browsersync from 'browser-sync'
import { html } from './gulp/html.js'
import { deploy } from './gulp/deploy.js'
import { images } from './gulp/images.js'
import { styles } from './gulp/styles.js'
import { scripts } from './gulp/scripts.js'
import { clean, assetscopy } from './gulp/assets.js'

function browserSync() {
  browsersync.init({
    files: [baseDir + '/**/*', distDir + '/**/*'],
    watch: true,
    notify: false,
    server: { baseDir: distDir },
    online: true, // If «false» - Browsersync will work offline without internet connection
    browser: ['firefox'], // open in firefox
  })
}

function watchDev() {
  watch(`./${baseDir}/**/*.{html,htm}`, { usePolling: true }, html)
  watch(`./${baseDir}/assets/js/**/*.{js,mjs,cjs}`, { usePolling: true }, scripts)
  watch(`./${baseDir}/assets/scss/**/*.{scss,sass,css}`, { usePolling: true }, styles)
  watch(`./${baseDir}/assets/img/**/*.{jpg,png,svg}`, { usePolling: true }, images)
  watch(`./${distDir}/**/*.{${fileswatch}}`, { usePolling: true }).on('change', browsersync.reload)
}

export { html, clean, assetscopy, styles, scripts, images, deploy }
export let assets = series(html, assetscopy, images, styles, scripts)
export let serve = parallel(browserSync, watchDev)
export let dev = series(clean, assets, serve)
export let build = series(clean, assets)
