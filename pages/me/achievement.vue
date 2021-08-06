<template>
	<view>
		<cu-custom bgColor="bg-blue" :isBack="true">
			<block slot="backText"></block>
			<block slot="content">销售业绩</block>
		</cu-custom>
		<u-notice-bar mode="horizontal" type="primary" :list="list"></u-notice-bar>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">销售经理排名</text>
				<text class="text-ABC text-blue">ColumnCharts</text>
			</view>
		</view>
		<!-- <view class="chartsMain">
			<canvas canvas-id="canvasColumn" id="canvasColumn" class="charts" @touchstart="touchColumn"></canvas>
		</view> -->
		<view class="padding-sm bg-white">
			<view class="flex text-center bg-olive">
				<view class="flex-treble solid padding-xs padding-bottom-sm padding-top-sm">销售经理</view>
				<view class="flex-twice solid padding-xs padding-bottom-sm padding-top-sm">开单量</view>
				<view class="flex-twice solid padding-xs padding-bottom-sm padding-top-sm">申请额</view>
				<view class="flex-twice solid padding-xs padding-bottom-sm padding-top-sm">放款额</view>
				<view class="flex-twice solid padding-xs padding-bottom-sm padding-top-sm">开单率</view>
			</view>
					
			<scroll-view class=" bg-white solid" style="height:40vw;" show-scrollbar="true" scroll-y="true">
				<view class="flex text-center align-center solid-bottom" :class="index%2==0?'bg-white':'bg-gray'" v-for="(item,index) in xsData" :key="index"  @click="xsjlClick" :data-index="index">
					<view class="flex-treble solid-right padding-xs">{{index+1}}.{{item.name}}</view>
					<view class="flex-twice solid-right padding-xs">{{item.kdl}}</view>
					<view class="flex-twice  padding-xs">{{item.sqe}}万</view>
					<view class="flex-twice  padding-xs">{{item.ffe}}万</view>
					<view class="flex-twice  padding-xs">{{item.mdkdl}}%</view>
				</view>
			</scroll-view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom margin-top">
			<view class="action">
				<text class="cuIcon-title text-blue"></text>销售经理-{{currentXSJL}}
			</view>
			<view class="action">
				<view class="text-bold text-xs text-gray padding-bottom-xs padding-top-xs">门店开单率：33%</view>
			</view>
		</view>
		<view class="bg-white padding-sm">
			
			<view class="flex text-center bg-cyan">
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


		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">对比趋势</text>
				<text class="text-ABC text-blue">LineCharts</text>
			</view>
		</view>
		<view class="chartsMain">
			<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea"></canvas>
		</view>
		<view class="cu-bar bg-white margin-top-xs">
			<view class="action sub-title">
				<text class="text-xl text-bold text-blue text-shadow">业绩分布</text>
				<text class="text-ABC text-blue">PieCharts</text>
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
	var _self;
	var canvaRing = null;
	var canvaArea = null;
	var canvaGauge = null;
	var canvaPie = null;
	var canvaColumn = null;
	var canvaFunnel = null;
	var canvaWord = null;

	export default {
		data() {
			return {
				list:[
					'本年销售业绩，表格、柱状图、饼状图、趋势图'
				],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				total:189,
				xsData:[{
					name:'张三',
					kdl:89,
					sqe:1098,
					ffe:890,
					mdkdl:12,
				},{
					name:'张三',
					kdl:89,
					sqe:1098,
					ffe:890,
					mdkdl:12,
				},{
					name:'张三',
					kdl:89,
					sqe:1098,
					ffe:890,
					mdkdl:12,
				},{
					name:'张三',
					kdl:89,
					sqe:1098,
					ffe:890,
					mdkdl:12,
				},{
					name:'张三',
					kdl:89,
					sqe:1098,
					ffe:890,
					mdkdl:12,
				},{
					name:'张三',
					kdl:89,
					sqe:1098,
					ffe:890,
					mdkdl:12,
				},],
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
				// 柱状图
				"Column": {
					"categories": ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月", "10月", "11月", "12月"],
					"series": [{
						"name": "月度业绩(开单量)",
						color: '#ffffff',
						//"data": []
						"data": [0,100,100,100,100,100,100,100,100,100,100,100]
					},]
					
				},

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
				// 折线图
				Area: {
					categories: ["1月", "2月", "3月", "4月", "5月", "6月","7月", "8月", "9月", "10月", "11月", "12月"],
					series: [{
						name: '今年',
						data: [],
						color: '#facc14'
					}, {
						name: '往年',
						data: [],
						color: '#2fc25b'
					}, {
						name: '年初目标',
						data: [],
						color: '#1890ff'
					}]
				},
				currentXSJL:''
			};
		},
		onLoad() {
			_self = this;
			var _this = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(420);
			this.commRequest("fyt/getAchievement",  {}, (res)=>{
				console.log("fyt/getAchievement Home:"+JSON.stringify(res));
				_this.curriculum = res.productList;
				_this.yearList = res.yearList;
				_this.oldYearList = res.oldYearList;
				_this.targetList = res.targetList;
				_this.Column.series[0].data = _this.yearList;
				_this.Area.series[0].data = _this.yearList;
				_this.Area.series[1].data = _this.oldYearList;
				_this.Area.series[2].data = _this.targetList;
			})
			//this.Column.series[0].data = this.yearList;
			this.getServerData();
			this.currentXSJL = this.xsData[0].name;
		},
		computed: {

		},
		mounted() {

		},
		methods: {
			getServerData() {

				_self.showArea("canvasArea", this.chartData);
				_self.showPie("canvasPie", this.Pie);
				_self.showColumn("canvasColumn", this.Column);
			
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
						max: 100,
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
						return item.name + ' ' + category + ' ' + ':' + item.data
					}
				});
			},

			xsjlClick(e){
				const index = e.currentTarget.dataset.index;
				this.currentXSJL = this.xsData[index].currentXSJL;
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
