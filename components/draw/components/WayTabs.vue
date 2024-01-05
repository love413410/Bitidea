<template>
	<view class="tabs_two">
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
		active: [Number, String],
	});
	const emit = defineEmits(["change"]);

	const list = ref();
	const active = ref();
	watch(() => props.list, (n) => list.value = n);
	watch(() => props.active, (n) => active.value = n);
	const change = (value) => emit('change', value);
</script>

<style scoped lang="scss">
	.tabs_two {
		height: 72rpx;
		overflow: hidden;
		display: flex;

		.item {
			flex: 1;
			color: #999999;
			font-size: 28rpx;
			border-radius: 20rpx;
			background: #0D0D0D;
			display: flex;
			justify-content: center;
			align-items: center;

			&.active {
				color: #111111;
				background: linear-gradient(-50deg, #58DBEF, #9785EA);
			}
		}
	}
</style>