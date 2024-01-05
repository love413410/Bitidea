<template>
	<view class="image_size">
		<Title>图片尺寸</Title>
		<view class="list">
			<view class="item" :class="index==active?'active':''" v-for="(item,index) in list" @click="change(index)">
				<!-- <view :style="item.style"></view> -->
				<view></view>
				<text>{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		ref
	} from "vue";
	const props = defineProps({
		list: [Object, Array],
		active: [String, Number]
	});
	const emit = defineEmits(["update:active"]);

	const list = props.list;
	const active = ref(props.active);
	const change = (value) => {
		active.value = value;
		emit("update:active", value)
	};
	// const list = ref(
	// 	[{
	// 		text: "1:1",
	// 		style: {
	// 			width: '40rpx',
	// 			height: '40rpx'
	// 		}
	// 	}, {
	// 		text: "4:3",
	// 		style: {
	// 			width: '40rpx',
	// 			height: '30rpx'
	// 		}
	// 	}, {
	// 		text: "3:4",
	// 		style: {
	// 			width: '30rpx',
	// 			height: '40rpx'
	// 		}
	// 	}, {
	// 		text: "16:9",
	// 		style: {
	// 			width: '40rpx',
	// 			height: '22rpx'
	// 		}
	// 	}, {
	// 		text: "9:16",
	// 		style: {
	// 			width: '22rpx',
	// 			height: '40rpx'
	// 		}
	// 	}])
</script>

<style scoped lang="scss">
	.image_size {
		.list {
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 160rpx;
				height: 72rpx;

				border-radius: 10rpx;
				margin-bottom: 16rpx;
				margin-right: 16rpx;
				padding: 3rpx 33rpx;
				box-sizing: border-box;
				background: #1E1E22;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&:nth-child(4n) {
					margin-right: 0;
				}

				&>view {
					width: 40rpx;
					height: 40rpx;
					background: #2B2B2F;
				}

				text {
					color: #666666;
					font-size: 24rpx;
					font-weight: 400;
				}

				&.active {
					color: #EEEEEE;
					font-weight: 500;
					background: linear-gradient(-50deg, #5CE5F9 0%, #9785EA 100%);
					-webkit-background-clip: text;
					-webkit-text-fill-color: transparent;
					position: relative;

					&::after {
						content: "";
						width: 100%;
						height: 100%;
						background: url(@/static/images/xzk2.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 2;
					}
				}
			}
		}
	}
</style>