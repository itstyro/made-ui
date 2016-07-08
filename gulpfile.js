"use strict";

var gulp = require('gulp');
var LiveServer = require('gulp-live-server');
var connect = require('gulp-connect');
var open = require('gulp-open'); //Open a URL in a web browser
var browserify = require('browserify'); // Bundles JS
var babelify = require('babelify');
var source = require('vinyl-source-stream'); // Use conventional text streams with Gulp
var concat = require('gulp-concat');
var cors = require('cors');
var clean = require('gulp-clean');
var eslint = require('gulp-eslint');
var zip = require('gulp-vinyl-zip').zip; // zip transform only

var config = {
	port: 7777,
	devBaseUrl: 'http://localhost',
	paths: {
		js: './widgets/common/scripts/*.js',
		images: './widgets/**/src/images/*',
		jsons: ['./widgets/changetin/src/jsons/*.json'
						, './widgets/login/src/jsons/*.json'
						,'./widgets/selectplan/src/jsons/*.json',
					'./widgets/dashboard/src/jsons/*.json'],
		css: [
      		'./widgets/common/styles/foundation.min.css',
					'./widgets/common/styles/styles.css',
					'./node_modules/react-input-calendar/style/index.css'
    	],
		browserLibs: [
			//'./CustomLibs/log4javascript-1.4.13/js/log4javascript.js'
			'./widgets/common/customLibs/log4javascript.js',
				'./widgets/common/customLibs/clientLogger.js'
		],
		ttf:'./widgets/common/fonts/*',
		zipDistPath : './dist/**/*',
		ziplogsPath :	'./logs/**/*',
		zipServerPath	:'./server/**/*',
		dist: './dist',
		mainJs: './widgets/main/main.js',
		html : './widgets/index.html'
	}
}
//
// gulp.task('live-server',function(){
//     var server = new LiveServer('server/server.js');
//     server.start();
//
// 	console.log('Go to http://localhost:7777 in browser');
//
// })
//
// gulp.task('connect', function() {
// 	connect.server({
// 		root: ['dist'],
// 		middleware: function() {
// 			return [cors({origin : "http://localhost:7777"})];
// 		},
// 		port: config.port,
// 		base: config.devBaseUrl,
// 		livereload: true
// 	});
// });
//
// gulp.task('open', ['connect'], function() {
// 	gulp.src('dist/index.html')
// 		.pipe(open('', { url: config.devBaseUrl + ':' + config.port + '/'}));
// });
//
gulp.task('html', function() {
	gulp.src(config.paths.html)
		.pipe(gulp.dest(config.paths.dist))
		.pipe(connect.reload());
});

gulp.task('jsons', function() {
	gulp.src(config.paths.jsons)
		.pipe(gulp.dest(config.paths.dist + '/jsons'))
		.pipe(connect.reload());
});

gulp.task('ttf', function() {
	gulp.src(config.paths.ttf)
		.pipe(gulp.dest(config.paths.dist + '/ttf'))
		.pipe(connect.reload());
});


gulp.task('js', function() {
	browserify(config.paths.mainJs)
		.transform("babelify", {presets: ["es2015", "react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest(config.paths.dist + '/scripts'))
		.pipe(connect.reload());
});

function generateComponent(sourcePath, destPath, bundleFile) {
	browserify(sourcePath)
		.transform(babelify, {presets: ["es2015", "react"]})
		.bundle()
		.on('error', console.error.bind(console))
		.pipe(source(bundleFile))
		.pipe(gulp.dest(destPath));

};

gulp.task('css', function() {
	gulp.src(config.paths.css)
		.pipe(concat('bundle.css'))
		.pipe(gulp.dest(config.paths.dist + '/css'))
		.pipe(connect.reload());
});

gulp.task('zipDist' , function(){
	return gulp.src(config.paths.zipDistPath)
		//.pipe(zip('dist.zip'))
		.pipe(gulp.dest('./target/dist'));
});

gulp.task('ziplogs', function () {
	return gulp.src(config.paths.ziplogsPath)
	//	.pipe(zip('logs.zip'))
			.pipe(gulp.dest('./target/logs'));
});

gulp.task('zipServer',function () {
	return gulp.src(config.paths.zipServerPath)
		//.pipe(zip('server.zip'))
			.pipe(gulp.dest('./target/server'));
});

gulp.task('zipTarget' , ['zipDist' , 'ziplogs' ,'zipServer' , 'packageJSON'] , function(){
	return gulp.src('./target/**/*')
		.pipe(zip('target.zip'))
			.pipe(gulp.dest('./output'));
});


gulp.task('packageJSON',function(){
	return gulp.src('./package.json').pipe(gulp.dest('./target'));
});

gulp.task('zip' , ['zipTarget']);

gulp.task('clean-scripts', function () {
	gulp.src('dist/', {read: false})
	    .pipe(clean({force: true}));
			gulp.src('target/', {read: false})
			    .pipe(clean({force: true}));
					gulp.src('output/', {read: false})
					    .pipe(clean({force: true}));
});


gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'))
        .pipe(connect.reload());


    gulp.src('./src/favicon.ico')
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('eslint', function() {
	// Process all script files, but ignore npm_modules
	gulp.src(['widgets/**/*.js', 'server/**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('customlibs', function() {
	// Process all script files, but ignore npm_modules
	gulp.src(config.paths.browserLibs)
		.pipe(gulp.dest(config.paths.dist + '/customlibs'));
});
gulp.task('commonLibs', function() {
	// Process all script files, but ignore npm_modules
	gulp.src(config.paths.js)
		.pipe(gulp.dest(config.paths.dist + '/commonlibs'));
});

// gulp.task('watch', function() {
// 	gulp.watch(config.paths.html, ['html']);
// 	gulp.watch(config.paths.changeWritingTinRoot, ['buildComponents']);
// 	gulp.watch(config.paths.js, ['js']);
// 	gulp.watch(config.paths.jsons);
// });

gulp.task('default', ['customlibs', 'commonLibs','html', 'css', 'jsons', 'js', 'images','ttf']);

//gulp.task('default', ['eslint', 'css', 'jsons', 'js', 'images', 'watch', 'live-server']);
