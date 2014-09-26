module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'expanded',
					sourcemap:'file'
				},
				files: {                         // Dictionary of files
					'assets/css/main.min.css': 'assets/sass/app.scss'       // 'destination': 'source'
				}
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

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['sass']);
	grunt.registerTask('dev', ['watch']);

};
