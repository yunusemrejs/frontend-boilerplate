// styles.js

// variables & path
const baseDir = 'src' // Base directory path without «/» at the end
const distDir = 'dist' // Distribution folder for uploading to the site
let paths = {
  styles: {
    src: [
      baseDir + '/assets/sass/main.*',
      baseDir + '/assets/sass/fonts.*',
    ],
    dest: distDir + '/assets/css',
  },
  purge: {
    content: [
      `${baseDir}/**/*.{html,htm,njk}`,
      `${baseDir}/assets/scripts/**/*.js`,
      `${baseDir}/assets/sass/blocks/_pswp.scss`,
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
}

// import modules
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
import chalk from 'chalk'

// task
export function styles() {
  if (env.BUILD === 'production') {
    console.log(chalk.green('CSS build for production is running OK!'))
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
      .pipe(rename({suffix: '.min'}))
      .pipe(dest(paths.styles.dest))
  } else {
    console.log(chalk.magenta('CSS developments is running OK!'))
    return src(paths.styles.src, { sourcemaps: true })
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(rename({suffix: '.min'}))
      .pipe(dest(paths.styles.dest, { sourcemaps: '.' }))
  }
}
