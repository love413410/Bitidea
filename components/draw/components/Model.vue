<template>
	<view class="model">
		<Title>模型选择</Title>
		<view class="list">
			<view class="item" :class="item.key==active?'active':''" v-for="(item,index) in list"
				@click="change(item.key)">
				<view class="label">推荐</view>
				<image src="@/static/images/h1.png" class="cover" v-if="index%2==0"></image>
				<image src="@/static/images/h2.png" class="cover" v-else></image>
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
</script>

<style scoped lang="scss">
	.model {
		.list {
			display: flex;
			flex-wrap: wrap;

			.item {
				width: 200rpx;
				height: 200rpx;
				border-radius: 16rpx;
				margin-bottom: 45rpx;
				margin-right: 45rpx;
				padding: 2rpx;
				box-sizing: border-box;
				background: #1E1E22;
				overflow: hidden;
				position: relative;

				&:nth-child(3n) {
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

				.label {
					min-width: 72rpx;
					min-height: 32rpx;
					color: #111111;
					font-size: 20rpx;
					font-weight: 400;
					padding: 6rpx 16rpx;
					box-sizing: border-box;
					background: linear-gradient(-50deg, #5CE5F9, #9785EA);
					position: absolute;
					left: 0;
					top: 0;
					z-index: 2;
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