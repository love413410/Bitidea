<template>
	<view class="exchange">
		<view class="close" @click="$emit('close')">
			<image src="@/static/images/close.png"></image>
		</view>
		<view class="title">兑换码</view>
		<input type="text" placeholder="请输入兑换码" v-model="card_no" class="input">
		<view class="btn" @click="submit()">确定</view>
	</view>
</template>

<script setup>
	import {
		carmiExchange
	} from "@/request/api";
	import {
		ref
	} from "vue";
	const emit = defineEmits(['close']);

	let card_no = ref("");
	const submit = async () => {
		await carmiExchange({
			card_no: card_no.value
		});
		uni.$uv.toast("操作成功");
		setTimeout(() => {
			emit('close');
		}, 1000);
	};
</script>

<style scoped lang="scss">
	.exchange {
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