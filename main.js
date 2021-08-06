import Vue from 'vue'
import App from './App'
import store from './store';
import utils from './utils';
Vue.prototype.$store = store;
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom)

Vue.prototype.imgPath = "https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/static/";
// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);
const baseUrl = 'https://www.wuhannantian.cn:8087/'
//const baseUrl = 'http://127.0.0.1:8899/'
Vue.config.productionTip = false;
Vue.prototype.updateWx = function(){

	var userInfo = uni.getStorageSync('userInfo');
	if(utils.isEmpty(userInfo) || userInfo.loginStat){
		console.log("==========没登录啊=============");
		return;
	}
	//同步微信数据
	var userInfo_wx = uni.getStorageSync("userInfo_wx");
	userInfo_wx = JSON.parse(userInfo_wx);
	console.log("userInfo_wx:"+JSON.stringify(userInfo_wx));
	userInfo.nickName = userInfo_wx.nickName;
	userInfo.avatar = userInfo_wx.avatarUrl;
	userInfo.hasUserInfo = true;

	uni.setStorage({
		key: 'userInfo',
		data: userInfo,
		success: function () {
		}
	});
	store.commit('userinfo/updateUserinfo', userInfo);
}
Vue.prototype.commRequest = function(trancode, data, succ){
	let token = '';
	if(trancode != '/login'){
		token = uni.getStorageSync('accessToken');
	}
	console.log('baseURL:'+baseUrl+trancode+' send:'+JSON.stringify(data));
	console.log('token:'+token);
	uni.showLoading({
		title:'加载中'
	});
	uni.request({
	   // url: baseUrl + trancode, //仅为示例，并非真实接口地址。
		url:trancode,
		data:data,
	    method:'POST',
	    dataType:'application/json',
	    header: {
	    	//'Content-Type': 'application/x-www-form-urlencoded',
			"X-Token": token,
			"X-Requested-With": "XMLHttpRequest"

	    },
	    success: (res) => {
	        console.log('---------'+trancode+' recv:'+res.data);
			uni.hideLoading();
			//如果是登录交易，更新TOKEN
			if(trancode == '/login'){
				uni.setStorageSync('accessToken', res.token);
			}
			res = res.data;
			res = JSON.parse(res);
			
			console.log('---------'+trancode+' res.data.code:'+res.code);
			
			console.log('---------'+trancode+' res.data.msg:'+res.msg);
			
			if(res.code == '200'){
				succ(res);
			}else if(res.code == '500'){	
				var userInfo = uni.getStorageSync('userInfo');
				userInfo.loginStat = false;
				
				uni.setStorage({
					key: 'userInfo',
					data: userInfo,
					success: function () {
						console.log('userInfo success');
					}
				});
				store.commit('userinfo/updateLoginStat', false);
				//uni.$emit('update', {});
				uni.showModal({
					title: '交易失败：'+res.msg,
					success: (res) => {
						var page = getCurrentPages();
						console.log('res:'+JSON.stringify(page.route));
						//uni.getCurrentPages();
						if(res.confirm){
							uni.navigateTo({
								url:'/pages/login/index'
							});
						}
					}
				});
			}else{
				console.log(trancode + '===========res:'+JSON.stringify(res));
				uni.showModal({
					title: '交易失败：'+res.msg,
					duration: 2000
				});
			}

	    },
	    complete: (res) => {
	    	uni.hideLoading();
	    }
	});
};

Vue.prototype.commRequestGet = function(trancode, data, succ){
		let token = '';
		if(trancode != '/login'){
			token = uni.getStorageSync('accessToken');
		}
		
		let baseUrl = 'http://www.sjyjr.net/sjyjf/app/';
		console.log('baseURL:'+baseUrl+trancode+' send:'+JSON.stringify(data));
		console.log('token:'+token);
		uni.showLoading({
			title:'加载中'
		});
		uni.request({
		    url: baseUrl + trancode, //仅为示例，并非真实接口地址。
			//url:trancode,
			data:data,
		    method:'GET',
		    dataType:'application/json',
		    header: {
		    	'X-Requested-With': 'XMLHttpRequest',
		    },
			success: (res) => {
				console.log("==="+trancode+":"+JSON.stringify(res));
			},
			complete: (res) => {
				uni.hideLoading();
			}
		});
			
};
Vue.prototype.commRequestPost = function(trancode, data, succ){
		let token = '';
		
		token = uni.getStorageSync('accessToken');
		let baseUrl = 'http://www.sjyjr.net/sjyjf/app/';
		console.log('baseURL:'+baseUrl+trancode+' send:'+JSON.stringify(data));
		console.log('token:'+token);
		uni.showLoading({
			title:'加载中'
		});
		uni.request({
		    url: baseUrl + trancode, //仅为示例，并非真实接口地址。
			//url:trancode,
			data:data,
		    method:'POST',
		    dataType:'application/json',
		    header: {
		    	"Content-Type": "application/x-www-form-urlencoded",
		    },
			success: (res) => {
				console.log("==="+trancode+":"+JSON.stringify(res));
				res = res.data;
				succ(res);
				
			},
			complete: (res) => {
				uni.hideLoading();
			}
		});
			
};
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
