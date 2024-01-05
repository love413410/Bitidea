<template>
	<view class="login_phone">
		<view class="item">
			<input type="text" placeholder="手机号" v-model="form.phone" class="input">
		</view>
		<view class="item" v-if="is_password">
			<input type="password" placeholder="请输入密码" v-model="form.password" class="input">
			<view class="icon" @click="is_password=false">
				<image src="@/static/images/y3.png"></image>
			</view>
		</view>
		<view class="item" v-else>
			<input type="text" placeholder="请输入密码" v-model="form.password" class="input">
			<view class="icon" @click="is_password=true">
				<image src="@/static/images/y4.png"></image>
			</view>
		</view>
		<view class="submit" :class="form.phone&&form.password?'active':''" @click="submit('phone')">登录</view>
		<view class="btn_view">
			<view @click="router('/pages/login/register')">用户注册</view>
			<view @click="router('/pages/login/find_password')">忘记密码</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	let is_password = ref(true);

	import useLogin from "@/hooks/useLogin.js";
	let {
		form,
		submit,
		router
	} = useLogin();
</script>

<style scoped lang="scss">
	.login_phone {
		padding: 140rpx 0;
		box-sizing: border-box;

		.item {
			width: 630rpx;
			height: 110rpx;
			border-radius: 20rpx;
			margin-bottom: 40rpx;
			background: #23262F;
			display: flex;

			.input {
				height: 100%;
				flex: 1;
				color: #FFFFFF;
				font-size: 36rpx;
				padding-left: 42rpx;
				box-sizing: border-box;
			}

			.icon {
				height: 100%;
				padding: 0 32rpx;
				box-sizing: content-box;
				display: flex;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}

		.submit {
			width: 630rpx;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 36rpx;
			border-radius: 20rpx;
			background: #23262F;

			&.active {
				color: #111111;
				font-weight: bold;
				background: linear-gradient(50deg, #5CE5F9, #9785EA);
			}
		}

		.btn_view {
			padding-top: 40rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;

			view {
				color: #999999;
				font-size: 28rpx;
			}
		}
	}
</style>