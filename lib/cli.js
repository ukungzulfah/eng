#!/usr/bin/env node

"use strict";
var readline = require('readline');
var color = require('colors');
var util = require('util');
var fs = require('fs-extra');
var sys = require('sys')
var exec = require('child_process').exec;
var colors = require('colors');
var argv = require('optimist').argv;
console.log("..................... "+ "Eng Develovment".green +" ...........................");
console.log("........................... "+ "By".green +" ..................................");
console.log("........................"+ "ukungzulfah".green +"..............................");
console.log(".................................................................");


if( argv._.length ){
	
	switch(argv._[0]){
	
		case 'create-controller':
			var dir = process.cwd();
			var rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});
			rl.question("Insert controller name: ", function(controllerName){
				if( controllerName){
					console.log("Creating new controller ...");
					//get template
					fs.readFile( __dirname + '/helper/template_controller.ejs', {encoding:'utf8'}, function(err, tpl){
						//rename name_controller with controllerName
						var tplVar = tpl.split('name_controller').join(controllerName);
						//save to controll folder client
						fs.writeFile( dir + '/Application/Controll/' + controllerName + '.js', tplVar, function(err){
							if(err) throw err;
							console.log("Success create controller");
							rl.close();
						});
					});
				}else{
					rl.close();
				}
			});
			break;
	
		case 'run':
			var clientDir = process.cwd();
			var myDir = __dirname;
			
			console.log("Running project");
			exec( "node " + clientDir + "/server.js", function(error, stdout, stderr){
				console.log( stdout );
			});
			break;
		
		case 'install':
			var dir = process.cwd();
			var rl = readline.createInterface({
					input: process.stdin,
					output: process.stdout
				});
			rl.question("Insert application name: ", function(appname){
				console.log("Application name is " + appname);
				rl.question("Confirm: You are create application " + appname + "? [y/n]", function(aConf){
					if(aConf === 'y'){
						console.log("Create applicatin " + appname);
						console.log( "Wait ..." );
						setTimeout(function(){ 
							console.log( "Create new project ..." );
							createDir(appname, function(){
								setTimeout(function(){
									console.log( "Buld project & Library ..." );
									fs.copy( __dirname +'/source', dir +'/'+ appname,  function(){
										console.log(".................................................................".green);
										console.log(".................................................................".green);
										console.log(".................................................................".green);
										console.log(".........".green+ "Congratulation, Application success installing".blue +"..........".green);
										console.log(".................................................................".green);
										console.log(".................................................................".green);
										console.log(".................................................................".green);
										console.log("..................... ".green+ "Eng Develovment".white +" ...........................".green);
										console.log("........................... ".green+ "By".white +" ..................................".green);
										console.log("........................".green+ "ukungzulfah".white +"..............................".green);
										console.log(".................................................................".green);
										console.log(".................................................................".green);
										console.log(".................................................................".green);
										console.log('');
										console.log("Enter ".white +"cd ".yellow + appname.yellow);
										console.log("Enter ".white +"node server.js".yellow);
										process.exit();
									});
									
								}, 3000);
							});//create dir
						}, 1000);
						
					}else{
						console.log("Process Canceled");
						rl.close();
					}
				});
				
			});
			break;
		
		case 'uninstall':
			var appName = argv._[1];
			var dir = process.cwd();
			process.stdin.resume();
			console.log( 'Are you sure uninstall '+ appName.red +' [y/n]' );
			process.stdin.on('data', function (text) {
				var cek = text.toString().replace('\r\n', '');
				if(cek === 'y'){
					fs.remove( dir + '/' +appName, function(err){
						if (err) return console.error(err);
						console.log( 'App Uninstall' );
						process.exit();
					});
				}else{
					console.log( cek );
					console.log( 'Cancel Uninstall' );
					process.exit();
				}
			});
			break
		
	}
	
}


function createDir(path, callback){
	fs.mkdir(path,function(e){
		if(!e || (e && e.code === 'EEXIST')){
			console.log("folder exists");
		} else {
			//debug
			console.log(e);
		}
		callback();
	});
}


