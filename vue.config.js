const Mock = require('./mock/index.js');
const path = require('path');

function resolve(dir) {
	return path.join(__dirname, dir);
}
module.exports = {
	chainWebpack: (config) => {   
		config.resolve.alias
			.set( '@',resolve(__dirname, '/'));//设置@为src目录的别名)
	},
	css: {

	},
	devServer:{
		contentBase:path.join(__dirname, 'mock'),
		compress:true,
		port: 8080,
		overlay:{
			warnings:false,
			errors:true
		},
		before(app){
			Mock(app);
		}
	}
};