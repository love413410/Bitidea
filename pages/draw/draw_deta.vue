<template>
	<view class="draw_deta">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">Bitidea</view>
			</template>
		</uv-navbar>
		<uv-image :src="cover" mode="widthFix" width="100vw">
			<template v-slot:error>
				<view style="font-size: 24rpx;">加载失败</view>
			</template>
		</uv-image>
		<view class="content">
			<view class="list" @click="preview_image(list)">
				<view class="item" v-for="item in list">
					<image :src="item"></image>
				</view>
				<!-- <view class="item" v-for="item in 4">
					<image src="@/static/test/4.png"></image>
				</view> -->
			</view>
			<Title>生成描述词</Title>
			<view class="desc" v-if="prompt">{{prompt}}</view>
		</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		drawInfo
	} from "@/request/api";

	import useBase from "@/hooks/useBase.js";
	const {
		preview_image
	} = useBase();

	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref
	} from "vue";

	let cover = ref(""),
		list = ref(""),
		prompt = ref("");
		
	onLoad(async ({
		id
	}) => {
		let {
			draw
		} = await drawInfo({
			id
		});
		cover.value = draw.result;
		list.value = draw.imgs;
		prompt.value = draw.prompt;
	});
</script>

<style scoped lang="scss">
	.draw_deta {
		min-height: 100vh;
		background: $background;

		.nav_back {
			width: 40rpx;
			height: 40rpx;
		}

		.nav_title {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
		}

		.cover {
			width: 100%;
		}

		.content {
			padding: 40rpx 30rpx 0;
			box-sizing: border-box;

			.list {
				display: flex;
				justify-content: space-between;

				.item {
					width: 160rpx;
					height: 160rpx;
					border-radius: 20rpx;
					background: #232327;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.desc {
				// min-height: 240rpx;
				line-height: 36rpx;
				color: #999999;
				font-size: 24rpx;
				font-weight: 400;
				border-radius: 20rpx;
				padding: 30rpx 60rpx 30rpx 30rpx;
				box-sizing: border-box;
				background: #232327;
			}
		}
	}
</style>