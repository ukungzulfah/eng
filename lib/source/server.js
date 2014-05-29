var Eng = 	
require('./System/eng').Eng.loadModul([
	{
		name: 'http'
	},
	{
		name: 'url',
		child: 'parse'
	},
	{
		name: 'path',
		child: 'join'
	},
	{
		name: 'fs'
	},
	{
		name: 'ejs'
	},
	{
		name: 'mysql'
	},
	{
		name: 'formidable'
	},
	{
		name: 'util'
	},
	{
		name: 'mv'
	},
	{
		name: 'querystring'
	}
])
.config({
	dirname: __dirname
})
.setRoot('').listen(8080).info("Server running in port 8080 ...");