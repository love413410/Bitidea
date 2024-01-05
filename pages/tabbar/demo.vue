<template>
	<view class="demo">
		<view class="item_head">
			<view class="unit_view">
				<image src="@/static/images/send.png"></image>
				<text class="unit">USDT</text>
			</view>
			<view class="img_view">
				<image src="@/static/images/send.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped lang="scss">
	.item_head {
		padding-bottom: 44rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.unit_view {
			display: flex;
			align-items: center;

			image {
				width: 38rpx;
				height: 38rpx;
			}

			text {
				color: #0D0D0D;
				font-size: 26rpx;
				font-weight: 800;
				padding-left: 16rpx;
				box-sizing: border-box;
			}
		}

		.img_view {
			width: 22rpx;
			height: 6rpx;
			// display: flex;
			// align-items: center;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>