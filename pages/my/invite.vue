<template>
	<view class="invite">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">邀请海报</view>
			</template>
		</uv-navbar>
		<view class="invite_image">
			<view class="poster">
				<l-painter :board="poster" ref="painter" />
			</view>
		</view>
		<view class="submit">
			<view @click="submit">立即邀请</view>
		</view>
		<view class="title">邀请说明</view>
		<view class="parse_view">
			<uv-parse :preview-img="false" :content="content"></uv-parse>
		</view>
	</view>
</template>

<script setup>
	const VITE_H5_URL = import.meta.env.VITE_H5_URL;
	import {
		userInfo
	} from "@/request/api";
	import useBase from "@/hooks/useBase.js";
	const {
		preview_image
	} = useBase();
	import {
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref,
		shallowRef
	} from "vue";
	const poster = ref({});

	const share_poster = ref("");
	const content = ref("");

	const code_url = ref(VITE_H5_URL);
	const getUserInfo = async () => {
		let {
			setting,
			user
		} = await userInfo();
		let share_poster = setting.share_poster;
		let invitation_code = user.invitation_code;
		let qrcode_url = `${code_url.value}#/?invitation=${invitation_code}`;
		let views = [{
			css: {
				width: "100%",
				height: "1000rpx"
			},
			type: "image",
			// src: "http://img.bitidea.cn/20231205031146.jpeg" 本地环境需要http https会报错
			src: share_poster
		}, {
			text: qrcode_url,
			type: "qrcode",
			css: {
				width: "160rpx",
				height: "160rpx",
				color: "#FFF",
				position: "absolute",
				right: "50rpx",
				bottom: "50rpx",
			}
		}]
		poster.value = {
			views
		};
		content.value = setting.share_explain;
	};
	const painter = shallowRef();
	const submit = () => {
		painter.value.canvasToTempFilePathSync({
			fileType: "jpg",
			quality: 1,
			success: (res) => {
				let url = res.tempFilePath;
				preview_image(url)
			}
		})
	};
	onShow(() => getUserInfo());
</script>

<style scoped lang="scss">
	.invite {
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

		.invite_image {
			width: 100%;
			height: 1000rpx;
			padding: 0 75rpx;
			box-sizing: border-box;

			.poster {
				width: 100%;
				height: 100%;
				position: relative;

				image {
					width: 100%;
					height: 100%;
				}

				.code {
					width: 160rpx;
					height: 160rpx;
					border-radius: 5rpx;
					background: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
					position: absolute;
					right: 50rpx;
					bottom: 50rpx;
					z-index: 2;
				}
			}
		}


		.submit {
			width: 100%;
			padding: 60rpx 30rpx;
			box-sizing: border-box;

			view {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				color: #111111;
				font-size: 32rpx;
				font-weight: bold;
				border-radius: 20rpx;
				background: linear-gradient(50deg, #5CE5F9, #9785EA);
			}
		}

		.title {
			text-align: center;
			color: #171F48;
			font-size: 36rpx;
			font-weight: bold;
			padding-bottom: 36rpx;
			box-sizing: border-box;
			background: linear-gradient(50deg, #5CE5F9 0%, #9785EA 100%);
			-webkit-background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		.parse_view {
			color: #999999;
			font-size: 24rpx;
			padding: 30rpx;
			box-sizing: border-box;
		}
	}
</style>