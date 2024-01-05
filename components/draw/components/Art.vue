<template>
	<view class="art">
		<Title right @open="open" @close="close">艺术风格</Title>
		<view class="list" :style="{height:`${height}rpx`}">
			<view class="item" :class="item.id==active?'active':''" v-for="(item,index) in list"
				@click="change(item.id)">
				<image :src="item.logo" class="cover"></image>
				<view class="footer">{{item.name}}</view>
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

	const get_height = () => {
		let size = list.length;
		let height = Math.ceil(size / 4) * (160 + 16);
		return height;
	};
	const value = get_height();
	const height = ref(value);

	const open = () => height.value = get_height();
	const close = () => height.value = 0;
</script>

<style scoped lang="scss">
	.art {
		.list {
			transition: height 1s;
			overflow: hidden;
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 160rpx;
				height: 160rpx;
				border-radius: 16rpx;
				margin-bottom: 16rpx;
				margin-right: 16rpx;
				padding: 2rpx;
				box-sizing: border-box;
				background: #1E1E22;
				overflow: hidden;
				position: relative;

				&:nth-child(4n) {
					margin-right: 0;
				}

				&.active {
					position: relative;

					&::after {
						content: "";
						width: 100%;
						height: 100%;
						background: url(@/static/images/xzk.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 2;
					}
				}

				.cover {
					width: 100%;
					height: 100%;
				}

				.footer {
					width: 100%;
					height: 50rpx;
					line-height: 50rpx;
					text-align: center;
					color: #EEEEEE;
					font-size: 24rpx;
					font-weight: 400;
					border-radius: 0 0 16rpx 16rpx;
					background: rgba(0, 0, 0, 0.7);
					position: absolute;
					left: 0rpx;
					bottom: 0rpx;
					z-index: 2;
				}
			}
		}
	}
</style>