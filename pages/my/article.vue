<template>
	<view class="article">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">{{title}}</view>
			</template>
		</uv-navbar>
		<view class="parse_view">
			<uv-parse :preview-img="false" :content="content"></uv-parse>
		</view>
	</view>
</template>

<script setup>
	import {
		setting
	} from "@/request/api"
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	const title = ref("");
	const content = ref("");

	const obj = {
		agreement: "用户协议",
		privacy: "隐私协议",
		legal: "法律声明",
		about: "关于我们",
	};

	onLoad(async ({
		key
	}) => {
		let res = await setting({
			key
		});
		content.value = res?.setting?.content;
		title.value = obj[key];
	});
</script>

<style scoped lang="scss">
	.article {
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