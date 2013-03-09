module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-recess');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-less');

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
		files: {
			js: [
				'assets/raw/twitter-bootstrap/js/bootstrap-affix.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-alert.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-button.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-carousel.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-collapse.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-dropdown.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-modal.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-tooltip.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-popover.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-scrollspy.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-tab.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-transition.js',
				'assets/raw/twitter-bootstrap/js/bootstrap-typeahead.js',
				'assets/js/*.js',
			],
			less: [
				'assets/less/base.less'
			],
			html: [
				'*.html'
			]
		},
		concat: {
			js: {
				src: '<config:files.js>',
				dest: 'public/assets/app.js'
			}
		},
		min: {
			js: {
				src: '<config:files.js>',
				dest: 'public/assets/app.js'
			}
		},
		recess: {
			min: {
				src: '<config:files.less>',
				dest: 'public/assets/style.css',
				options: recessOptions(true)
			},
			max: {
				src: '<config:files.less>',
				dest: 'public/assets/style.css',
				options: recessOptions(false)
			}
		},
		shell: {
			sync: {
	            command: 'rm -rf public/; mkdir -p public/assets/font; mkdir -p public/assets/img; cp assets/raw/font-awesome/font/* public/assets/font/; cp assets/raw/twitter-bootstrap/img/* public/assets/img/; cp *.html public/; cp assets/img/* public/assets/img/; cp CNAME public/',
	            stdout: true
			},
			deploy: {
	            command: 'git stash; git push origin :gh-pages; git branch -D gh-pages; git symbolic-ref HEAD refs/heads/gh-pages; rm -rf .git/index /tmp/public /tmp/node_modules /tmp/raw; mv public /tmp; mv node_modules /tmp; mv assets/raw /tmp; git clean -fdx; mv /tmp/public/* .; git add .; git commit -m "auto-generated deployment to gh-pages"; git checkout master; mv /tmp/node_modules .; cp -R /tmp/raw assets/; git stash apply',
	            stdout: true
			}
		},
		watch: {
			less: {
				files: ['assets/less/*.less', 'assets/less/**/*.less'],
				tasks: 'shell:sync concat recess:max'
			},
			js: {
				files: '<config:files.js>',
				tasks: 'shell:sync concat recess:max'
			},
			html: {
				files: '<config:files.html>',
				tasks: 'shell:sync concat recess:max'
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
	grunt.registerTask('default', 'shell:sync concat recess:max server watch');
  	grunt.registerTask('deploy', 'shell:sync min recess:min shell:deploy');
};
