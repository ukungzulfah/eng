exports.Eng = {
	
	versions: 'Eng-node v.1.0',
	pathController: '../Application/Controll/',
	pathModel: '../Application/Model/',
	pathView: '../Application/View/',
	pathAsset: '../Asset/',
	tempFolder: '../Asset/Temp/',
	pathCore: '../System/Core/',
	pathLibrary: '../System/Lib/',
	ext: '.js',
	extEjs: '.html',
	root: '',
	folderRoot: '',
	host: '',
	port: '',
	controller: {},
	libs: {},
	models: {},
	pathArray: [],
	command: {},
	defaultClass: 'home',
	defaultMethod: 'index',
	request: {},
	response: {},
	operation: [ 'data', 'end', 'error' ],
	POST: {},
	GET: {},
	hostName: '',
	javascript: '',
	
	each: function(data, callback){
		for(var i in data){
			callback(i, data[i]);
		}
	},
	
	extend: function(def, cfg){
		this.each(cfg, function(key, val){
			def[ key ] = val;
		});
		return def;
	},
	
	loadModul: function(modulName){
		var self = this;
		self.each(modulName, function(i, modul){
			if(typeof modul.child === 'string'){
				self[ modul.name ] = require(modul.name);
				self[ modul.child ] = self[ modul.name ][modul.child];
			}else{
				self[ modul.name ] = require(modul.name);
			}
		});
		return this;
	},
	
	config: function(cfg){
		this.extend(this, cfg);
		return this;
	},
	
	getPath: function(path){
		var self=this;
		self.pathArray = [];
		var a = path.split('/');
		self.each(a, function(key, val){ 
			if(key && val ){
				self.pathArray.push(val);
			}
		});
	},
	
	buildCommand: function(){
		var self = this;
		self.command = {};
		self.command._class = ( typeof self.pathArray[0] === 'string' ) ? self.pathArray[0] : self.defaultClass;
		self.command._method = ( typeof self.pathArray[1] === 'string' ) ? self.pathArray[1] : self.defaultMethod;
		self.command._args = [];
		self.each(self.pathArray, function(key, val){
			if(key > 1){
				self.command._args.push(val);
			}
		});
		return self.command;
	},
	
	setRoot: function(rootName){
		if(rootName){
			this.folderRoot = rootName;
			this.root = this.join(this.dirname, rootName);
		}else{
			this.root = this.join(this.dirname);
		}
		return this;
	},
	
	controller: function(){
		var self = this;
		var path_controller = self.root + self.pathController + self.command._class;
		self.fs.exists( path_controller + self.ext, function(chk){
			if(chk){
				self.controller[ self.command._class ] = require( path_controller )[self.command._class];
				self.extend( self.controller[ self.command._class ], self );
				self.controller[ self.command._class ].owner = self.command._class;
				
				var _obj = self.controller[ self.command._class ];
				var _mtd = self.command._class + '_' + self.command._method;
								
				if(typeof _obj[_mtd] === 'function'){
					//import model and table
					if(_obj['include'] instanceof Array){
						_obj.counter=0;
						self.import_library(_obj['include'], _obj, function(){
							try{
								self.runConstruct(_obj, function(){
									return _obj[_mtd].apply(_obj, self.command._args);
								});
							}catch(e){ console.log(e); self.setContent("Error"); }
						});
					}else{
						try{
							self.runConstruct(_obj, function(){
								return _obj[_mtd].apply(_obj, self.command._args);
							});
						}catch(e){ console.log(e); self.setContent("Error"); }
					}
					
				}else{
					self.setContent("<h1>Method Not Founds</h1>");
				}
			}else{
				self.setContent("<h1>404 File Not Found</h1> " + path_controller);
			}
		});
	},
	
	runConstruct: function(obj, callback){
		if(obj['__construct'] instanceof Function){
			obj[ '__construct' ]();
		}
		return callback();
	},
	
	view: function(file, callback, dataSend){
		var self=this;
		self.fs.readFile( self.root + self.pathView + file + self.extEjs, {encoding:'utf8'}, function(err, dataRead){
			if(err) throw err;
			
			var dataDef = {};
			dataDef[ self.owner ] = {};
			self.each(self, function(key, val){
				dataDef[ self.owner ][ key ] = val;
			});
			self.extend(dataDef, dataSend);
			
			var result = self.ejs.render(dataRead.toString(), dataDef);
			return callback(result);
		});
	},
	
	model: function(modelName, callback, obj){
		var self = this;
		if( typeof self.models[ modelName ] === 'object' ){
			return callback();
		}else{
			var path_model = self.root + self.pathModel + modelName;
			self.fs.exists( path_model + self.ext, function(chk){
				if(chk){
					var OBJ = obj || {};
					self[ modelName ] = OBJ[modelName] = self.models[ modelName ] = require( path_model )[modelName];
					self.extend( self[ modelName ], self );
					return callback();
				}else{
					self.setContent("<h1>404 File Not Found</h1>");
				}
			});
		}
	},
	
	lib: function(apiName, callback, obj){
		var self = this;
		if( typeof self.libs[apiName] === 'object' ){
			console.log('udah ada');
			return callback();
		}else{
			var path_api = self.root + self.pathLibrary + apiName;
			this.fs.exists( path_api + self.ext, function(chk){
				if(chk){
					var OBJ = obj || {};
					self[apiName] = OBJ[apiName] = self.libs[apiName] = require(path_api)[apiName];
					self.extend( self[apiName], self );
					return callback();
				}else{
					self.setContent("<h1>404 Library "+apiName+" not Found</h1>");
				}
			});
		}
	},
	
	import_library: function(dataExtends, obj, callback){
		var self=this;
		if( obj.counter < dataExtends.length ){
			var dataImport = dataExtends[ obj.counter ];
			self[dataImport.type](dataImport.name, function(){
				obj.counter++;
				return self.import_library(dataExtends, obj, callback);
			}, obj);
		}else{
			return callback();
		}
	},
	
	setAllPath: function(){
		this.hostName = 'http://' + this.request.headers.host;
		this.javascript = this.hostName + this.pathView;
	},
	
	extractGP: function(){
		switch( this.request.method.toLocaleLowerCase() ){
			case 'get':
				
				break;
			case 'post':
				
				break;
		}
	},
	
	
	listen: function(port){
		var self = this;
		if(port){ self.port = port; }
		self.http.createServer(function(req, res){
			self.request = req;
			self.response = res;
			var url = self.parse(req.url);
			var	path = self.join( self.root, url.pathname );
			
			//inspect query GET
			var url_parts = url.parse(req.url, true);
			self.GET = url_parts.query;
			
			if(req.method.toLocaleLowerCase() === 'post'){
				var bufferDataPost;
				req
				.on('data', function(data){
					bufferDataPost = data;
				})
				.on('end', function(){
					self.POST = self.querystring.parse( bufferDataPost.toString() );
					self.setAllPath();
					self.getPath(url.pathname);
					self.buildCommand();
					self.controller();
				})
			}else{
				var streamOption = {};
				var stream = self.fs.createReadStream(path, streamOption);
				stream.on( self.operation[0], function(content){ res.write(content); })
					  .on( self.operation[1], function(){ res.end(); })
					  .on( self.operation[2], function(){
							self.setAllPath();
							self.getPath(url.pathname);
							self.buildCommand();
							self.controller();
					  });
			}
			////////////////////////////////////////////////////////////////ENG////////////////////////////////////////////////////
		}).listen( self.port );
		return this;
	},
	
	setContent: function(dataBuffer){
		var self = this;
		self.response.setHeader('Content-Type','text/html');
		self.response.write( dataBuffer );
		self.response.end();
	},
	
	info: function(text){
		console.log(text);
		return this;
	}
	

};