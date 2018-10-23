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
            options:{
              livereload: 5200
            },
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
            options:{
              mergeIntoShorthands: false,
              roundingPrecision: -1
            },
            target: {
                files:{
                    'css/style.min.css':['css/style.css']
                }

            }
        },
        sass: {
            dist: {
                files: {
                    'css/style.css': 'sass/main.scss'
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('default', ['cssmin','concat','watch','uglify','sass']);

};
