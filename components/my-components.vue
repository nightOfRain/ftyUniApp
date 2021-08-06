<template>
	<view>
		<view type="default"  @click.stop="open" style="height:30px;background-color: #4CD964;">{{title}}</view>
	</view>
</template>

<script>
	export default {
		name:"my-components",
		props:{
			title:{
				default:"hello father"
			}
		},
		methods:{
			open(){
				console.log("===open===")
				this.$emit('update:title', "uni-app")
			}
		}
	}
</script>

<style>

</style>
