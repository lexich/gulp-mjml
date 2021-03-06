
var through = require ('through2')
  , mjmlDefaultEngine = require ('mjml')
  , gutil = require ('gulp-util');

var GulpError = gutil.PluginError,
			NAME = 'MJML';

module.exports = function mjml (mjmlEngine) {
  if(mjmlEngine === undefined) {
    mjmlEngine = mjmlDefaultEngine;
  }

	return through.obj(function (file, enc, callback) {

		if (file.isStream()) {
			this.emit('error', new PluginError(NAME, 'Streams are not supported!'));
			return callback()
		}

		if (file.isBuffer()) {
			var output = file.clone();
			output.contents = new Buffer(mjmlEngine.mjml2html(file.contents.toString()));
			output.path = gutil.replaceExtension(file.path.toString(), '.html');
			this.push(output);
		}
		return callback();
	})
};
