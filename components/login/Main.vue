<template>
	<view class="main">
		<view class="item">
			<view class="key">手机号</view>
			<input type="text" placeholder="请输入手机号" v-model="form.phone" class="input">
		</view>
		<view class="item">
			<input type="text" placeholder="请输入验证码" v-model="form.code" class="input">
			<view class="code" v-if="isTimer">{{time}}s</view>
			<view class="code active" v-else @click="getCode(form.phone,'register')">发送</view>
		</view>
		<view class="item">
			<view class="key">密码</view>
			<input type="password" placeholder="请输入密码" v-model="form.password" class="input">
		</view>
		<view class="item">
			<view class="key">确认密码</view>
			<input type="password" placeholder="再次输入密码" v-model="form.confirm_password" class="input">
		</view>
		<view class="item">
			<view class="key">邀请码</view>
			<input type="text" placeholder="再次输入密码" v-model="form.invitation_code" class="input">
		</view>
		<view class="submit" @click="submit">注册</view>
	</view>
</template>

<script setup>
	import {
		register
	} from "@/request/api";

	import {
		ref,
		reactive
	} from "vue";

	import useStore from "@/stores/index.js";
	const {
		useLoginStore
	} = useStore();

	import useEditUser from "@/hooks/useEditUser.js";
	import useLogin from "@/hooks/useLogin.js";
	const {
		timer,
		time,
		isTimer,
		getCode
	} = useEditUser();
	let {
		checkbox
	} = useLogin();

	const form = reactive({
		phone: "",
		code: "",
		password: "",
		confirm_password: "",
		invitation_code: uni.getStorageSync('invitation') || ""
	});
	const submit = async () => {
		if (!checkbox.value) {
			uni.$uv.toast("请先阅读《协议》");
			return false;
		}
		let {
			token
		} = await register(form);
		uni.$uv.toast("注册成功");
		uni.navigateBack();
	};
</script>

<style scoped lang="scss">
	.main {
		padding: 40rpx 0;
		box-sizing: border-box;

		.item {
			width: 630rpx;
			height: 110rpx;
			border-radius: 20rpx;
			margin-bottom: 36rpx;
			padding-left: 45rpx;
			box-sizing: border-box;
			background: #23262F;
			display: flex;

			.key {
				width: 190rpx;
				color: #999999;
				font-size: 36rpx;
				display: flex;
				align-items: center;
			}

			.input {
				height: 100%;
				flex: 1;
				color: #FFFFFF;
				font-size: 36rpx;
			}

			.code {
				height: 100%;
				color: #999999;
				font-size: 36rpx;
				padding: 0 50rpx;
				box-sizing: content-box;

				display: flex;
				align-items: center;

				&.active {
					background: linear-gradient(50deg, #5CE5F9 0%, #9785EA 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
				}
			}
		}

		.submit {
			width: 630rpx;
			height: 110rpx;
			line-height: 110rpx;
			text-align: center;
			color: #111111;
			font-size: 36rpx;
			font-weight: bold;
			border-radius: 20rpx;
			background: linear-gradient(50deg, #5CE5F9, #9785EA);
		}
	}
</style>