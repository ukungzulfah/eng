exports.curl = {
	
	req: function(options, callback){
		var self=this;
		var default_options = {
			host: 'localhost',
			port: 80,
			path: '/',
			method: 'GET'
		};
		self.extend(default_options, options);
		var buffer;
		var req = self.http.request(default_options, function(res) {
			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				buffer += chunk;
			});
			res.on('end', function () {
				return callback(buffer);
			});
		});
		req.end();
	}
	
};