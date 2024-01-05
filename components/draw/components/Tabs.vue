<template>
	<view class="tabs">
		<view class="item" :class="index==active?'active':''" v-for="(item,index) in list" @click="change(index)">
			{{item}}
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		watch
	} from "vue";
	const props = defineProps({
		list: Object,
		active: [Number, String]
	});
	const emit = defineEmits(["change"]);

	const list = ref();
	const active = ref();
	watch(() => props.list, (n) => list.value = n);
	watch(() => props.active, (n) => active.value = n);
	const change = (value) => emit('change', value);
</script>

<style scoped lang="scss">
	.tabs {
		padding: 40rpx 0;
		box-sizing: content-box;
		display: flex;
		justify-content: space-between;

		.item {
			width: 200rpx;
			height: 88rpx;
			color: #999999;
			font-size: 32rpx;
			font-weight: bold;
			border-radius: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			&.active {
				color: #FFFFFF;
				font-size: 32rpx;
				font-weight: bold;
				background: url(@/static/images/xzk3.png) no-repeat;
				background-size: 100% 100%;
			}
		}
	}
</style>