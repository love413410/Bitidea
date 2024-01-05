<template>
	<view class="recharge_integral">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">我的积分</view>
			</template>
		</uv-navbar>
		<view class="banner">
			<view class="banner_view">
				<view class="item">
					<image src="@/static/images/jf.png" class="left_img"></image>
					<text class="current">当前积分</text>
				</view>
				<view class="item" @click="router('/pages/my/integral_log')">
					<text class="deta">明细</text>
					<image src="@/static/images/r2.png" class="right_img"></image>
				</view>
			</view>
			<view class="number">{{user_info.integral}}</view>
		</view>
		<Title>积分套餐</Title>
		<view class="list">
			<view class="item" :class="id==item.id?'active':''" v-for="item in list" @click="id= item.id">
				<view class="number">
					<image src="@/static/images/jf.png"></image>
					<view class="value">{{item.integral}}</view>
				</view>
				<view class="price">
					<view class="now_price">
						<view class="key">￥</view>
						<view class="value">{{item.price}}</view>
					</view>
					<view class="before_price">￥{{item.original_price}}</view>
				</view>
				<view class="other">
					<view>{{item.synopsis}}</view>
					<!-- <view>一经充值不可退款</view> -->
				</view>
			</view>
		</view>
		<view class="submit" @click="submit(2,id)">立即开通</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		userIntegral
	} from "@/request/api";
	import {
		ref
	} from "vue";

	import useMy from "@/hooks/useMy.js";
	import useBase from "@/hooks/useBase.js";
	const {
		user_info,
		submit
	} = useMy();
	const {
		router
	} = useBase();

	const id = ref("");
	const list = ref([]);
	const getList = async () => {
		let {
			user,
			package_integral
		} = await userIntegral();
		user_info.value = user;
		list.value = package_integral;
		if (!package_integral.length) return;
		id.value = package_integral[0].id;
	};
	getList();
</script>

<style scoped lang="scss">
	.recharge_integral {
		min-height: 100vh;
		padding: 30rpx;
		box-sizing: border-box;
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

		.banner {
			width: 100%;
			height: 150rpx;
			padding: 20rpx 28rpx 26rpx 20rpx;
			box-sizing: border-box;
			background: url(@/static/images/bg6.png) no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.banner_view {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item {
					display: flex;
					align-items: center;

					.left_img {
						width: 44rpx;
						height: 44rpx;
					}

					.right_img {
						width: 24rpx;
						height: 24rpx;
					}

					.current {
						color: #FFFFFF;
						font-size: 32rpx;
						padding-left: 22rpx;
						box-sizing: border-box;
					}

					.deta {
						color: #999999;
						font-size: 24rpx;
					}
				}
			}

			.number {
				line-height: 1;
				color: #FFFFFF;
				font-size: 50rpx;
			}
		}

		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				width: 335rpx;
				height: 285rpx;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				padding: 40rpx 0 30rpx;
				box-sizing: border-box;
				background: #232327;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;

				&.active {
					position: relative;

					&::after {
						width: 100%;
						height: 100%;
						content: "";
						background: url(@/static/images/xzk6.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 0;
						top: 0;
						z-index: 2;
					}
				}

				.number {
					display: flex;
					align-items: center;

					image {
						width: 44rpx;
						height: 44rpx;
					}

					.value {
						color: #FFFFFF;
						font-size: 50rpx;
						font-weight: bold;
						padding-left: 16rpx;
						box-sizing: border-box;
					}
				}

				.price {
					display: flex;
					align-items: center;

					.now_price {
						display: flex;
						align-items: center;

						.key {
							color: #FFFFFF;
							font-size: 28rpx;
							font-weight: bold;
						}

						.value {
							color: #FFFFFF;
							font-size: 40rpx;
							font-weight: bold;
						}
					}

					.before_price {
						color: #666666;
						font-size: 28rpx;
						text-decoration: line-through;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}

				.other {
					text-align: center;
					line-height: 28rpx;
					color: #999999;
					font-size: 20rpx;
					font-weight: 400;
				}
			}
		}

		.submit {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			color: #111111;
			font-size: 32rpx;
			font-weight: bold;
			border-radius: 20rpx;
			margin-top: 80rpx;
			background: linear-gradient(50deg, #5CE5F9, #9785EA);
		}
	}
</style>