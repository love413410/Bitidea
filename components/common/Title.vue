<template>
	<view class="title">
		<view class="left">
			<slot></slot>
		</view>
		<view class="right" :class="status== 'open'?'open':''" @click="menu_click" v-if="props.right">
			<text v-if="status=='open'">收起</text>
			<text v-else>展开</text>
			<image src="@/static/images/d.png"></image>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const props = defineProps({
		right: Boolean
	});
	const emit = defineEmits(["open", "close"]);
	const status = ref("open");
	const menu_click = () => {
		if (status.value == "open") {
			status.value = "close";
			emit("close");
			return false;
		}
		status.value = "open";
		emit("open");
	};
</script>

<style scoped lang="scss">
	.title {
		height: $titleHeight;
		padding: 50rpx 0 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;

		.left {
			color: #EEEEEE;
			font-size: 32rpx;
			font-weight: bold;
			background: linear-gradient(-50deg, #5CE5F9 0%, #9785EA 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.right {
			width: 120rpx;
			height: 44rpx;
			border-radius: 22rpx;
			border: 1px solid #47474A;
			box-sizing: border-box;
			background: #242428;
			display: flex;
			justify-content: center;
			align-items: center;

			&.open {
				image {
					transform: rotate(180deg);
				}
			}

			text {
				color: #666666;
				font-size: 24rpx;
				font-weight: 400;
				padding-right: 12rpx;
				box-sizing: border-box;
			}

			image {
				width: 24rpx;
				height: 24rpx;

			}
		}
	}
</style>