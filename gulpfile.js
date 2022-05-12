"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync");
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

const dist = "./dist/";

gulp.task('styles', function() {
	return gulp.src("src/scss/**/*.+(scss|sass)")
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(rename({suffix: '.min', prefix: ''}))
			.pipe(autoprefixer())
			.pipe(cleanCSS({compatibility: 'ie8'}))
			.pipe(gulp.dest(dist + '/css'))
			.pipe(browserSync.stream());
});

gulp.task("html", () => {
    return gulp.src("./src/*.html")
								.pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest(dist))
                .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
	return gulp.src("src/fonts/**/*")
			.pipe(gulp.dest(dist + 'fonts'))
			.pipe(browserSync.stream());
});

gulp.task('images', function () {
	return gulp.src("src/img/**/*")
			.pipe(imagemin())
			.pipe(gulp.dest(dist + 'img'))
			.pipe(browserSync.stream());
});

gulp.task("build-js", () => {
	return gulp.src("./src/js/script.js")
							.pipe(webpack({
									mode: 'development',
									output: {
											filename: 'script.js'
									},
									watch: false,
									devtool: "source-map",
									module: {
											rules: [
												{
													test: /\.m?js$/,
													exclude: /(node_modules|bower_components)/,
													use: {
														loader: 'babel-loader',
														options: {
															presets: [['@babel/preset-env', {
																	debug: true,
																	corejs: 3,
																	useBuiltIns: "usage"
															}]]
														}
													}
												}
											]
										}
							}))
							.pipe(gulp.dest(dist + 'scripts'))
							.on("end", browserSync.reload);
});

gulp.task("build-prod-js", () => {
	return gulp.src("./src/js/script.js")
							.pipe(webpack({
									mode: 'production',
									output: {
											filename: 'script.js'
									},
									module: {
											rules: [
												{
													test: /\.m?js$/,
													exclude: /(node_modules|bower_components)/,
													use: {
														loader: 'babel-loader',
														options: {
															presets: [['@babel/preset-env', {
																	corejs: 3,
																	useBuiltIns: "usage"
															}]]
														}
													}
												}
											]
										}
							}))
							.pipe(gulp.dest(dist + 'scripts'))
});

gulp.task("watch", () => {
    browserSync.init({
		server: dist,
		port: 4000,
		notify: true
    });
    
		gulp.watch("./src/js/*.js", gulp.parallel("build-js"));
		gulp.watch("./src/scss/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("./src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("./src/fonts/**/*").on('all', gulp.parallel('fonts'));
    gulp.watch("./src/img/**/*").on('all', gulp.parallel('images'));
});

gulp.task("build", gulp.parallel('styles', 'fonts', 'html', 'images', 'build-js'));

gulp.task("production", gulp.parallel('styles', 'fonts', 'html', 'images', 'build-prod-js'));

gulp.task("default", gulp.parallel("watch", "build"));




