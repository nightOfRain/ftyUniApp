<template>
	<view class="u-wrap">
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">产品展示</block>
		</cu-custom>
		
		<view class="u-search-box">
			<view class="u-search-inner">
				<u-icon name="search" color="#909399" :size="28"></u-icon>
				<text class="u-search-text">搜索您想找的产品</text>
			</view>
		</view>
		<view class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item,index) in typeList" :key="index" class="u-tab-item" :class="[current==index ? 'u-tab-item-active' : '']"
				 :data-current="index" @tap.stop="swichMenu(index)">
					<text class="u-line-1" :class=" item.length > 4?'text-xs':''">{{item}}</text>
				</view>
			</scroll-view>
			<block v-for="(item,index) in typeList" :key="index">
				<scroll-view scroll-y class="right-box" v-if="current==index">
					<view class="cu-card case no-card" >
						<view @click="goProject" class="cu-item shadow" v-for="(item, index) in msgList" :key="index">
							<view class="image">
								<image :src="item.imgUrl" mode="widthFix"></image>
								<view class="cu-tag bg-gradual-orange"></view>
								<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.title}}</text></view>
							</view>
							<view class="cu-list menu-avatar">
								<view class="cu-item">
									<view class="margin-lr flex-sub">
										<view class="item-name text-grey text-lg">{{item.content}}</view>
										<view class="text-gray text-sm flex justify-between">
											{{item.time}}
											<view class="text-gray text-sm">
												<text class="cuIcon-attentionfill margin-lr-xs"></text> {{item.read}}
												<text class="cuIcon-appreciatefill margin-lr-xs"></text> {{item.like}}
												<text class="cuIcon-shopfill margin-lr-xs"></text> {{item.use}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
	</view>
</template>

<script>
	import classifyData from "@/common/classify.data.js";
	export default {
		data() {
			return {
				msgList: [],
				typeList: ['武昌区','汉阳区','洪山区','江岸区','江汉区'],
				scrollTop: 0, //tab标题的滚动条位置
				current: 0, // 预设当前项的值
				menuHeight: 0, // 左边菜单的高度
				menuItemHeight: 0, // 左边菜单item的高度
			}
		},
		computed: {
			
		},
		mounted() {
			var _this = this;
			//获取首页数据
			// this.commRequest("fyt/getAllProduct",  {}, (res)=>{
			// 	console.log("fyt/getAllProduct Home:"+JSON.stringify(res));
			// 	_this.tabbar = res.data;
				
			// })
			this.commRequest("fyt/getProductListHot",  {}, (res)=>{
				console.log("fyt/getProductListHot Home:"+JSON.stringify(res));
			
				_this.msgList = res.msgList;
			})
		},
		methods: {
			getImg() {
				return Math.floor(Math.random() * 35);
			},
			// 点击左边的栏目切换
			async swichMenu(index) {
				if(index == this.current) return ;
				this.current = index;
				// 如果为0，意味着尚未初始化
				if(this.menuHeight == 0 || this.menuItemHeight == 0) {
					await this.getElRect('menu-scroll-view', 'menuHeight');
					await this.getElRect('u-tab-item', 'menuItemHeight');
				}
				// 将菜单菜单活动item垂直居中
				this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
			},
			// 获取一个目标元素的高度
			getElRect(elClass, dataVal) {
				new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this);
					query.select('.' + elClass).fields({size: true},res => {
						// 如果节点尚未生成，res值为null，循环调用执行
						if(!res) {
							setTimeout(() => {
								this.getElRect(elClass);
							}, 10);
							return ;
						}
						this[dataVal] = res.height;
					}).exec();
				})
			},
			
			/**
			 * 根据产品编号跳转到不同产品页面
			 */
			goLoanType(e){
				console.log("goLoanType:"+JSON.stringify(e));
				const id = e.currentTarget.dataset.id;
			}
		
		}
	}
</script>

<style lang="scss" scoped>
	.u-wrap {
		height: calc(100vh);
		/* #ifdef H5 */
		height: calc(100vh - var(--window-top));
		/* #endif */
		display: flex;
		flex-direction: column;
	}

	.u-search-box {
		padding: 18rpx 30rpx;
	}

	.u-menu-wrap {
		flex: 1;
		display: flex;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444;
		font-weight: 400;
		line-height: 1;
	}
	
	.u-tab-item-active {
		position: relative;
		color: #000;
		font-size: 30rpx;
		font-weight: 600;
		background: #fff;
	}
	
	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 4px solid $u-type-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}
	
	.right-box {
		background-color: rgb(250, 250, 250);
	}
	
	.page-view {
		padding: 16rpx;
	}
	
	.class-item {
		margin-bottom: 30rpx;
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}
	
	.item-title {
		font-size: 30rpx;
		color: $u-main-color;
		font-weight: bold;
		margin: 10rpx 0;
	}
	
	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}
	
	.item-container {
		display: flex;
		flex-wrap: wrap;
	}
	
	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
		margin-bottom: 10rpx;
	}
	
	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 100rpx;
	}
</style>
