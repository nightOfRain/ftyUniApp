<template>
	<view class="bg-gray" :style="'height: '+systemInfo.screenHeight+'px;'">
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">产品详情</block>
		</cu-custom>
		
		<view >
			<image :src="imageUrl" mode="widthFix" style="width: 100vw;"></image>
		</view>
		<view class="padding-xl">
			<button @click="goCommit" class="cu-btn block bg-blue margin-tb-sm lg">
				 提交
			</button>
		</view>
	</view>
</template>

<script>
	import utils from '../../utils.js';
	import Vue from 'vue'
	import { mapState, mapGetters } from 'vuex'
	export default{
		data(){
			return{
				imageUrl:'http://www.sjyjr.net/static/productinfoImage/1546840311973.jpg'
			}
		},
		computed:{
			...mapGetters({
				getSystemInfo: 'systeminfo/getSystemInfo'
			}),
			systemInfo(){
				return this.getSystemInfo
			},
		},
		onLoad() {
			
		},
		methods:{
			goCommit(){
				uni.navigateTo({
					url:'./index'
				})
			}
		}
	}
</script>

<style>
</style>
