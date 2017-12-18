'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const header = require('gulp-header');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const runSequence = require('run-sequence');
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const shell = require('gulp-shell');
const concatCSS = require('gulp-concat-css');
const clean = require('gulp-clean');

const banner = [
	'/**',
	'/*!',
	'Theme Name: jindatheme2018',
	'Theme URI: http://www.jindatheme.com',
	'Author: JindaTheme',
	'Author URI: https://www.jindatheme.com',
	'Description: Premium responsive WordPress theme for jindatheme.com',
	'Version: 1.0',
	'License: GNU General Public License v2 or later',
	'License URI: http://www.gnu.org/licenses/gpl-2.0.html',
	'Tags: responsive',
	'Text Domain: jindatheme',
	'*/',
	''
].join('\n');

gulp.task('scss', () => {
	return gulp
		.src(['./scss/**/*.scss'])
		.pipe(plumber())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			autoprefixer({
				browsers: ['last 2 versions']
			})
		)
		.pipe(
			cleanCSS({
				keepSpecialComments: 0
			})
		)
		.pipe(rename('style.css'))
		.pipe(header(banner))
		.pipe(gulp.dest('./'))
		.pipe(livereload());
});

gulp.task('javascript', () => {
	return gulp
		.src([
			'./js/vendor/modernizr-2.8.3-respond-1.4.2.min.js', 
			'./node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
			'./node_modules/isotope-layout/dist/isotope.pkgd.min.js',
			'./js/main.js'
		])
		.pipe(plumber())
		.pipe(
			concat('clients.js', {
				newLine: ';'
			})
		)
		.pipe(
			uglify({
				output: {
					comments: 'some'
				}
			})
		)
		.pipe(gulp.dest('./js/'))
		.pipe(livereload());
});

gulp.task('images', () => {
	return gulp
		.src('./img/*')
		.pipe(
			imagemin({
				progressive: true
			})
		)
		.pipe(gulp.dest('./img'));
});

/**
 * Task - Library SCSS
 * Compile vendor scss file into plain CSS file
 *** If you use bootstrap-scss with npm install bootstrap-sass
 *** uncomment this line below to let gulp compile to bootstrap.min.css
 */
gulp.task('lib-scss', () => {
	return gulp.src(
		'',
		shell.task([
			'sass --scss -t compressed ./node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss ./css/bootstrap.min.css'
		])
	);
});

/**
 * Task - Library CSS
 * Add your vendor stylesheet files here
 *** eg. bootstrap(from lib-scss task) and magnificpopup
 */
gulp.task('lib-css', () => {
	return gulp
		.src([
			'./css/bootstrap.min.css'
		])
		.pipe(concatCSS('vendor.css'))
		.pipe(
			cleanCSS({
				keepSpecialComments: 0
			})
		)
		.pipe(gulp.dest('./css/'));
});

/**
 * Task - Library clean
 * remove unused file from another task.
 */
gulp.task('lib-clean', () => {
	return gulp
		.src(['./css/bootstrap.min.css', './css/bootstrap.min.css.map'], {
			read: false
		})
		.pipe(clean());
});

gulp.task('watch', () => {
	livereload.listen();
	gulp.watch(['./scss/**/*.scss'], () => runSequence('scss'));
	gulp.watch(['./js/main.js'], () => runSequence('javascript'));
});

gulp.task('default', ['scss', 'javascript', 'images', 'watch']);
gulp.task('build-lib-css', () => {
	runSequence('lib-scss', 'lib-css', 'lib-clean');
});
