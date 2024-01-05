<template>
	<view class="promotion">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">分销推广</view>
			</template>
		</uv-navbar>
		<scroll-view scroll-y class="scroll_view">
			<view class="user_info">
				<image :src="user_info.head_portrait" class="avatar"></image>
				<view class="user_view">
					<view class="name">{{user_info.nickname}}</view>
					<view class="time" v-if="user_info.distribution">我的身份：{{user_info.distribution.name}}</view>
				</view>
			</view>
			<view class="banner">
				<!-- <view class="my" @click="is_open=!is_open"> -->
				<view class="my" @click="open">
					<text>我的收益</text>
					<view>
						<image src="@/static/images/y2.png" v-if="is_open"></image>
						<image src="@/static/images/y1.png" v-else></image>
					</view>
				</view>
				<view class="cell">
					<view class="item">
						<view class="key">可提现收入(元）</view>
						<view class="value">{{user_account.balance}}</view>
					</view>
					<view class="item">
						<view class="key">今日收益(元）</view>
						<view class="value">{{user_account.income_today}}</view>
					</view>
					<view class="item">
						<view class="key">累计收益(元）</view>
						<view class="value">{{user_account.income}}</view>
					</view>
				</view>
			</view>
			<Title>分销推广</Title>
			<view class="list">
				<!-- <view class="item gold" :class="type=='gold'?'active':''" v-for="(item) in list" @click="type='gold'"> -->
				<view class="item gold" :class="id==item.id?'active':''" v-for="(item) in list" @click="id= item.id">
					<view class="title">{{item.name}}</view>
					<view class="now_price">
						<view class="key">￥</view>
						<view class="value">{{item.price}}</view>
					</view>
					<view class="before_price">￥{{item.original_price}}</view>
					<view class="tips">
						{{item.synopsis}}
						<!-- <view>一键分享，直接用户充值即获充值金额50%收益，间接户即获充值金额30%收益</view>
						<view>邀请用户加入分销即获该交易全额邀请奖励</view>
						<view>赠送月卡VIP*10</view> -->
					</view>
				</view>
				<!-- <view class="item silver" :class="type=='silver'?'active':''" @click="type='silver'">
					<view class="title">银牌分销</view>
					<view class="now_price">
						<view class="key">￥</view>
						<view class="value">19.8</view>
					</view>
					<view class="before_price">￥149</view>
					<view class="tips">
						<view>一键分享，用户充值即获充值金额20%收益</view>
						<view>邀请用户加入分销即获该笔交易全额邀请奖励</view>
						<view>赠送月卡VIP*2</view>
					</view>
				</view> -->
			</view>
			<view class="submit" @click="submit(3,id)">加入分销</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		userDistribution,
		userOrderPlace
	} from "@/request/api";
	import Title from "@/components/common/Title.vue";
	import {
		ref
	} from "vue";
	import useMy from "@/hooks/useMy.js";
	const {
		user_info,
		submit
	} = useMy();
	const is_open = ref(false);

	const account = {
		balance: "***",
		income_today: "***",
		income: "***"
	};
	let user_income = {
		balance: 0,
		income_today: 0,
		income: 0
	};
	const user_account = ref(account);

	const id = ref("");
	const list = ref([]);
	const getList = async () => {
		let {
			distribution,
			user,
			income_today,
			income
		} = await userDistribution();
		user_info.value = user;
		user_income = {
			balance: user.balance,
			income_today,
			income
		};
		list.value = distribution;
		if (!distribution.length) return;
		id.value = distribution[0].id;
	};
	getList();

	const open = () => {
		user_account.value = is_open.value ? account : user_income;
		is_open.value = !is_open.value;
	};
</script>

<style scoped lang="scss">
	.promotion {
		height: 100vh;
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

		.scroll_view {
			height: calc(100vh - 44px);
			padding: 30rpx;
			box-sizing: border-box;

			.user_info {
				width: 100%;
				height: 150rpx;
				padding: 35rpx;
				box-sizing: border-box;
				background: url(@/static/images/bg4.png) no-repeat;
				background-size: 100% 100%;
				display: flex;

				.avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
				}

				.user_view {
					flex: 1;
					padding-left: 20rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						line-height: 1;
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
					}

					.time {
						line-height: 1;
						color: #999999;
						font-size: 24rpx;
					}
				}
			}

			.banner {
				width: 100%;
				height: 210rpx;
				border-radius: 20rpx;
				margin-top: 40rpx;
				padding: 30rpx;
				box-sizing: border-box;
				background: #232327;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.my {
					display: flex;
					align-items: center;

					text {
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: bold;
						padding-right: 20rpx;
						box-sizing: border-box;
					}

					view {
						width: 30rpx;
						height: 30rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.cell {
					display: flex;
					justify-content: space-between;

					.item {
						.key {
							line-height: 1;
							color: #999999;
							font-size: 24rpx;
							padding-bottom: 26rpx;
							box-sizing: border-box;
						}

						.value {
							line-height: 1;
							color: #FFFFFF;
							font-size: 28rpx;
							font-weight: bold;
						}
					}
				}
			}

			.list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					width: 335rpx;
					height: 465rpx;
					padding: 50rpx 26rpx 36rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;

					.title {
						line-height: 1;
						color: #222222;
						font-size: 36rpx;
						font-weight: bold;
					}

					.now_price {
						display: flex;
						align-items: center;

						.key {
							color: #222222;
							font-size: 28rpx;
							font-weight: bold;
						}

						.value {
							color: #222222;
							font-size: 40rpx;
							font-weight: bold;
						}
					}

					.before_price {
						color: #666666;
						font-size: 28rpx;
						text-decoration: line-through;
					}

					.tips {
						text-align: center;
						line-height: 28rpx;
						color: #333333;
						font-size: 20rpx;
						font-weight: 400;
						// view {
						// 	text-align: center;
						// 	line-height: 28rpx;
						// 	color: #333333;
						// 	font-size: 20rpx;
						// 	font-weight: 400;

						// 	&:nth-child(2) {
						// 		margin: 20rpx 0;
						// 	}
						// }
					}

					&.gold {
						background: url(@/static/images/gold1.png) no-repeat;
						background-size: 100% 100%;

						&.active {
							background: url(@/static/images/gold2.png) no-repeat;
							background-size: 100% 100%;
							position: relative;

							&::after {
								width: 100%;
								height: 100%;
								content: "";
								background: url(@/static/images/xzk7.png) no-repeat;
								background-size: 100% 100%;
								position: absolute;
								left: 0;
								top: 0;
								z-index: 2;
							}
						}
					}

					&.silver {
						background: url(@/static/images/silver1.png) no-repeat;
						background-size: 100% 100%;

						&.active {
							background: url(@/static/images/silver2.png) no-repeat;
							background-size: 100% 100%;
							position: relative;

							&::after {
								width: 100%;
								height: 100%;
								content: "";
								background: url(@/static/images/xzk7.png) no-repeat;
								background-size: 100% 100%;
								position: absolute;
								left: 0;
								top: 0;
								z-index: 2;
							}
						}
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
	}
</style>