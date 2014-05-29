eng
===

Eng Engine is a framework that uses the concept of MVC node.js


## Installation

**With [node](http://nodejs.org):**
```sh
# Get the latest stable release of Eng
$ sudo npm install eng -g // require -g
```

## Your First Eng Project

**Create a new Project:**
```sh
# Create the app
$ eng install // and follow instruction
```

**Next Run Project:**
```sh
# cd into the new folder
$ cd tester

# fire up the server
$ eng run // or node server.js
```


**Removing Project:**
```sh
$ eng uninstall project_name
```

## MVC Controller

	**Application/Controll/home.js:**
	```sh
		export.home = {
			
			home_index: function(){
				this.setContent("Hello World");
			}
			
		};
		
		// run: http://localhost:8080/home/ or http://localhost:8080/
	```



	**Create Controller Project:**
	```sh
	$ eng create_controller // and follor instruction example: test
	```
	
	Eng will generate code:
	```sh
		export.test = {
			
			home_index: function(){
				this.setContent("Hello World");
			}
			
		};
		
		// run: http://localhost:8080/test/
	```
	

	**Create any method:**
	```sh
		export.test = {
			
			home_index: function(){
				this.setContent("Hello World");
			}
			
			home_second: function(){
				this.setContent("Hello World second");
			}
			
		};
		
		// run: http://localhost:8080/test/second/
	```

	
	**Create __construct:**
	```sh
		export.test = {
			
			name: '',
			
			__construct: function(){
				this.name = 'ukungzulfah';
			},
			
			home_index: function(){
				this.setContent("Hello " + this.name);
			}
			
		};
		
		// run: http://localhost:8080/test/
	```

	
	**Create autoload Model & Library:**
	```sh
		export.test = {
			
			name: '',
			mylib: '',
			
			include: [
				{
					type: 'lib', // library autoload
					name: 'libs'
				},
				{
					type: 'model', // Model autoload
					name: 'user'
				}
			],
			
			__construct: function(){
				this.name = this.user.getUserName();
				this.mylib = this.libs.getLibName();
			},
			
			home_index: function(){
				this.setContent( this.name +" "+ this.mylib );
			}
			
		};
		
		
		// Create Model in Application/Model/user.js
		export.user = {
			getUserName: function(){ return 'ukungzulfah'; }
		};
		
		
		// Create Library in System/Lib/libs.js
		export.libs = {
			getLibName: function(){ return 'ukungzulfah'; }
		};
		
		// run: http://localhost:8080/test/
	```


	
## MVC Model
	
	Create function for transaction with database [ mysql / mongodb / etc ] with modul from node.js
	and create function here
	

	**Create Example Model:**
	Application/Model/user.js
	```sh
		export.user = {
			getUserName: function(){ return 'ukungzulfah'; }
		};
	```
	**Example Call Model from Controller:**
	```sh
		export.test = {
			
			home_index: function(){
				var self=this;
				self.model('user', function(){
					self.setContent( self.user.getUserName() );
				});
			}
			
		};
	```


## MVC View
	
	Create view in format html in folder Application/View/ <view name> .html
	and you can include ejs here

	**Create View Example:**
	Application/View/index.html
	```sh
		<html>
		
			<head>
				<title> <%= title %> </title>
			</head>
			
			<body>
				<h1> <%= body %> </h1>
			</body>
			
		</html>
	```
	**Example Call View from Controller and send data to View:**
	```sh
		export.test = {
			
			home_index: function(){
				var self=this;
				var data = {
					title: "Eng MVC Node.js",
					body: "Hello World"
				};
				
				self.view('index', function(content){
					self.setContent( content );
				}, data);
			}
			
		};
	```


### [Group on G+](https://plus.google.com/u/0/communities/109310640158616232259) &nbsp; [Follow Twitter](https://twitter.com/ukungzulfah)

Thanks to Nodejs

Ukungzulfah


