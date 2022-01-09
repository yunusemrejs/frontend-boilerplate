// css.mjs

// VARIABLES & PATHS
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  styles: {
    src: baseDir + '/assets/scss/main.*',
    dest: distDir + '/assets/css',
  },

  purge: {
    content: [
      `${baseDir}/**/*.html`,
      `${baseDir}/assets/scripts/**/*.js`,
      `${baseDir}/assets/scss/blocks/_pswp.scss`,
      'node_modules/bootstrap/scss/_reboot.scss',
      'node_modules/bootstrap/js/dist/dom/*.js',
      'node_modules/bootstrap/js/dist/{base-component,button,dropdown,collapse}.js',
    ],
    safelist: {
      // standart: ["selectorname"],
      deep: [/scrolltotop$/],
      greedy: [/on$/, /down$/, /is-hidden$/],
    },
    keyframes: true,
  },

  cssOutputName: 'main.min.css',
}

// LOGIC
import { env } from 'process'
import gulp from 'gulp'
const { src, dest } = gulp
import sassDark from 'sass'
import sassGulp from 'gulp-sass'
const sass = sassGulp(sassDark)
import purgecss from 'gulp-purgecss'
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import rename from 'gulp-rename'

export function styles() {
  if (env.BUILD === 'production') {
    return src(paths.styles.src)
      .pipe(sass.sync())
      .pipe(purgecss(paths.purge))
      .pipe(
        postCss([
          autoprefixer(),
          cssnano({
            preset: ['default', { discardComments: { removeAll: true } }],
          }),
        ])
      )
      .pipe(rename(paths.cssOutputName))
      .pipe(dest(paths.styles.dest))
  } else {
    return src(paths.styles.src, { sourcemaps: true })
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(rename(paths.cssOutputName))
      .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
  }
}
