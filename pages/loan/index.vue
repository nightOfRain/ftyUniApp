<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">资料填写</block>
		</cu-custom>
		<form @submit="formSubmit">
			<view class="cu-form-group">
				<view class="title">我的姓名</view>
				<input placeholder="输入申请人姓名" name="name" :value="formdata.name"></input>
			</view>


			<view class="cu-form-group">
				<view class="title">审贷意图</view>
				<picker @change="PickerChange_zh" :value="formdata.housePurpose" :range="picker">
					<view class="picker">
						{{formdata.housePurpose>-1?picker[formdata.housePurpose]:'请选择审贷意图'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">期望额度</view>
				<input placeholder="请输入期望额度" type="digit" name="LoanAmt" :value="formdata.LoanAmt"></input>
				<text class='text-black'>万</text>
			</view>
			<view class="cu-form-group">
				<view class="title">贷款期限</view>
				<input placeholder="请输入期望期限" type="number" name="dkSqqx" :value="formdata.dkSqqx"></input>			
				<text class='text-black'>月</text>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="本人手机号" type="number" name="telno" :value="formdata.telno"></input>
				<view class="cu-capsule radius" @click="getMsgCode">
					<view class='cu-tag bg-blue' :class="isActive?'bg-grey':''">
						{{isActive?countStr:'获取验证码'}}
					</view>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">验证码</view>
				<input placeholder="输入验证码" name="code" :value="formdata.code"></input>
			</view>

			<view class="cu-form-group margin-top">
				<textarea maxlength="-1"  @input="textareaAInput" name="content" :value="content" placeholder="需求详细描述"></textarea>
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
	export default {
		data() {
			return {
				picker:['置换购房','投资购房','资金周转','其他'],
				time: '12:01',
				date: '2018-12-25',
				index: -1,
				formdata:{
					mfHaspo:0,
					housePurpose:-1,
				},
				isActive:false,
				count : 60,
				countStr : '60S...'
			};
		},
		methods: {
			/**
			 * @param {Object} e
			 * 获取短信验证码
			 */
			getMsgCode(e){
				var _this = this;
				uni.showModal({
					title:'交易提示',
					content:'短信验证码已发送，60秒内有效，请尽快处理'
				})
				
				this.isActive = true;
			
				var tmpCount = this.count;
				var myTime = setInterval(function(){
					tmpCount--;
					_this.countStr = '倒计时'+tmpCount+'s...';
					if(tmpCount < 1){
						_this.isActive = false;
						clearInterval(myTime);
					}
				},1000);
				
				/**
				 * 与后台交互，成功后，关闭倒计时，这里挡板处理
				 */
				setTimeout(function(){
					_this.isActive = false;
					clearInterval(myTime);
				},6000);
			},
			PickerChange_zh(e){
				this.formdata.housePurpose = e.detail.value
			},

			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},

			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},

			formSubmit: function(e) {
				var _this = this;
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				
				formdata.housePurpose = _this.formdata.housePurpose;

				console.log('表单数据内容：' +JSON.stringify(formdata));
				
				uni.showModal({
					title:'业务提示',
					content:'您的申请提交成功，工作人员收到后会第一时间联系您'
				})
			},
			formReset: function(e) {
				console.log('清空数据')
			}
		},
		onLoad(options){
			var _this = this;
		
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
