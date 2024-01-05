<template>
	<view class="news_deta">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">文章详情</view>
			</template>
		</uv-navbar>
		<view class="parse_view">
			<uv-parse :preview-img="false" :content="content"></uv-parse>
		</view>
	</view>
</template>

<script setup>
	import {
		newsInfo
	} from "@/request/api";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref
	} from "vue";
	const content = ref("");
	onLoad(async ({
		id
	}) => {
		let {
			info
		} = await newsInfo({
			id
		});
		content.value = info?.content;
	});
</script>

<style scoped lang="scss">
	.news_deta {
		min-height: 100vh;
		background: $background;
		overflow: hidden;

		.nav_back {
			width: 40rpx;
			height: 40rpx;
		}

		.nav_title {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
		}

		.parse_view {
			line-height: 48rpx !important;
			color: #999999;
			font-size: 28rpx;
			padding: 30rpx;
			box-sizing: border-box;
		}
	}
</style>