<template>
	<view class="scene">
		<Title right @open="open" @close="close">场景修饰</Title>
		<view class="list" :style="{height:`${height}rpx`}">
			<view class="item" :class="item.key==active?'active':''" v-for="(item,index) in list"
				@click="change(item.key)">
				{{item.name}}
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

	const list = ref([]);
	const getList = (data) => {
		let temp = [];
		for (let key in data) {
			temp.push({
				key: key,
				name: data[key]
			});
		};
		list.value = temp;
	};
	getList(props.list);

	const active = ref(props.active);
	const change = (value) => {
		active.value = value;
		emit("update:active", value)
	};

	const get_height = () => {
		let size = list.value.length;
		let height = Math.ceil(size / 4) * (72 + 16);
		return height;
	};
	const value = get_height();
	const height = ref(value);

	const open = () => height.value = get_height();
	const close = () => height.value = 0;
</script>

<style scoped lang="scss">
	.scene {
		.list {
			transition: height 1s;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 160rpx;
				height: 72rpx;

				color: #666666;
				font-size: 24rpx;
				font-weight: 400;

				border-radius: 10rpx;
				margin-bottom: 16rpx;
				margin-right: 16rpx;
				padding: 3rpx;
				box-sizing: border-box;
				background: #1E1E22;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;

				&:nth-child(4n) {
					margin-right: 0;
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