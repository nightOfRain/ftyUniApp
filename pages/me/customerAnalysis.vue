<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">数据分析</block>
		</cu-custom>
		<u-notice-bar mode="horizontal" type="primary" :list="list"></u-notice-bar>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">渠道分布</text>
				<text class="text-ABC text-blue">FunnelCharts</text>
			</view>
			<view class="action">
				<text class="text-xl text-bold text-gray">折线图：{{selectChannel}}</text>
			</view>
		</view>
		<view class="flex bg-white padding-sm" style="border-top:2px solid #f2f2f2">
			<view class="flex-sub shadow radius bg-brown margin-sm text-center padding-sm" @click="channelClick(0)" >
				<view class="text-sm text-bold">{{channelData[0].name}}</view>
				<view class="margin-top">{{channelData[0].num}}</view>
				<view>环比：{{channelData[0].hb}}%</view>
				<view>同比：{{channelData[0].tb}}%</view>
			</view>
			<view class="flex-sub shadow radius bg-brown margin-sm text-center padding-sm" @click="channelClick(1)">
				<view class="text-sm text-bold">{{channelData[1].name}}</view>
				<view class="margin-top">{{channelData[1].num}}</view>
				<view>环比：{{channelData[1].hb}}%</view>
				<view>同比：{{channelData[1].tb}}%</view>
			</view>
			<view class="flex-sub shadow radius bg-brown margin-sm text-center padding-sm" @click="channelClick(2)">
				<view class="text-sm text-bold">{{channelData[2].name}}</view>
				<view class="margin-top">{{channelData[2].num}}</view>
				<view>环比：{{channelData[2].hb}}%</view>
				<view>同比：{{channelData[2].tb}}%</view>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
		</view>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">销售漏斗图</text>
				<text class="text-ABC text-blue">FunnelCharts</text>
			</view>
			<view class="action">
				<text class="text-xl text-bold text-gray">转换率16%</text>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasFunnel" id="canvasFunnel" class="charts"></canvas>
		</view>
		
	
		

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">业绩团队分布</text>
				<text class="text-ABC text-blue">ringCharts</text>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" @touchstart="touchRing"></canvas>
		</view>

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">业绩产品分布</text>
				<text class="text-ABC text-blue">PieCharts</text>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasPie" id="canvasPie" class="charts" @touchstart="touchPie"></canvas>
		</view>

		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">月份同比</text>
				<text class="text-ABC text-blue">ColumnCharts</text>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasColumn" id="canvasColumn"  class="charts" style="padding-top:100px;"  @touchstart="touchColumn"></canvas>
		</view>
	</view>
</template>

<script>
	// 图表
	import uCharts from "@/components/u-charts/u-charts.js";
	var _self;
	var canvaRing = null;
	var canvaPie = null;
	var canvaColumn = null;
	var canvaFunnel = null;
	var canvaArea = null;

	export default {
		data() {
			return {
				list:[
					'1.渠道分布统计',
					'2.往年、今年及今年目标对比',
					'3.销售漏斗图，显示销售转换率',
					'4.团队业绩分布',
					'5.产品业绩分布',
					'6.去年、今年柱状图同比'
				],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				// 漏斗图
				funnelData: {
					"series": [{
						"name": "资讯▪️50",
						"data": 50,
					}, {
						"name": "见面▪️30",
						"data": 30
					}, {
						"name": "下定金▪️20",
						"data": 20
					}, {
						"name": "面签▪️18",
						"data": 18
					}, {
						"name": "完结▪️8",
						"data": 8
					}]
				},

				// 柱状图
				"Column": {
					"categories": ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月", "10月", "11月", "12月"],
					"series": [{
						"name": "去年",
						"data": [15, 45, 37, 43, 34, 45, 37, {
							"value": 20,
							"color": "#f04864"
						}, 45, 37, 43, 34]
					}, {
						"name": "今年",
						"data": [30, 25, 14, 34, 18,14, 34,{
							"value": 40,
							"color": "#facc14"
						}, 25, 14, 34, 18]
					}]
				},
				// 圆环图
				teamData: {
					"series": [{
						"name": "张三团队",
						"data": 50
					}, {
						"name": "李四团队",
						"data": 30
					}, {
						"name": "王武团队",
						"data": 20
					}, {
						"name": "赵六团队",
						"data": 18
					}, {
						"name": "曹二麻子团队",
						"data": 8
					}]
				},
				// 饼状图
				"cpData": {
					"series": [{
						"name": "按揭",
						"data": 50
					}, {
						"name": "信用",
						"data": 30
					}, {
						"name": "消费",
						"data": 20
					}, {
						"name": "房抵",
						"data": 18
					}, {
						"name": "交易",
						"data": 8
					}]
				},
				// 折线图
				Area: {
					categories: ["1月", "2月", "3月", "4月", "5月", '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
					series: [{
						name: '往年',
						data: [100, 80, 95, 150, 112, 132, 151],
						color: '#facc14'
					}, {
						name: '今年',
						data: [70, 40, 65, 100, 44, 68, 78],
						color: '#2fc25b'
					}, {
						name: '目标',
						data: [35, 20, 25, 37, 4, 20, 39],
						color: '#1890ff'
					}]
				},
				selectChannel:'',
				colors: ['#1890ff', '#2fc25b', '#facc14', '#f04864', '#8543e0', '#90ed7d'],
				
			};
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(420);
			this.initPage()
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			initPage(){
				var _this = this;
				//团队销售数据
				this.commRequest("fyt/getAchievement",  {}, (res)=>{
					console.log("fyt/getAchievement:"+JSON.stringify(res));
					_this.Area.series[0].data = res.oldYearList;
					_this.Area.series[1].data = res.yearList;
					_this.Area.series[2].data = res.targetList;
					
					_this.Column.series[0].data = res.oldYearList;
					_this.Column.series[1].data = res.yearList;
					
					//团队销售数据
					_this.commRequest("fyt/getCustomerAnalysis",  {}, (res)=>{
						console.log("fyt/getCustomerAnalysis:"+JSON.stringify(res));
						_this.channelData = res.channelData;
						_this.funnelData = res.funnelData;
						_this.teamData.series = res.teamData;
						_this.cpData.series = res.cpData;
						this.getServerData();
						this.channelClick(0);
						
					})
				})
				
				
				
				
			},
			getServerData() {
				_self.showArea("canvasArea", this.chartData);
				_self.showRing("canvasRing", this.teamData);
				_self.showPie("canvasPie", this.cpData);
				_self.showColumn("canvasColumn", this.Column);
				_self.showFunnel("canvasFunnel", this.funnelData);
				
			},

			// 漏斗图
			showFunnel(canvasId, chartData) {
				canvaFunnel = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'funnel',
					fontSize: 11,
					// padding: [15, 15, 0, 15],
					legend: {
						show: true,
						padding: 5,
						lineHeight: 11,
						margin: 0,
					},
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					series: this.funnelData,
					animation: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					dataLabel: true,
					extra: {
						funnel: {
							border: true,
							borderWidth: 2,
							borderColor: '#FFFFFF'
						}
					},
				})
			},
			// 柱状图
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: true,
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					categories: _self.Column.categories,
					series: _self.Column.series,
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: _self.cWidth * _self.pixelRatio * 0.45 / _self.Column.categories.length
						}
					}
				});
			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
					}
				});
			},

			// 圆环图
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 30 * _self.pixelRatio,
							lableWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: _self.teamData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
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
					series: _self.cpData.series,
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
		
			// 折线图
			showArea(canvasId, chartData) {
				canvaArea = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 11,
					legend: true,
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: _self.Area.categories,
					series: _self.Area.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: 180,
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						area: {
							type: 'straight',
							opacity: 0.2,
							addLine: true,
							width: 2
						}
					}
				});
			},
			touchArea(e) {
				canvaArea.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value
						} else {
							return category + ' ' + item.name + ':' + item.data
						}
						//return item.name + ' ' + category + ' ' + ':' + item.data
					}
				});
			},
			channelClick:function(index){
				const channelName=["线上渠道","直客","机构门店"];
				console.log("channelClick:"+index);
				this.selectChannel = channelName[index];
			}
			// ucharts end
		}
	};
</script>

<style lang="scss" scoped>
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
