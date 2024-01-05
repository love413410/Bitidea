<template>
	<view class="side" @click="router('/pages/draw/draw_record')">绘画记录</view>
</template>

<script setup>
	import useBase from "@/hooks/useBase.js";
	const {
		router
	} = useBase();
</script>

<style scoped lang="scss">
	.side {
		width: 50rpx;
		line-height: 42rpx;
		text-align: center;
		color: #FFFFFF;
		font-size: 28rpx;
		border-radius: 10rpx 0 0 10rpx;
		padding: 10rpx 0;
		// background: linear-gradient(-50deg, #5CE5F9, #9785EA);
		background: linear-gradient(50deg, #58DBEF, #9785EA);
		position: fixed;
		right: 0;
		bottom: 100px;
		z-index: 99;
	}
</style>