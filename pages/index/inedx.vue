<!-- 首页 -->
<template>
	<view class="bg-gray" :style="'height: '+systemInfo.screenHeight+'px;'">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">首页</block>
		</cu-custom>
		
		<add-tip :tip="tip" :duration="duration"/>

		<!-- banner图 -->
		<view class="uni-padding-wrap">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" circular="true" indicator-dots="true" autoplay="true" interval="3500" duration="600">
						<swiper-item class="swiper-list" v-for="(item, index) in bannerList" :key="index">
							<view class="swiper-item uni-bg-red">
								<image class="swiper-img" :src="item.imageUrl" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		<!-- 导航栏 -->
		<view class="cu-list grid solids-bottom col-4 no-border">
			<view class="cu-item" hover-class="hover-class" v-for="(item,index) in categories" :key="index" :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]"
			 @click="goCategorieslist" :data-mid="item.mid">
				<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
					<view class="cu-tag badge" v-if="item.count!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">热销产品</text>
				<text class="text-ABC text-blue">ProductList</text>
			</view>
			<view class="action">
				<text class="text-lg text-grey text-shadow">更多</text>
			</view>
		</view>

		<view class="skill-sequence-panel-content-wrapper">
			<!--左边虚化-->
			<view class="hide-content-box hide-content-box-left"></view>
			<!--右边虚化-->
			<view class="hide-content-box hide-content-box-right"></view>
			<scroll-view scroll-x="true" class="kite-classify-scroll">
				<view class="kite-classify-cell shadow" v-for="(item, index) in curriculum" :key="index">
					<view :class="'nav-li bg-index' + (index+1)">
						<view class="nav-name">{{item.title}}</view>
					</view>
					<view class="nav-content">{{item.Content}}</view>
					<view @click="goLoanPage" class="nav-btn shadow" :class="'bg-index' + (index+1)">立即申请</view>
				</view>
			</scroll-view>
		</view>
	
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">消息动态</text>
				<text class="text-ABC text-blue">messages</text>
			</view>
			<view class="action" @click="goProjectList">
				<text class="text-lg text-grey text-shadow">更多</text>
			</view>
		</view>

		<view class="flex  text-center" style="width: 100vw;">
			<view class="flex-sub padding-sm" style="padding-right:10upx;">
				<block v-for="(item, index) in msgListOdd" :key="'odd-'+index">
					<view class="bg-white margin-top-sm radius">
						<view style="width: 46.5vw;">
							<image :src="item.imgUrl" class="radius" mode="widthFix"></image>
						</view>
						<view class="padding-sm" style="width: 100%;">
							<view class="title-header text-bold">
								{{item.title}}
							</view>
							<view class="text-gray text-sm padding-top-xs padding-bottom-xs">
								{{item.content}}
							</view>
							<view>
								<view class='cu-tag radius sm bg-blue'>额度高</view>
								<view class='cu-tag radius sm bg-brown'>放款快</view>
								<view class='cu-tag radius sm bg-cyan'>无抵押</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view class="flex-sub padding-sm" style="padding-left:10upx;">
				<block v-for="(item, index) in msgListEvn" :key="'odd-'+index">
					<view class="bg-white margin-top-sm radius">
						<view style="max-width: 46.5vw;">
							<image :src="item.imgUrl" class="radius" mode="widthFix"></image>
						</view>
						<view class="padding-sm " style="width: 100%;">
							<view class="title-header text-bold">
								{{item.title}}
							</view>
							<view class="text-gray text-sm padding-top-xs padding-bottom-xs">
								{{item.content}}
							</view>
							<view>
								<view class='cu-tag radius sm bg-blue'>额度高</view>
								<view class='cu-tag radius sm bg-brown'>放款快</view>
								<view class='cu-tag radius sm bg-cyan'>无抵押</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="cu-modal" :class="!hasUserInfo?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">授权登录</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					微信需要获取您的登录授权。
				</view>
				<view class="cu-bar bg-white justify-end">
					
					<view class="action">
						<button class="cu-btn line-green text-bule" v-if="canIUseGetUserProfile" @click="getUserProfile"> 获取头像昵称 </button>
						<button class="cu-btn line-green text-bule" v-else open-type="getUserInfo" @getuserinfo="getUserInfo"> 获取头像昵称 </button>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 140rpx;width: 1rpx;"></view>
	</view>
</template>

<script>
	import utils from '../../utils.js';
	import Vue from 'vue'
	import { mapState, mapGetters } from 'vuex'
	import store from '@/store/index.js'
	import proData from "@/common/projectData.js";
	import addTip from "../../components/wxcomponents/struggler-uniapp-add-tip/struggler-uniapp-add-tip.vue"
	export default {
		components: {
			addTip
		},
		data() {
			return {
				tip:"点击「添加小程序」，下次访问更便捷",
				duration:1,
				
				scrollTop: 0,
				old: {
					scrollTop: 0
				},

				bannerList: [{
						imageUrl: 'https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/banner0.jpeg',
					}, 
					{
						imageUrl: 'https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/banner1.jpeg',
					},
					{
						imageUrl: 'https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/banner2.jpeg',
					},
					{
						imageUrl: 'http://cdn.zhoukaiwen.com/zjx_banner.png',
					}
				],
				categories: [{
					cuIcon: 'time',
					color: 'red',
					badge: '',
					mid: '0',
					count: 0,
					name: '贷款进度'
				}, {
					cuIcon: 'footprint',
					color: 'orange',
					badge: '',
					mid: '1',
					count: 0,
					name: '贷款计算器'
				}, {
					cuIcon: 'recharge',
					color: 'yellow',
					badge: '',
					mid: '2',
					count: 0,
					name: '税费计算'
				}, {
					cuIcon: 'search',
					color: 'cyan',
					badge: '',
					mid: '3',
					count: 0,
					name: '在线询价'
				}],
				msgListOdd:[],
				msgListEvn:[],
				curriculum:[],
				canIUseGetUserProfile:false,
				hasUserInfo:true,
				userInfo:{},
			}
		},
		watch: {

		},
		computed:{
			...mapGetters({
			//	getUserinfo: 'userinfo/getUserinfo',
				getSystemInfo: 'systeminfo/getSystemInfo'
			}),
			// userInfo(){
			// 	return this.getUserinfo
			// },
			systemInfo(){
				return this.getSystemInfo
			},
			
		},
		mounted() {
			var _this = this;
		//	console.log(this.projectList);
			//获取首页数据
			this.commRequest("fyt/getProductListHot",  {}, (res)=>{
				console.log("fyt/getProductListHot Home:"+JSON.stringify(res));
				_this.curriculum = res.productList;
				_this.msgListOdd = res.msgList.filter(function(item,index){
					return index%2 == 1;
				});
				_this.msgListEvn = res.msgList.filter(function(item,index){
					return index%2 == 0;
				});
				
			})
			
			return;
			this.userInfo = uni.getStorageSync("userInfo");
		
			console.log("home created:",JSON.stringify(this.userInfo));
			//是否已经获取了用户信息
			if(utils.isEmpty(this.userInfo)){
				_this.hasUserInfo = false;
			}else{
				_this.hasUserInfo = _this.userInfo.hasUserInfo;
			}
			
			// #ifdef MP-WEIXIN
			if(wx.getUserProfile) {
			    _this.canIUseGetUserProfile=true
			  }
			//#endif
			
			uni.$on('update', this.updated);
			uni.$on('updateAfterCommit', this.updated);
		},
		methods: {
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			goCategorieslist: function(e) {
				 console.log(e.currentTarget.dataset.mid)
	
				var targetUrl = '';
				switch (e.currentTarget.dataset.mid){
					case '0':
						
						targetUrl = '/pages/query/calculator';
						break;
					case '1':
						targetUrl = '/pages/query/calculator';
						break;
					case '2':
						targetUrl = '/pages/query/calculator';
						break;
					case '3':
						targetUrl = '/pages/query/hfcx';
						break;
					default:
						break;
				}
				uni.navigateTo({
					url: targetUrl
				})
				
			},
			goLoanPage(){
				uni.navigateTo({
					url: '/pages/loan/loaninfo'
				})
			},
			hideModal:function(){
				this.hasUserInfo = true;
			},
			updated(){
				this.userInfo = uni.getStorageSync("userInfo");
				//如果状态为登录则获取数据
				if(this.userInfo.loginStat){
					this.initPages();
				}
			},
			loginApp(){
				uni.navigateTo({
					url: '/pages/login/index'
				})
			},
			getUserProfile(e) {
				 console.log("getUserProfile:"+JSON.stringify(e))
				 var _this = this;
			    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
			    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
			    wx.getUserProfile({
			      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			      success: (res) => {
					  console.log("getUserProfile success:"+JSON.stringify(res))
					
					  uni.setStorageSync("userInfo_wx", res.rawData);
					  _this.hasUserInfo = true;
							
					  _this.updateWx();
			      },
				  fail: (err) =>{
					  console.log("getUserProfile fail:"+JSON.stringify(err))
					  _this.hasUserInfo = true;
				  }
			    })
			  },
			  getUserInfo(e) {
				  console.log("getUserInfo:"+JSON.stringify(e))
			    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
				uni.setStorageSync("userInfo_wx", e.detail.userInfo);
				_this.hasUserInfo = true;
											
				_this.updateWx();
			  },
		}
	}
</script>
<style lang="scss" scoped>
	.swiper-box {
		flex: 1;
	}

	.swiper-item {
		height: 100%;
	}
	/*scroll-view外层*/
	.skill-sequence-panel-content-wrapper {
		position: relative;
		white-space: nowrap;
		padding: 10rpx 0 10rpx 10rpx;
	}

	/*左右渐变遮罩*/
	.hide-content-box {
		position: absolute;
		top: 0;
		height: 100%;
		width: 10px;
		z-index: 2;
	}

	.hide-content-box-left {
		left: 0;
		background-image: linear-gradient(to left, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.hide-content-box-right {
		right: 0;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0), #f3f3f3 60%);
	}

	.kite-classify-scroll {
		width: 100%;
		height: 380rpx;
		overflow: hidden;
		white-space: nowrap;
	}

	.kite-classify-cell {
		display: inline-block;
		width: 266rpx;
		height: 370rpx;
		margin-right: 20rpx;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 2px 2px 3px rgba(26, 26, 26, 0.2);
	}

	.nav-li {
		padding: 40rpx 30rpx;
		width: 100%;
		background-image: url(https://s1.ax1x.com/2020/06/27/NyU04x.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-name {
		font-size: 28upx;
		text-transform: Capitalize;
		margin-top: 20upx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-content {
		width: 100%;
		padding: 15rpx;
		display: inline-block;
		overflow-wrap: break-word;
		white-space: normal;
	}

	.nav-btn {
		width: 200rpx;
		height: 60rpx;
		margin: 8rpx auto;
		text-align: center;
		line-height: 60rpx;
		border-radius: 10rpx;
	}

	.bg-index1 {
		background-color: #19CF8A;
		color: #fff;
	}

	.bg-index2 {
		background-color: #954FF6;
		color: #fff;
	}

	.bg-index3 {
		background-color: #5177EE;
		color: #fff;
	}

	.bg-index4 {
		background-color: #F49A02;
		color: #fff;
	}

	.bg-index5 {
		background-color: #FF4F94;
		color: #fff;
	}

	.bg-index6 {
		background-color: #7FD02B;
		color: #fff;
	}

	.item-name {
		margin-bottom: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>
