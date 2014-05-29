exports.db = {
	
	//default config
	mysql_host: 'localhost',
	mysql_user: 'root',
	mysql_password: '',
	mysql_database: 'eng',
	connection: null,
	
	config: function(cfg){
		this.extend(this, cfg);
		return this;
	},
	
	connect: function(){
		var self=this;
		self.connection = self.mysql.createConnection({
			host: self.mysql_host,
			user: self.mysql_user,
			password: self.mysql_password,
			database: self.mysql_database
		});
		self.connection.connect();
		return self.connection;
	},
	
	query: function(txtSql, callback){
		this.connect().query(txtSql, function(err, data, field){
			return callback(data);
		});
	},
	
	close: function(){
		return this.connection.end();
	},
	
	test: function(){
		return this.mysql_database;
	}
	
};