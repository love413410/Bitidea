<template>
	<view class="mask">
		<uv-loading-icon size="50rpx" color="#fff"></uv-loading-icon>
		<view class="desc">
			<view>绘画任务已提交</view>
			<view>请稍后在 “绘画记录”中查看画作</view>
			<view>也可点击左上角前往绘图广场获取更多创意灵感</view>
		</view>
	</view>
</template>

<style scoped lang="scss">
	.mask {
		width: 600rpx;
		height: 507rpx;
		border-radius: 20rpx;
		padding: 50rpx 100rpx 40rpx;
		box-sizing: border-box;
		align-items: center;
		position: relative;

		.desc {
			margin-top: 40rpx;

			view {
				text-align: center;
				line-height: 36rpx;
				width: 400rpx;
				color: #fff;
				font-size: 24rpx;
			}
		}
	}
</style>