<template>
	<view class="contaier">
		<cu-custom class="navBox" bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">门店位置</block>
		</cu-custom>
		
		<map class="map" id="myMap" ref="myMap" style="width:100%;height:100vh"  :latitude="latitude" :longitude="longitude"
		 :markers="covers" :scale="scale"  show-location="true"></map>

	</view>
</template>

<script>
	import Vue from 'vue'
	import GeocodeUtils from '../../common/geocode-utils.js'
	export default {
		data() {
			return {
				markerImg:'https://7869-xiyubeiwang-cn2cw-1300785936.tcb.qcloud.la/icon/icon4.png',
				map: '',
				scale: 16,
				covers: [],
				show_location: true,
				showList: false,
				latitude:39.901403,
				longitude:116.406243,
				address:''
			}
		},
		onReady() {
			this.map = uni.createMapContext('myMap');
		},
		onLoad(options) {
			console.log("onLoad:"+JSON.stringify(options));
			var _this = this;
		},
		
		methods: {
			makeMap(){
				var _this = this;
				var tmpPoints = [];

			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-box {
		display: flex;
		text-align: center;
		height: 80rpx;
		align-items: center;
		border-bottom: 1px solid #gray;
		box-shadow: -1rpx 4rpx 10rpx rgba(2, 90, 221, 0.17);

		view {
			flex: 1;
			font-size: 28rpx;
		}

		.active {
			color: #334BE7;
			font-weight: bold;
		}
	}

	.operation {
		width: 85rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: -1rpx 4rpx 16rpx rgba(2, 90, 221, 0.17);
		border-radius: 10rpx;
		position: absolute;
		bottom: 580rpx;
		right: 21rpx;
		padding-top: 10rpx;
		z-index: 10;

		&-item {
			text-align: center;
			margin-bottom: 10rpx;

			view {
				font-size: 30rpx;
				font-family: SourceHanSansCN-Medium;
				line-height: 32rpx;
				color: rgba(102, 102, 102, 1);
			}
		}

		&-item:nth-child(1) {
			margin-bottom: 24rpx;

			image {
				width: 40rpx;
				height: 32rpx;
			}
		}

		&-item:nth-child(2) {
			margin-bottom: 10rpx;

			image {
				width: 39rpx;
				height: 39rpx;
			}
		}

		&-item:nth-child(3) {
			margin-bottom: 15rpx;

			image {
				width: 42rpx;
				height: 22rpx;
			}
		}
	}

	.gas-station {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 8rpx 0 24rpx rgba(57, 111, 250, 0.23);
		opacity: 1;
		border-radius: 20rpx 20rpx 0 0;
		position: absolute;
		bottom: 0;
		z-index: 100;

		&-arrow {
			display: flex;
			justify-content: center;
		}

		.station-list {
			padding: 0rpx 22rpx;
			transition: all 0.3s;
			overflow: hidden;

			.item {
				display: flex;
				margin-top: 10rpx;

				.item-img {
					flex-shrink: 0;

					image {
						width: 150rpx;
						height: 150rpx;
						border-radius: 10rpx;
						border: 1px solid #f2f2f2;
					}
				}

				.item-info {
					width: 100%;
					padding: 5rpx 15rpx;

					text {
						color: #334BE7;
					}

					.item-title {
						font-size: 28rpx;
						font-weight: bold;
					}

					view:nth-child(2) {
						margin-top: 5rpx;
						font-size: 24rpx;
					}

					view:nth-child(3) {
						margin-top: 10rpx;
						font-size: 24rpx;
					}

					.item-nav {
						display: flex;
						justify-content: space-between;
						align-items: center;

						.btn-nav {
							width: 100rpx;
							height: 45rpx;
							line-height: 45rpx;
							text-align: center;
							border: 1px solid #334BE7;
							border-radius: 10rpx;
							color: #334BE7;
							font-size: 24rpx;
						}
					}
				}
			}

		}
	}
</style>
