module.exports = function(grunt) {
    grunt.initConfig({
        concat: {

            dist: {
                src: ['js/**/*.js'],
                dest: 'dist/built.js'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dest/built.min.js': ['dist/built.js']
                }
            }
        },
        watch:{
            js:{
                files: ['js/**/*.js'],
                tasks: ['concat']

            },

            css:{
                files: ['**/*.scss'],
                tasks: ['sass']


            },
            uglify:
                {
                    files:['dist/built.js'],
                    tasks:['uglify']
                }

        },


        cssmin: {

            target: {
                files: {
                    'css/main.min.css': ['css/main.css']
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('default', ['concat','watch','cssmin','uglify']);

};
