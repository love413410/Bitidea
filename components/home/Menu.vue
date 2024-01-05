<template>
	<uv-overlay :show="show" @click="show = false">
		<view class="menu">
			<view class="menu_box">
				<view class="logo">
					<image src="@/static/images/logo.png"></image>
					<text>Bitidea</text>
				</view>
				<view class="list">
					<view class="item">
						<text>PC端网址</text>
						<uv-icon name="arrow-right" color="#4D515A" size="10"></uv-icon>
					</view>
					<view class="item">
						<text>机器人训练</text>
						<uv-icon name="arrow-right" color="#4D515A" size="10"></uv-icon>
					</view>
					<view class="item">
						<text>应用</text>
						<uv-icon name="arrow-right" color="#4D515A" size="10"></uv-icon>
					</view>
					<view class="item">
						<text>关注公众号</text>
						<uv-icon name="arrow-right" color="#4D515A" size="10"></uv-icon>
					</view>
				</view>
				<view class="triangle"></view>
			</view>
		</view>
	</uv-overlay>
</template>

<script setup>
	import {
		ref
	} from "vue";
	const show = ref(false);
	defineExpose({
		show
	})
</script>

<style scoped lang="scss">
	.menu {
		position: absolute;
		left: 20rpx;
		top: 54px;

		.menu_box {
			width: 284rpx;
			padding: 0 30rpx;
			box-sizing: border-box;
			background: #232327;
			position: relative;

			.logo {
				height: 100rpx;
				display: flex;
				align-items: center;

				image {
					width: 42rpx;
					height: 38rpx;
				}

				text {
					color: #FFFFFF;
					font-size: 28rpx;
					padding-left: 20rpx;
					box-sizing: border-box;
				}
			}

			.list {
				.item {
					height: 72rpx;
					border-top: 1px solid #393940;
					display: flex;
					justify-content: space-between;
					align-items: center;

					&:first-child {
						border: none;
					}

					text {
						color: #999999;
						font-size: 28rpx;
					}
				}
			}

			.triangle {
				width: 28rpx;
				height: 28rpx;
				background: #232327;
				transform: rotate(45deg);
				position: absolute;
				left: 16rpx;
				top: -14rpx;
			}
		}
	}
</style>