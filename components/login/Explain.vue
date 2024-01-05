<template>
	<view class="explain" @click="change">
		<image src="@/static/images/checked.png" v-if="checkbox"></image>
		<image src="@/static/images/checked_no.png" v-else></image>
		<text>已阅读并同意</text>
		<view @click.stop="router('/pages/my/article?key=agreement')">《用户协议》</view>
		<text>、</text>
		<view @click.stop="router('/pages/my/article?key=privacy')">《隐私政策》</view>
	</view>
</template>

<script setup>
	import useLogin from "@/hooks/useLogin.js";
	let {
		checkbox,
		change,
		router
	} = useLogin();
</script>

<style scoped lang="scss">
	.explain {
		color: #999999;
		font-size: 26rpx;
		display: flex;
		align-items: center;

		image {
			width: 40rpx;
			height: 40rpx;
			margin-right: 14rpx;
		}
	}
</style>