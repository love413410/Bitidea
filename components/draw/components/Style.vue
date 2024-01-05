<template>
	<view class="style">
		<view class="item" @click="model_click">
			<Title>模型选择</Title>
			<view class="item_view">
				<text>{{props.text}}</text>
				<image src="@/static/images/down2.png"></image>
			</view>
		</view>
		<view class="item" @click="style_click">
			<Title>风格选择</Title>
			<view class="item_view">
				<text>{{props.style}}</text>
				<image src="@/static/images/down2.png"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		watch
	} from "vue"
	const props = defineProps({
		text: String,
		style: String
	});
	const emit = defineEmits(["model", "style"]);
	const model_click = () => emit("model");
	const style_click = () => emit("style");
</script>

<style scoped lang="scss">
	.style {
		display: flex;
		justify-content: space-between;

		.item {
			width: 335rpx;

			.item_view {
				height: 72rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: url(@/static/images/xzk4.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					color: #EEEEEE;
					font-size: 24rpx;
					font-weight: 400;
				}

				image {
					width: 24rpx;
					height: 24rpx;
				}
			}
		}
	}
</style>