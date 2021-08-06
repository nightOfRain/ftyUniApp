var Mockjs = require('mockjs');
var querystring = require('querystring');
var bodyParser = require('body-parser');
var util = require('util');
const { Random }= Mockjs;
const phonePrefix = ['132', '135', '189'];
const index = Math.floor(Math.random() * phonePrefix.length);
var phone = phonePrefix[index] + Mockjs.mock(/\d{8}/);
let productList = ['按揭贷','消费贷','个人金融贷','赎楼贷', '资金过桥贷','小企业贷'];

let Content = '关于本产品的简单描述，能吸引人, 20字左右。。。';
const msgList = [{"note":"","picon":"1615969124355.jpg","descpic":"1546830196463.jpg","pinfo":"","pname":"资金类-赎楼贷","pintroduction":"","ppicture":"1615969112699.jpg","productno":2,"producttype":3},{"note":"","picon":"1615969227730.jpg","descpic":"1546830536255.jpg","pinfo":"","pname":"资金类-尾款贷","pintroduction":"","ppicture":"1593570462751.jpg|1615969204433.jpg","productno":3,"producttype":3},{"note":"","picon":"1615969305308.jpg","descpic":"1546830712972.jpg","pinfo":"","pname":"资金类-垫资过桥","pintroduction":"","ppicture":"1615969295730.jpg","productno":4,"producttype":3},{"note":"","picon":"1615970163980.jpg","descpic":"1546832284655.jpg","pinfo":"","pname":"房抵类-个人消费贷","pintroduction":"","ppicture":"1615970159027.jpg","productno":5,"producttype":3},{"note":"","picon":"1615970242574.jpg","descpic":"1546840091209.jpg","pinfo":"","pname":"房抵类-个人经营贷","pintroduction":"","ppicture":"1615970235043.jpg","productno":6,"producttype":3},{"note":"","picon":"1615970274855.jpg","descpic":"1546840134583.jpg","pinfo":"","pname":"房抵类-小企业贷","pintroduction":"","ppicture":"1615970269652.jpg","productno":7,"producttype":3},{"note":"","picon":"1615970322761.jpg","descpic":"1546840172755.jpg","pinfo":"","pname":"按揭类-商业按揭","pintroduction":"","ppicture":"1615970309589.jpg","productno":16,"producttype":3},{"note":"","picon":"1615970362386.jpg","descpic":"1546840207036.jpg","pinfo":"","pname":"按揭类-公积金按揭","pintroduction":"","ppicture":"1615970351980.jpg","productno":21,"producttype":3},{"note":"","picon":"1615970421777.jpg","descpic":"1546840248145.jpg","pinfo":"","pname":"按揭类-组合按揭","pintroduction":"","ppicture":"1615970415793.jpg","productno":22,"producttype":3},{"note":"","picon":"1615970510886.jpg","descpic":"1546840311973.jpg","pinfo":"","pname":"信用贷","pintroduction":"","ppicture":"1615970500839.jpg","productno":25,"producttype":3},{"note":"","picon":"1546938604594.jpg","descpic":"1546938607672.jpg","pinfo":"","pname":"越秀星悦湾畔","pintroduction":"","ppicture":"1546938601531.jpg","productno":26,"producttype":1},{"note":"","picon":"1546941521158.jpg","descpic":"1546941618753.jpg","pinfo":"","pname":"当代万国城","pintroduction":"","ppicture":"1546941517893.jpg","productno":27,"producttype":2},{"note":"","picon":"1615970874238.jpg","descpic":"1615970904242.jpg","pinfo":"","pname":"信用类-车抵贷","pintroduction":"","ppicture":"1615970870082.jpg","productno":28,"producttype":1}];
const loanTypeTree = [{"label":"按揭类","id":"1","porgnId":"","children":[{"label":"公积金","id":"8001","porgnId":"1","children":null},{"label":"商业贷款","id":"8002","porgnId":"1","children":null},{"label":"组合贷","id":"8003","porgnId":"1","children":null},{"label":"商用房贷款","id":"8029","porgnId":"1","children":null}]},{"label":"商转公","id":"8","porgnId":"","children":[{"label":"二手商转公","id":"8014","porgnId":"8","children":null},{"label":"一手商转公","id":"8031","porgnId":"8","children":null},{"label":"一手公积金","id":"8043","porgnId":"8","children":null},{"label":"保函公积金","id":"8044","porgnId":"8","children":null}]},{"label":"房抵类","id":"2","porgnId":"","children":[{"label":"消费贷","id":"8004","porgnId":"2","children":null},{"label":"个人经营贷","id":"8018","porgnId":"2","children":null},{"label":"小企业贷","id":"8022","porgnId":"2","children":null}]},{"label":"无抵押信用类","id":"3","porgnId":"","children":[{"label":"车供贷","id":"8006","porgnId":"3","children":null},{"label":"房供贷","id":"8007","porgnId":"3","children":null},{"label":"保单贷","id":"8008","porgnId":"3","children":null},{"label":"装修贷","id":"8013","porgnId":"3","children":null},{"label":"积金贷","id":"8011","porgnId":"3","children":null},{"label":"全款房","id":"8019","porgnId":"3","children":null},{"label":"居易贷","id":"8030","porgnId":"3","children":null},{"label":"税金贷","id":"8036","porgnId":"3","children":null}]},{"label":"交易资金类","id":"9","porgnId":"","children":[{"label":"尾款-打包","id":"8010","porgnId":"9","children":null},{"label":"尾款-按天","id":"8035","porgnId":"9","children":null},{"label":"尾款-按月","id":"8017","porgnId":"9","children":null},{"label":"赎楼-打包","id":"8009","porgnId":"9","children":null},{"label":"赎楼-按天","id":"8026","porgnId":"9","children":null},{"label":"赎楼-按月","id":"8016","porgnId":"9","children":null},{"label":"赎楼全款-打包","id":"8024","porgnId":"9","children":null},{"label":"赎楼全款-按天","id":"8025","porgnId":"9","children":null},{"label":"赎楼全款-按月","id":"8034","porgnId":"9","children":null},{"label":"赎楼送尾款","id":"8027","porgnId":"9","children":null},{"label":"保证赎楼","id":"8039","porgnId":"9","children":null},{"label":"保证+现金赎","id":"8040","porgnId":"9","children":null}]},{"label":"非交易资金类","id":"4","porgnId":"","children":[{"label":"垫资500万内","id":"8015","porgnId":"4","children":null},{"label":"垫资500万以上","id":"8028","porgnId":"4","children":null},{"label":"提放保有赎楼","id":"8041","porgnId":"4","children":null},{"label":"提放保无赎楼","id":"8042","porgnId":"4","children":null}]},{"label":"车抵贷","id":"5","porgnId":"","children":[{"label":"车抵贷","id":"8023","porgnId":"5","children":null}]},{"label":"二押","id":"6","porgnId":"","children":[{"label":"二押","id":"8020","porgnId":"6","children":null},{"label":"工行二押","id":"8038","porgnId":"6","children":null}]},{"label":"交易保","id":"7","porgnId":"","children":[{"label":"交易保有赎楼","id":"8032","porgnId":"7","children":null},{"label":"交易保无赎楼","id":"8033","porgnId":"7","children":null}]}];

// const express = require("express");
// const app = express.Router();
const apiMock = function (app) {
	app.use(bodyParser.urlencoded({extended:false}));
	app.use(bodyParser.json());
	app.get('/fyt/test', function(req, res) {
		var data = Mockjs.mock({
			// 属性 list 的值是一个数组，其中元素的数量从 1 到 10 个都有可能，随机
			'list|1-10': [{
				'id|+1': 0,
				'accept_name': Random.cname(),
				'mobile': phone,
				'province_name': Random.province(),
				'area': Mockjs.mock(/\d{6}/),
				'city': Mockjs.mock(/\d{6}/),
				'sex': parseInt(Random.boolean()),
				'district': {
					'districts': Random.province()+Random.city()+Random.county(),
					'area': Random.county(),
					'city': Random.city(),
					'province': Random.province()
				},
				'street': '有一间公寓八栋',
				'inner': false,
				'lat': '',
				'door_number': 'AB1234',
				'is_default': parseInt(Random.boolean()),
				'province': Mockjs.mock(/\d{6}/),
				'area_name':Random.county(),
				'city_name': Random.city(),
				'poiname': ''
			}]
		});
		res.json(data);
	});

   
	/**
    * 功能 ：根据用户权限获取消息列表
    * input: {userId, type}
    * 输入请求：账号，消息类型 0-问题 1-事项
    */
	app.post('/fyt/getProductListHot', function(req, res){
		console.log('===========req:========='+util.inspect(req.body));
	//	var {type} = req.body; 

		let list = [];
		for (let i = 0; i < productList.length; i++){
			let item = {
				'id|+1': 0, //问题或事件编号
				'title':productList[i], //问题或事件标题
				"Content":Content, //问题或事件详细描述
				'startDate':Random.date() + ' ' + Random.time() , //发起时间
			};
			list.push(item);
		}
		let tmpList = [];
		for (let i = 0; i < msgList.length; i++){
			let item = {
				'id|+1': 0, //问题或事件编号
				'type':2,
				'name':Random.cname(),
				'amt':Random.natural(10, 50),
				'limit':Random.natural(5, 30),
				'title':msgList[i].pname, //问题或事件标题
				"content":Random.cword(10, 25), //问题或事件详细描述
				'time':Random.date() + ' ' + Random.time() , //发起时间
				'haveTime':Random.date() + ' ' + Random.time() , //发起时间
				'read':Random.natural(0, 100),
				'like':Random.natural(0, 100),
				'use':Random.natural(0, 100),
				'imgUrl':"http://www.sjyjr.net/static/productinfoImage/" +msgList[i].picon
			};
			tmpList.push(item);
		}
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'productList':list,
			'msgList':tmpList
			
		});
		res.json(data);
	});
	
	var tagList = ['现房','期房','二手房','满五年'];
	/**
	* 功能 ：根据用户权限获取房源列表
	* input: {userId}
	* 输入请求：账号
	*/
	app.post('/fyt/getHouseList', function(req, res){
		console.log('===========req:========='+util.inspect(req.body));

		let tmpList = [];
		for (let i = 0; i < 7; i++){
			let item = {
				'id|+1': 0, //问题或事件编
				'amt':Random.natural(10, 50),
				'tag': tagList[Random.natural(0, 3)],
				'price': Random.natural(10000, 50000),
				'title':msgList[i].pname, //问题或事件标题
				"content":Random.cword(10, 25), //问题或事件详细描述
				'time':Random.date() + ' ' + Random.time() , //发起时间
				'imgUrl':"https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/news" +i+".jpeg"
			};
			tmpList.push(item);
		}
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'msgList':tmpList
			
		});
		res.json(data);
	});
	/**
	* 功能 ：用户登录
	* input：{userId,passwd}
	* 输入请求：账号，密码
	*/
	app.post('/fyt/login', function(req, res){
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'data':{
				'orgn':Mockjs.mock(/\d{6}/), //机构	
				'orgnName':Random.cname()+'部门',//机构名称
				'role':'A', //角色
				'name':Random.cname(), //姓名
			}
		});
		res.json(data);
	});
	/**
	* 功能 ：微信账号绑定
	* input：{userId,openId,nickName,avatarUrl}
	* 输入请求：账号，微信号，微信名称，微信头像路径
	*/
	app.post('/fyt/accountBind', function(req, res){
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'data':{
				'orgn':Mockjs.mock(/\d{6}/), //机构	
				'orgnName':Random.cname()+'部门',//机构名称
				'role':'A', //角色
				'name':Random.cname(), //姓名
			}
		});
		res.json(data);
	});
	
	/**
	 * 功能 ：根据用户权限获取所有消息列表，分为3个循环节点返回，allList-所有的 undoList-处理中的 doneList-完成的
	 * input: {userId, type, page}
	 * 输入请求：账号，消息类型 0-问题 1-事项, 分页页码
	 */
	app.post('/fyt/getMessages', function(req, res){
		var {type} = req.body;
		
		var list = [];
		for (let i = 0; i < msgList.length; i++){
			let tmpIndex = Random.natural(0, 13)
			let item = {
				'id|+1': 0, //问题或事件编号
				'title':msgList[i].pname, //问题或事件标题
				"content":Random.cword(10, 25), //问题或事件详细描述
				'time':Random.date() + ' ' + Random.time() , //发起时间
				'read':Random.natural(0, 100),
				'like':Random.natural(0, 100),
				'use':Random.natural(0, 100),
				'imgUrl':"http://www.sjyjr.net/static/productinfoImage/" +msgList[i].picon
			};
			list.push(item);
		}

		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'list':list, //所有的
		});
		res.json(data);
	});
	
	/**
	* 功能 ：获取产品列表
	* input：{}
	* 输入请求：
	*/
	app.post('/fyt/getAllProduct', function(req, res){
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'data':loanTypeTree
		});
		res.json(data);
	});
	/**
	 * 功能 ：根据用type获取绩效排名
	 * input: {type}
	 * 输入请求：消息类型 
	 */
	var postList = ['驻行专员','销售员','产品经理','销售总监'];
	
	app.post('/fyt/getSalary', function(req, res){
		var {type} = req.body;
		
		var list = [];
		for (let i = 9; i >= 0; i--){
			let item = {
				'id|+1': 0, //问题或事件编号
				'name':Random.cname(), //问题或事件标题
				"post":postList[Random.natural(0, 3)], //问题或事件详细描述
				'orgn':Random.cword(2, 4)+"团队", //发起时间
				'salary':i*10+Random.natural(0, 9),
				'headimgurl':'http://cdn.zhoukaiwen.com/head'+(i+1)+'.jpg'
			};
			list.push(item);
		}
	
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'list':list, //所有的
		});
		res.json(data);
	});
	/**
	 * 功能 ：获取销售业绩数据
	 * input: {}
	 * 输入请求：
	 */
	var colorList = ['#39b54a','#1cbbb4','#0081ff','#6739b6','#9c26b0','#e03997','#a5673f','#8799a3','#fbbd08','#8dc63f','#f37b1d','#1cbbb4'];
	
	app.post('/fyt/getAchievement', function(req, res){
		
		
		var yearList = [];
		var oldYearList = [];
		var targetList = [];
		for (let i = 0; i < 12; i++){
			let item = {
				"value": Random.natural(0, 99),
				"color": colorList[i]
			};
			oldYearList[i] = Random.natural(25, 80);
			targetList[i] = Random.natural(35, 100);
			yearList.push(item);
		}
	
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'yearList':yearList, //今年绩效
			'oldYearList':oldYearList, //去年绩效
			'targetList':targetList, //今年目标
		});
		res.json(data);
	});
	/**获取团队统计数据
	 * getTeamSales
	 * @param {Object} req
	 * @param {Object} res
	 */
	app.post('/fyt/getTeamSales', function(req, res){
		var pieData = [];
		var teamData = [];
		var pieNum = Random.natural(0, 8);
		
		for(var i = 0; i < 6; i++){
			let tmpItem = {
				teamName:Random.cname()+'团队',
				num:Random.natural(0, 999),
				loading:Random.natural(0, 100)+'%',
			}
			teamData.push(tmpItem);
		}
		for(var i = 0; i < pieNum; i++){
			let tmpItem = {
				name:productList[i],
				data:Random.natural(0, 99)
			}
			pieData.push(tmpItem);
		}
		
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'pieData':pieData, 
			'teamData':teamData,
		});
		res.json(data);
	});	
	/**根据团队ID获取门店开单信息
	 * getTeamMdSales
	 * @param {Object} orgnId
	 * @param {Object} res
	 */
	app.post('/fyt/getTeamMdSales', function(req, res){
		var mdData = [];
		var mdNum = Random.natural(8, 20);
		
		for(var i = 0; i < mdNum; i++){
			let tmpItem = {
				name:Random.cname()+'门店',
				ajdl:Random.natural(0, 99),
				cpdl:Random.natural(0, 99),
			}
			mdData.push(tmpItem);
		}
		
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'mdData':mdData, 
		});
		res.json(data);
	});	
	
	/**获取客户统计数据
	 * getCustomerAnalysis
	 * @param {Object} req
	 * @param {Object} res
	 */
	app.post('/fyt/getCustomerAnalysis', function(req, res){
		var channelData = [];
		var teamData = [];
		var funnelData = [];
		var cpData = [];
		
		var channelName = ['线上渠道','直客','机构门店'];
		var funnelName = ['资讯','见面','下定金','面签','完结'];
		for(var i = 0; i < 6; i++){
			let tmpItem = {
				name:Random.cname()+'团队',
				data:Random.natural(0, 999)
			}
			teamData.push(tmpItem);
		}
		
		for(var i = 0; i < 3; i++){
			let tmpItem = {
				name:channelName[i],
				num:Random.natural(0, 999),
				tb:Random.natural(0, 999),
				hb:Random.natural(0, 999),
			}
			channelData.push(tmpItem);
		}
		for(var i = 0; i < 5; i++){
			let tmpItem = {
				name:funnelName[i]+'▪️'+(100-i*20),
				data:Random.natural(100-(i+1)*20, 100-i*20)
			}
			if(i == 0){
				tmpItem.data = 100;
			}
			funnelData.push(tmpItem);
		}
		for(var i = 0; i < 6; i++){
			let tmpItem = {
				name:productList[i],
				data:Random.natural(0, 99)
			}
			cpData.push(tmpItem);
		}
		var data = Mockjs.mock({
			'code':200,
			'msg':'success',
			'channelData':channelData, 
			'funnelData':funnelData, 
			'teamData':teamData,
			'cpData':cpData,
		});
		res.json(data);
	});	
};
  

  
module.exports = apiMock;
