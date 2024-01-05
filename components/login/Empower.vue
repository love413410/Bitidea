<template>
	<view class="empower">
		<view class="close" @click="$emit('close')">
			<image src="@/static/images/close.png"></image>
		</view>
		<view class="title">是否授权绑定微信</view>
		<view class="btn" @click="submit">确定</view>
	</view>
</template>

<script setup>
	const wechat = import.meta.env.VITE_WX_URL;
	const emit = defineEmits(['submit']);
	const submit = () => {
		location.href = `${wechat}?from=2`;
	};
</script>

<style scoped lang="scss">
	.empower {
		width: 600rpx;
		height: 306rpx;
		border-radius: 20rpx;
		padding: 50rpx 0rpx;
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