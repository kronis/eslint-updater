var http = require('http');

var fetcher = {
	get: function(options, callback) {
		var req = http.request(options, function(response) {
			var data = '';
			response.on('data', function(chunk) {
				data += chunk;
			});

			response.on('end', function() {
				callback(data);
			});
		});

		req.end();
	}
};

module.exports = fetcher;
