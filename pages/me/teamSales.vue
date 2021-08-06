<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">团队统计</block>
		</cu-custom>
		
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>团队开单量-{{total}}笔
			</view>
			<view class="action">
				门店开单率
			</view>
		</view>
		<view class="padding-sm bg-white">
			<block v-for="(item, index) in teamData" :key="'team-'+index">
				<view class="flex margin-top" hover-class="hover-class" @click="tapTeam" :data-index="index">
					<view class="cu-progress">
						<text style="width: 20vw;">{{item.teamName}}</text>
						<view class="round" :class="'bg-'+ColorList[index].name" :style="[{ width:item.loading}]">{{item.num}}</view>
					</view>
					<text class="margin-left">{{item.loading}}</text>
				</view>
			</block>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>当前团队-{{currentTeam}}
			</view>
			<view class="action">
				<view class="text-bold text-xs text-gray padding-bottom-xs padding-top-xs">团队可切换，图表可上下滚动</view>
			</view>
		</view>
		<view class="bg-white padding-sm">
			
			<view class="flex text-center bg-orange">
				<view class="flex-sub solid padding-xs padding-bottom-sm padding-top-sm">#No</view>
				<view class="flex-treble solid padding-xs padding-bottom-sm padding-top-sm">门店名字</view>
				<view class="flex-twice solid padding-xs padding-bottom-sm padding-top-sm">按揭单</view>
				<view class="flex-twice solid padding-xs padding-bottom-sm padding-top-sm">产品单</view>
			</view>
		
			<scroll-view class=" bg-white solid" style="height:40vw;" show-scrollbar="true" scroll-y="true">
				<view class="flex text-center align-center solid-bottom" :class="index%2==0?'bg-white':'bg-gray'" v-for="(item,index) in mdData" :key="index">
					<view class="flex-sub solid-right padding-xs">{{index+1}}</view>
					<view class="flex-treble solid-right padding-xs">{{item.name}}</view>
					<view class="flex-twice solid-right padding-xs">{{item.ajdl}}</view>
					<view class="flex-twice  padding-xs">{{item.cpdl}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>产品分布-{{currentTeam}}
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
		</view>
	</view>
</template>

<script>
	// 图表
	import uCharts from "@/components/u-charts/u-charts.js";
	var canvaPie = null;
	var _self;
	export default {
		data() {
			return {
				ColorList: this.ColorList,
				color: 'red',
				loading: false,
				modalName: '',
				active: false,
				list:[
					'本年销售业绩，表格、柱状图、饼状图、趋势图'
				],
				total:189,
				currentTeam:'',
				teamData:[{
					teamName:'刘文杰团队',
					num:15,
					loading:'15%',
				},{
					teamName:'黎明团队',
					num:35,
					loading:'35%',
				},{
					teamName:'张信哲团队',
					num:50,
					loading:'50%',
				},{
					teamName:'开发部',
					num:60,
					loading:'60%',
				},{
					teamName:'总经理办公室',
					num:90,
					loading:'70%',
				}],
				mdData:[{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},
				{
					name:'门店名字',
					ajdl:19,
					cpdl:20,
				},],
				// 饼状图
				"Pie": {
					"series": [{
						"name": "按揭贷",
						"data": 50
					}, {
						"name": "消费贷",
						"data": 30
					}, {
						"name": "信用贷",
						"data": 20
					}, {
						"name": "房抵贷",
						"data": 18
					}, {
						"name": "车抵贷",
						"data": 8
					}]
				},
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
			};
		},
		onLoad: function() {
			let that = this;
			_self = this;
			setTimeout(function() {
				that.loading = true
			}, 500);
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(420);
			
			this.initPage();
		},
		methods: {
			initPage(){
				var _this = this;
				//团队销售数据
				this.commRequest("fyt/getTeamSales",  {}, (res)=>{
					console.log("fyt/getTeamSales:"+JSON.stringify(res));
					_this.Pie.series = res.pieData;
					
					_this.teamData = res.teamData;
				})
				this.currentTeam = this.teamData[0].teamName;
				this.getDataByTeamId();
				this.getServerData();
			},
			getDataByTeamId(){
				var _this = this;
				//团队销售数据
				this.commRequest("fyt/getTeamMdSales",  {}, (res)=>{
					console.log("fyt/getTeamMdSales:"+JSON.stringify(res));
					_this.mdData = res.mdData;
				})
			},
			getServerData() {
				_self.showPie("canvasPie", this.Pie);
			},
			// 饼状图
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: _self.Pie.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			SetColor(e) {
				this.color = e.currentTarget.dataset.color;
				this.modalName = null
			},
			SetActive(e) {
				this.active = e.detail.value
			},
			tapTeam(e){
				console.log("tapTeam:"+JSON.stringify(e));
				const index = e.currentTarget.dataset.index;
				this.currentTeam = this.teamData[index].teamName;
				
				//获取团队门店数据
				this.getDataByTeamId();
			}
		}
	}
</script>

<style lang="scss" scoped>
.cu-progress{
	background-color: #ffffff;
}
.chartsMain {
		width: 750rpx;
		height: 450rpx;
		padding-top: 15rpx;
		background: #fff;
		margin-bottom: 24rpx;
		border-top: 2rpx solid #f2f2f2;
		.charts {
			width: 750rpx;
			height: 450rpx;
			box-sizing: border-box;
		}
	}
</style>
