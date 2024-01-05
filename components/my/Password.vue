<template>
	<view class="password">
		<view class="close" @click="$emit('close')">
			<image src="@/static/images/close.png"></image>
		</view>
		<view class="title">修改密码</view>
		<view class="content">
			<view class="item">
				<view class="key">新密码</view>
				<input type="password" placeholder="输入新密码" v-model="form.password" class="input">
			</view>
			<view class="item">
				<view class="key">确认密码</view>
				<input type="password" placeholder="请确认密码" v-model="form.confirm_password" class="input">
			</view>
		</view>
		<view class="btn" @click="sub_click">确定</view>
	</view>
</template>

<script setup>
	import {
		userEditPassword
	} from "@/request/api";
	import {
		reactive
	} from "vue";

	const form = reactive({
		password: "",
		confirm_password: ""
	});
	const emit = defineEmits(['close']);

	const sub_click = async () => {
		if (form.password != form.confirm_password) {
			uni.$uv.toast("两次输入不一致");
			return false;
		};
		await userEditPassword(form);
		uni.$uv.toast("操作成功");
		emit('close');
	};
</script>

<style scoped lang="scss">
	.password {
		width: 600rpx;
		height: 527rpx;
		border-radius: 20rpx;
		padding: 50rpx 100rpx 40rpx;
		box-sizing: border-box;
		background: #232327;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		position: relative;

		.close {
			width: 32rpx;
			height: 32rpx;
			position: absolute;
			right: 20rpx;
			top: 20rpx;
			z-index: 2;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.title {
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
		}

		.content {
			.item {
				.key {
					height: 64rpx;
					line-height: 64rpx;
					color: #999999;
					font-size: 28rpx;
					font-weight: 400;
				}

				.input {
					width: 400rpx;
					height: 68rpx;
					text-align: center;
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: 400;
					border-radius: 5rpx;
					background: #1E1E22;
				}
			}
		}

		.btn {
			width: 240rpx;
			height: 68rpx;
			line-height: 68rpx;
			text-align: center;
			color: #111111;
			font-size: 28rpx;
			font-weight: bold;
			background: linear-gradient(50deg, #5CE5F9, #9785EA);
			border-radius: 20rpx;
		}
	}
</style>