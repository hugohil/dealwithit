module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            files: {
                expand: true, cwd: 'app/', src: ['**'], dest: 'dist/'
            },
            components: {
                expand: true, cwd: 'bower_components/', src: ['**'], dest: 'dist/bower_components'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    base: 'dist',
                    open: true,
                    livereload: true
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            browser: {
                files: ['app/**'],
                tasks: ['copy:files']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['copy', 'connect', 'watch']);

};