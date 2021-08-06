<template>
	<view>
		<cu-custom bgColor="bg-clean" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">登录</block>
		</cu-custom>

		<view class="bg-img  flex align-center" style="background-image: url('https://7869-xiyutool-5op3h-1300784412.tcb.qcloud.la/icon/title.png');height:340px;margin-top:-84px;" >
		 	
		</view>
		<form @submit="startLogin">
			<view class="margin-sm  padding-xl radius bg-white" style="margin-top:-33vw">
				<view class="title text-bold text-black margin-top" style="padding: 1upx 30upx;">账号</view>
				<view class="cu-form-group   solid-bottom">
					<input placeholder="请输入用户号" name="userId" :value="userId" style="text-align: left;"></input>
				</view>
				<view class="title text-bold text-black margin-top" style="padding: 1upx 30upx;">密码</view>
				<view class="cu-form-group   solid-bottom">
					<input placeholder="请输入密码" name="password" :value="password" password="true" style="text-align: left;"></input>
				</view>
				
			</view>
			
			<view class="padding-xl">
				<button class="cu-btn block bg-blue margin-tb-sm lg" form-type="submit">
					<text class=" cuIconfont-spin" :class="isShow?'cuIcon-loading2':''"></text>
				登录</button>

			</view>
		</form>
	</view>
</template>

<script>
	import utils from '../../utils.js'
	import Vue from 'vue'
	import { mapState, mapGetters } from 'vuex'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				userId:'15549448486',
				password:'hy940602',
				bodyTop:0,
				isShow:false
			};
		},
		mounted() {
			var _this = this;
			this.bodyTop = 0 - Vue.prototype.bodyTop;
			//_this.loginStat = userInfo.loginStat;
			//加载
			
		},
		methods: {
			startLogin(e){
                console.log(e)
				var _this = this;
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (this.userId.length == "") {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '用户名不能为空'
				    });
				    return;
				}
		        if (this.password.length < 5) {
		            uni.showToast({
		                icon: 'none',
						position: 'bottom',
		                title: '密码不正确'
		            });
		            return;
		        }
				
				console.log("登录成功")
				
				_this.isRotate=true
				setTimeout(function(){
					_this.isRotate=false;
					
					if(_this.isLogin){
						uni.$emit('update', {})
						uni.navigateBack({
							
						});
					}
					
				},2000)
				
			
			
				// var data = {
				// 	userId: _this.phoneData,
				// 	password:utils.hex_md5(_this.passData),
				// 	userType:'1'
				// }
				var data = {
					userId: '15549448486',
					password:utils.hex_md5('hy940602'),
					userType:'1'
				}
				_this.commRequestPost('6001', data, function(res){
					
					//console.log("success in home:"+res);
					
					console.log("success in home:"+res);
					res = JSON.parse(res);
					if(res.responseCode == 'AAAA'){
						
						_this.accessToken = res.responseData.accessToken;
						var userInfo = {};
						userInfo.userId = _this.phoneData;
						userInfo.passWd = _this.passData;
						userInfo.loginStat = true;
						userInfo.accessToken = res.responseData.accessToken;
						userInfo.sysUserDetailRelate = res.responseData.sysUserDetailRelate
						
						uni.setStorage({
							key: 'userInfo',
							data: userInfo,
							success: function () {
								console.log('userInfo success');
							}
						});
						uni.setStorage({
							key: 'loanTypeTree',
							data: res.responseData.loanTypeTree,
							success: function () {
								console.log('success');
							}
						});
						uni.setStorage({
							key: 'sysUserDetailRelate',
							data: res.responseData.sysUserDetailRelate,
							success: function () {
								console.log('success');
							}
						});
						uni.setStorage({
							key: 'accessToken',
							data: res.responseData.accessToken,
							success: function () {
								console.log('success');
							}
						});
						uni.setStorage({
							key: 'appMenuList',
							data: res.responseData.appMenuList,
							success: function () {
								console.log('success');
							}
						});
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '登录成功',
							duration:2000
						});
						_this.isLogin = true;
						uni.navigateBack({
							delta: -1
						})
					}else{
						uni.showToast({
							icon: 'none',
							position: 'bottom',
							title: '登录失败：'+res.responseCode,
							duration:2000
						});
						_this.isLogin = false;
						console.log("responseCode: "+res.responseCode);
					}
				});
					
		    },
			loginApp:function(e){
				var _this = this;
				_this.isShow = true; //加载效果
				var formdata = e.detail.value;
				formdata.remember = true;
				var data = {
					userId : _this.userId,
					password : _this.passWd,
					remember : true,
				}
			
				_this.commRequest('6001', formdata, function(res){
					
					_this.isShow = false;//关闭加载效果
					var userInfo = res.data;
		
					userInfo.loginStat = true;
					uni.setStorage({
						key: 'userInfo',
						data: userInfo,
						success: function () {
						}
					});
					
					store.commit('userinfo/updateUserinfo', userInfo);
					uni.setStorage({
						key: 'accessToken',
						data: res.data.token,
						success: function () {
						}
					});
					
					// //同步微信数据
		
					//#ifdef MP-WEIXIN
					_this.updateWx();
					//#endif
					
					//发送更新消息给相关页面
					uni.$emit('update', {});
					//退回上一页面
					uni.navigateBack({
						delta:1
					})
					
					
				});
			},
			updated:function(e){
				var userInfo = uni.getStorageSync("userInfo");
				var _this = this;
				_this.loginStat = userInfo.loginStat;
			},
		}
	}
</script>

<style>
	input{
		text-align: left;
	}
</style>
