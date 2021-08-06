<template>
	<view class="bg-white" :style="'height: '+systemInfo.screenHeight+'px;'">
		<view :style="'background-image: url(https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/bg2.jpeg);background-repeat:no-repeat;background-size: cover;height:50vw;padding:20px;margin-top:'+myTop+'px;'">
			<view class="u-search-box  padding-xs radius" style="margin-top:24px;background-color: rgba(188,188,188,0.3);">
				<view class="u-search-inner">
					<text class="lg text-gray cuIcon-search"></text>
					<text class="u-search-text text-sm">搜索您想找的...</text>
				</view>
			</view>
			<view class="cu-list grid col-4 margin-top radius no-border shadow bg-white" :style="'margin-top:'+(bodyTop+20)+'px;'">
				<view class="cu-item" hover-class="hover-class" v-for="(item,index) in cuIcon" :key="index">
					<view  :class="['cuIcon-' + item.name,'text-' + item.color]"></view>
					<text>{{item.label}}</text>
				</view>
			</view>
		</view>
		
		<view style="border-bottom: solid 6px #f1f1f1;">
			<!-- <view class="cu-bar bg-white u-border-bottom" :style="'margin-top:'+bodyTop+'px'">
				<view class="action sub-title">
					<text class="text-xl text-bold text-red text-shadow"></text>
					<text class="text-ABC text-red"></text>
				</view>
				<view class="action">
					<text class="text-lg text-grey text-shadow"></text>
				</view>
			</view> -->
			<view class="flex margin-sm"  :style="'margin-top:'+(bodyTop+20)+'px'">
				<view class="flex-sub  padding-sm margin-xs radius shadow bg-white" style="height: 33vw;background-image: url('https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/box1.jpeg');background-repeat:no-repeat;background-size: cover;">
					<view class="text-white padding-xs text-sm" style="margin-top:22vw;background-color: rgba(8,8,8,0.1);"> 
						拒绝套路，贷款流程看这里
					</view>
				</view>
				<view class="flex-sub   margin-xs radius ">
					<view class="shadow bg-white padding-sm  radius" style="height: 16vw;background-image: url('https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/box2.jpeg');background-repeat:no-repeat;background-size: cover;">
						<view class="text-white padding-xs text-sm" style="margin-top:6vw;background-color: rgba(8,8,8,0.1);">
							房屋抵押，合理估值
						</view>
					</view>
					<view class="shadow bg-white padding-sm  radius margin-five" style="height: 16vw;background-image: url('https://7869-xiyuqing-20131015-1259653561.tcb.qcloud.la/test/box3.jpeg');background-repeat:no-repeat;background-size: cover;">
						
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white u-border-bottom margin-top">
			<view class="action sub-title">
				<text class="text-xl text-bold text-red text-shadow">热销房源</text>
				<text class="text-ABC text-red">HouseList</text>
			</view>
			<view class="action">
				<text class="text-lg text-grey text-shadow">更多</text>
			</view>
		</view>
		<block v-for="(item,index) in houseList" :key="'m-'+index">
			<view class="flex padding-sm bg-gray shadow bg-white">
				<view class="flex-sub bg-white  padding-xs radius" :style="'height:25vw;background-image: url('+item.imgUrl+');background-repeat:no-repeat;background-size: cover;'">
					
				</view>
				<view class="flex-twice bg-white" style="height:25vw;">
					<view class="bg-white padding-sm  radius">
						<view style="height:10vw;">{{item.content}}</view>
						<view class="ext-gray text-sm flex justify-start" style="margin-top:5px;">
							<view class='cu-tag radius sm bg-blue'>{{item.tag}}</view>
							<view class='cu-tag radius sm bg-blue'>{{item.price}}/平方</view>
						</view>
						<view class="text-xs" style="margin-top:10px;">发布时间:{{item.time}}</view>
					</view>
					
				</view>
			</view>
			
		</block>
		
	</view>
</template>

<script>
	import Vue from 'vue';
	import utils from '../../utils.js';
	import { mapState, mapGetters } from 'vuex'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				cuIcon: [{
					name: 'discoverfill',
					isShow: true,
					label:'新房',
					color:'green'
				}, {
					name: 'shopfill',
					isShow: true,
					label:'二手房',
					color:'pink'
				}, {
					name: 'homefill',
					isShow: true,
					label:'租房',
					color:'mauve'
				}, {
					name: 'countdownfill',
					isShow: true,
					label:'买房',
					color:'cyan'
				}],
				myTop: 0,
				houseList:[]
			};
		},
		computed:{
			...mapGetters({
				getSystemInfo: 'systeminfo/getSystemInfo'
			}),
			systemInfo(){
				return this.getSystemInfo
			}
		},
		mounted(){
			var _this = this;
			this.commRequest("fyt/getHouseList",  {}, (res)=>{
				console.log("fyt/getHouseList Home:"+JSON.stringify(res));
				_this.houseList = res.msgList;
			})
		},
		methods: {
			searchIcon(e) {
				let key = e.detail.value.toLowerCase();
				let list = this.cuIcon;
				for (let i = 0; i < list.length; i++) {
					let a = key;
					let b = list[i].name.toLowerCase();
					if (b.search(a) != -1) {
						list[i].isShow = true
					} else {
						list[i].isShow = false
					}
				}
				this.cuIcon = list
			}
		}
	}
</script>

<style>
	.margin-five{
		margin-top:1vw;
	}
</style>
