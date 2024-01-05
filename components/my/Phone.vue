<template>
	<view class="phone">
		<view class="close" @click="$emit('close')">
			<image src="@/static/images/close.png"></image>
		</view>
		<view class="title">修改手机号</view>
		<input type="text" placeholder="输入手机号" v-model="form.phone" class="input">
		<view class="get_code">
			<input type="text" placeholder="请输入验证码" v-model="form.code" class="input">
			<view class="code" v-if="isTimer">{{time}}s</view>
			<view class="code active" v-else @click="getCode(form.phone,'bind')">发送</view>
		</view>
		<view class="btn" @click="submit(emit,form)">确定</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue";
	import useEditUser from "@/hooks/useEditUser.js";
	const emit = defineEmits(['close']);
	const {
		timer,
		time,
		isTimer,
		getCode,
		submit
	} = useEditUser();
	const props = defineProps({
		user_info: Object
	});
	const form = reactive({
		phone: props.user_info.phone,
		code: ""
	});
</script>

<style scoped lang="scss">
	.phone {
		width: 600rpx;
		height: 507rpx;
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

		.get_code {
			width: 400rpx;
			height: 68rpx;
			border-radius: 5rpx;
			box-sizing: border-box;
			background: #23262F;
			overflow: hidden;
			display: flex;

			.input {
				height: 100%;
				flex: 1;
				font-size: 28rpx;
				font-weight: 400;
			}

			.code {
				height: 100%;
				color: #fff;
				font-size: 28rpx;
				font-weight: 400;
				padding: 0 20rpx;
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