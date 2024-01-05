<template>
	<view class="header">
		<view class="name">{{props.title}}</view>
		<view class="desc">更多精彩玩法等你来~</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		title: String
	});
</script>

<style scoped lang="scss">
	.header {
		.name {
			color: #EEEEEE;
			font-size: 62rpx;
			font-weight: bold;
		}

		.desc {
			color: #EEEEEE;
			font-size: 32rpx;
			margin-top: 36rpx;
		}
	}
</style>