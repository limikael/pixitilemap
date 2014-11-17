var qsub = require("qsub");

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json')
	});

	grunt.registerTask("browserify", function() {
		done = this.async();

		var job = qsub("./node_modules/.bin/browserify");
		job.arg("-d", "-o", "test/demo.bundle.js", "test/demo.js");
		job.expect(0).show();

		job.run().then(done,
			function(e) {
				console.log("error");
				grunt.fail.fatal("Browserify failed");
			}
		);
	});

	grunt.registerTask("default", "browserify");
};