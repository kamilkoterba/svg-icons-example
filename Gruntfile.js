module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dist: [
				'assets/js/scripts.min.js',
				'assets/svg/compressed',
				'assets/svg/output'
			]
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed',
					sourcemap:'file'
				},
				files: {                         // Dictionary of files
					'assets/css/main.min.css': 'assets/sass/app.scss'       // 'destination': 'source'
				}
			}
		},
		grunticon: { //makes SVG icons into a CSS file
			myIcons: {
				files: [{
					expand: true,
					cwd: 'assets/svg/compressed',
					src: ['*.svg'],
					dest: 'assets/svg/output'
				}],
				options: {
					cssprefix: '.icon-',
					colors: {
						brand_dark: '#302b36',
						brand_bright_green: '#99b41e'
					}
				}
			}
		},
		rename: {
			moveThis: {
				src: 'assets/svg/output/icons.data.svg.css',
				dest: 'assets/svg/output/icons.data.svg.scss'
			}
		},
		svgmin: { //minimize SVG files
			options: {
				plugins: [
					{ removeViewBox: false },
					{ removeUselessStrokeAndFill: false }
				]
			},
			dist: {
				expand: true,
				cwd: 'assets/svg/raw',
				src: ['*.svg'],
				dest: 'assets/svg/compressed',
				ext: '.colors-brand_dark-brand_bright_green.svg'
			}
		},
		watch: {
			sass: {
				files: [
					'assets/sass/*.scss'
				],
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-grunticon');
	grunt.loadNpmTasks('grunt-rename');
	grunt.loadNpmTasks('grunt-svgmin');

	// Default task(s).
	grunt.registerTask('default', ['clean', 'svgmin', 'grunticon', 'rename', 'sass']);
	grunt.registerTask('dev', ['watch']);

};
