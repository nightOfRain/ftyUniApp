var Mockjs = require('mockjs');
const { Random }= Mockjs;
const phonePrefix = ['132', '135', '189'];
const index = Math.floor(Math.random() * phonePrefix.length);
var phone = phonePrefix[index] + Mockjs.mock(/\d{8}/);

const loginMock = function (app) {
	/**
	* 功能 ：用户登录
	* input：{userId,passwd}
	* 输入请求：账号，密码
	*/
	app.get('/api3/login', function(req, res){
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'data':{
				'orgn':Mockjs.mock(/\d{6}/), //机构	
				'role':'A', //角色
				'name':Random.cname() //姓名
			}
		});
		res.json(data);
	});
};
  
module.exports = loginMock;
