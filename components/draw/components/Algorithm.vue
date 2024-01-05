<template>
	<view class="algorithm">
		<Title>算法(模型版本）</Title>
		<view class="list">
			<view class="item" v-for="item in list">{{item}}</view>
		</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		ref
	} from "vue";
	const list = ref(["V5"]);
</script>

<style scoped lang="scss">
	.algorithm {
		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				width: 335rpx;
				height: 72rpx;
				color: #EEEEEE;
				font-size: 24rpx;
				font-weight: 400;
				margin-bottom: 16rpx;
				background: url(@/static/images/xzk4.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>