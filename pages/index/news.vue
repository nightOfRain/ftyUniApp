<!-- 文章资讯 -->
<template>
	<view>
		<cu-custom bgColor="bg-gradual-blue" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">行业资讯</block>
		</cu-custom>

		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft" style="width:100%;text-align:center;">
			<view class="cu-item" :class="index == TabCur?'text-blue cur':''"  v-for="(item,index) in navTop" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item.title}}
			</view>
		</scroll-view>
		
		<view class="cu-card article no-card">
			<block v-for="(item,index) in curList":key="index">
				<view class="cu-item shadow borderBottom" @click="goNews">
					<view class="title"><view class="text-cut">{{item.title}}
					</view></view>
					<view class="content">
						<image :src="item.imgUrl" mode="aspectFill"></image>
						<view class="desc">
							<view class="text-content">{{item.content}}</view>
							<view class="margin-top-xs">
								<view class="text-gray light sm round fl">{{item.time}}</view>
								<view class="text-gray light sm round fr">
									<text class="text-gray cuIcon-mark" style="font-size: 34rpx;"></text>
									<text>{{item.read}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view class="margin-top-xs padding-bottom-xs">--到底了--</view>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	export default {
		data() {
			return {
				TabCur: 0,
				scrollLeft: 0,
				navTop:[
					{
						id: 1,
						title: '天源资讯'
					},
					{
						id: 2,
						title: '中介门店'
					},
					{
						id:3,
						title: '行业热点'
					}
				],
				news1:[],
				news2:[],
				news3:[],
				curList:[]
			};
		},
		mounted(){
			this.getMessage()
		},
		methods: {
			tabSelect(e) {
				
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
		
				this.getMessage()
			},
			getMessage(){
				var _this = this;
				this.commRequest("fyt/getMessages",  {}, (res)=>{
					console.log("fyt/getMessages Home:"+JSON.stringify(res));
				
					_this.curList = res.list;
				})
			},
			goNews(){
				uni.navigateTo({
					url: '../news/news'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.borderBottom{
		border-bottom: 1px solid #f2f2f2;
	}
</style>
