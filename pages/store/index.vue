<template>
	<view class="bg-gray" :style="'height: '+systemInfo.screenHeight+'px;'">
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="note">门店管理</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">门店名称</view>
				<input placeholder="输入门店名称" name="mdName" :value="formData.mdName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">隶属机构</view>
				<input placeholder="输入隶属机构" name="orgnName" :value="formData.orgnName"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">店长名称</view>
				<input placeholder="输入店长名称" name="mdManager" :value="formData.mdManager"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input placeholder="输入店长名称" name="telno" :value="formData.telno"></input>
			</view>
			<view class="cu-form-group margin-top" @click="openLocation">
				<view class="title">门店位置</view>
				 <input placeholder="点我选择区域"></input>
				<view class="bg-blue radius text-sm padding-xs">
					上传坐标
				</view>
			</view>
			<view class="cu-form-group">
				<textarea maxlength="-1"  name="address" :value="formData.address" placeholder="门店详细位置"></textarea>
			</view>
			<view class="cu-form-group" @click="goTimeLine">
				<view class="title">成员管理</view>
				<input placeholder="点击查看成员管理" disabled="true"></input>
				<text class='cuIcon-right text-gray'></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">其他说明</view>
			</view>
			<view class="cu-form-group">	
				<textarea maxlength="-1"  name="note" :value="formData.note" placeholder="备注说明"></textarea>
			</view>
			
			<view class="padding-xl">
				<button form-type="submit" class="cu-btn block bg-blue margin-tb-sm lg">
					 提交
				</button>
			</view>
			
		</form>
		
	</view>
</template>

<script>
	import utils from '../../utils.js'; 
	
	import GeocodeUtils from '../../common/geocode-utils.js'
	import { mapState, mapGetters } from 'vuex'
	import store from '@/store/index.js'
	export default {
		data() {
			return {
				fileno:'',
				title:'',
				note:'',
				type:0,
				formData:{
					mdName:'东立一店',
					orgnName:'世纪天源房地产',
					mdManager:'刘威宁',
					telno:'150****3465',
					address:'二七路987号',
					note:''
				},
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
		methods: {
			textareaAInput(e) {
				this.note = e.detail.value
			},
			checkLocation(){
				var _this = this;
				GeocodeUtils.getLocationByAddress(this.address,function(res){
					console.log("=======success======="+JSON.stringify(res));
					_this.toLo.latitude = res.lat;
					_this.toLo.longitude = res.lng;
				})
			},
			getLocation(){
				var _this = this;

				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function (res) {
						console.log("getLocation:"+JSON.stringify(res))
						const latitude = res.latitude;
						const longitude = res.longitude;
						_this.myLo.latitude = latitude;
						_this.myLo.longitude = longitude;

						_this.checkLocation();
					}
				});	
			},
			/**
			 * 打开自带定位
			 */
			openLocation(){
				var _this = this;
				uni.navigateTo({
					url:'/pages/map/index?myLo='+JSON.stringify(_this.myLo)+'&toLo='+JSON.stringify(_this.toLo)
				})
	
			},
			/**
			 * @param {Object} e
			 * form提交
			 */
			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value));
			},
			formReset: function(e) {
				console.log('清空数据')
			}

		},
		onLoad(options){
			var _this = this;
			console.log("options.item:"+JSON.stringify(options));
			this.fileno = options.fileno;
			
			this.getLocation();
		}
	}
</script>

<style>
	input{
		text-align: right;
	}
	.switch-Text{
		width: 50%;
		text-align: right;
		
	}
</style>
