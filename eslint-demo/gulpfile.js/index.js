const gulp = require("gulp");
const babel = require("gulp-babel");
const sourcemaps = require("gulp-sourcemaps");
const clean = require("gulp-clean");
const inject = require("gulp-inject");

const { series, parallel, dest } = gulp;

function cleanDist() {
	return gulp.src("dist").pipe(clean());
}

function staticSourceMove() {
	return gulp.src("public/**/*.js", { base: "." }).pipe(dest("dist"));
}

function JSTranspile() {
	return gulp
		.src("main.js")
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ["@babel/env"],
			})
		)
		.pipe(dest("dist"));
}

function htmlMove() {
	const target = gulp.src("index.html");
	const source = gulp.src(["main.js", "public/**/*/.js"]);
	return target.pipe(inject(source)).pipe(dest("dist"));
}

exports.default = series(
	cleanDist,
	parallel(JSTranspile, staticSourceMove, htmlMove)
);
