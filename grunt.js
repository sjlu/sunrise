module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib');

	var recessOptions = function(bool) {
		bool = ((typeof bool === 'undefined')? false : bool);
		var config = {
			compile: true,
			compress: bool,
			noIDs: false,
			noJSPrefix: false,
			noOverqualifying: false,
			noUnderscores: false,
			noUniversalSelectors: false,
			prefixWhitespace: false,
			strictPropertyOrder: false,
			zeroUnits: false
		};

		return config;
	}

	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {},
		server: {
			port: 8000,
			base: 'public/'
		},
		concat: {
			js: {
				src: ['assets/js/*.js', 'assets/raw/twitter-bootstrap/js/*.js'],
				dest: 'public/assets/js/app.js'
			}
		},
		min: {
			js: {
				src: ['assets/js/*.js'],
				dest: 'public/assets/js/app.min.js'
			}
		},
		shell: {
			// rsync: {
			// 	command: 'rsync -r --exclude-from="exclude.rsync" --delete . public/; cp assets/raw/font-awesome/font/* public/assets/font/; cp assets/raw/twitter-bootstrap/img/* public/assets/img/',
			// 	stdout: true
			// },
			sync: {
	            command: 'rm -rf public/; mkdir -p public/assets/font; mkdir -p public/assets/img; cp assets/raw/font-awesome/font/* public/assets/font/; cp assets/raw/twitter-bootstrap/img/* public/assets/img/; cp index.html public/',
	            stdout: true
			},
			deploy: {
	            command: 'git push origin :gh-pages; git branch -D gh-pages; git symbolic-ref HEAD refs/heads/gh-pages; rm -rf .git/index /tmp/public /tmp/node_modules /tmp/raw; mv public /tmp; mv node_modules /tmp; cp -R assets/raw /tmp; git clean -fdx; mv /tmp/public/* .; git add .; git commit -m "auto-generated deployment to gh-pages"; git push origin gh-pages; git checkout master; mv /tmp/node_modules .; mv /tmp/raw assets/',
	            stdout: true
			}
		},
		recess: {
			max: {
				src: ['assets/less/base.less'],
				dest: 'public/assets/css/style.css',
				options: recessOptions(false)
			},
			min: {
				src: ['assets/less/base.less'],
				dest: 'public/assets/css/style.min.css',
				options: recessOptions(true)
			}
		},
		watch: {
			less: {
				files: ['assets/less/*.less', 'assets/less/**/*.less'],
				tasks: 'shell:sync concat min recess'
			},
			js: {
				files: 'assets/js/*.js',
				tasks: 'shell:sync concat min recess'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true
			}
		},
		uglify: {}
	});

	// Default task.
	grunt.registerTask('default', 'shell:sync recess concat min server watch');
  	grunt.registerTask('deploy', 'shell:sync recess concat min shell:deploy');
};
