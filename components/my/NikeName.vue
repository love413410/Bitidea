<template>
	<view class="nike_name">
		<view class="close" @click="$emit('close')">
			<image src="@/static/images/close.png"></image>
		</view>
		<view class="title">修改昵称</view>
		<input type="text" placeholder="输入昵称" v-model="form.nickname" class="input">
		<view class="btn" @click="submit(emit,form)">确定</view>
	</view>
</template>

<script setup>
	import {
		reactive
	} from "vue";
	import useEditUser from "@/hooks/useEditUser.js";
	const props = defineProps({
		user_info: Object
	});
	const form = reactive({
		nickname: props.user_info.nickname
	});
	const emit = defineEmits(['close']);
	const {
		submit
	} = useEditUser(emit);
</script>

<style scoped lang="scss">
	.nike_name {
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