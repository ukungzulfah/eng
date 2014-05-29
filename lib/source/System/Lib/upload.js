exports.upload = {
	
	move: function(folderDestination, callback){
		var self=this;
		var form = new self.formidable.IncomingForm();
		var files=[], fields=[];
		form.encoding = 'utf-8';
		form.uploadDir = folderDestination;
		form.on('field', function(field, value) {
				fields.push([field, value]);
			}).on('file', function(field, file){
				self.fs.rename( file.path, folderDestination + file.name );
				var d = {};
				d[ field ] = file;
				files.push(d);
			}).on('end', function(){
				return callback(files);
			});
		form.parse( self.request );
	}
	
};