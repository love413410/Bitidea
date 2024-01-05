<template>
	<view class="popup">
		<view class="close" @click="$emit('close')">
			<image src="@/static/images/close.png"></image>
		</view>
		<view class="title">提示</view>
		<view class="desc">
			<view>该绘画功能所需专业度较高，</view>
			<view>可在助手中选择提示词工具获得协助</view>
		</view>
		<view class="btn" @click="submit()">确定</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const emit = defineEmits(['close']);
	const submit = async () => {
		emit('close');
	};
</script>

<style scoped lang="scss">
	.popup {
		width: 520rpx;
		height: 320rpx;
		border-radius: 20rpx;
		padding: 50rpx 40rpx 30rpx;
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

		.desc {
			view {
				text-align: center;
				line-height: 36rpx;
				width: 400rpx;
				color: #fff;
				font-size: 24rpx;
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