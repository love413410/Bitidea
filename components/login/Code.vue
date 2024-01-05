<template>
	<view class="login_code">
		<view class="code_view">
			<image src="@/static/test/1.jpg"></image>
		</view>
		<view class="submit" @click="submit('wx')">登录</view>
	</view>
</template>

<script setup>
	import useLogin from "@/hooks/useLogin.js";
	import {
		shallowRef
	} from "vue";
	let {
		submit
	} = useLogin();
</script>

<style scoped lang="scss">
	.login_code {
		padding: 40rpx 0;
		box-sizing: border-box;

		.code_view {
			width: 100%;
			height: 630rpx;
			border-radius: 20rpx;
			padding: 65rpx;
			box-sizing: border-box;
			background: #23262F;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.submit {
			width: 100%;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			color: #111111;
			font-size: 36rpx;
			font-weight: bold;
			border-radius: 20rpx;
			margin-top: 50rpx;
			background: linear-gradient(50deg, #5CE5F9, #9785EA);
		}
	}
</style>