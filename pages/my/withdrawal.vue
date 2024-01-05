<template>
	<view class="withdrawal">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">提现</view>
			</template>
		</uv-navbar>
		<view class="content">
			<view class="user_info">
				<image :src="user_info.head_portrait" class="avatar"></image>
				<view class="user_view">
					<view class="name">{{user_info.nickname}}</view>
					<view class="time" v-if="user_info.distribution">我的身份：{{user_info.distribution.name}}</view>
				</view>
			</view>
			<view class="title">提现申请</view>
			<view class="banner">
				<view class="head_view">
					<view class="key">可提现金额：</view>
					<view class="value">{{user_info.balance}}</view>
				</view>
				<view class="input_view">
					<input type="text" placeholder="请输入提现金额" v-model="money" class="input">
					<view class="btn" @click="money=user_info.balance">全部</view>
				</view>
				<view class="submit" @click="submit">确认提现</view>
			</view>
			<view class="title">操作记录</view>
			<view class="list">
				<view class="head_view">
					<view class="value">金额</view>
					<view class="time">时间</view>
				</view>
				<view class="item" v-for="item in data_list">
					<view class="cell">
						<view class="value">提现金额：{{item.value}}</view>
						<view class="status">已完成</view>
					</view>
					<view class="cell">
						<view class="total">实际到账：{{item.real_value}}</view>
						<view class="time">{{item.created_at}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		withdrawal,
		withdrawalPost
	} from "@/request/api";
	import useMy from "@/hooks/useMy.js";
	const {
		user_info
	} = useMy();

	import {
		ref
	} from "vue";

	const data_list = ref([]);
	const getDeta = async () => {
		let {
			user,
			list
		} = await withdrawal();
		data_list.value = list;
		user_info.value = user;
	};
	getDeta();

	const money = ref("");
	const submit = async () => {
		await withdrawalPost({
			money: money.value
		});
		uni.$uv.toast("操作成功");
		getDeta();
	};
</script>

<style scoped lang="scss">
	.withdrawal {
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

		.content {
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

			.title {
				height: 110rpx;
				line-height: 110rpx;
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: bold;
			}

			.banner {
				height: 420rpx;
				border-radius: 20rpx;
				padding: 50rpx 30rpx 60rpx;
				box-sizing: border-box;
				background: #23262F;

				.head_view {
					display: flex;

					.key {
						color: #EEEEEE;
						font-size: 28rpx;
						font-weight: bold;
					}

					.value {
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: 400;
					}
				}

				.input_view {
					height: 80rpx;
					border-radius: 20rpx;
					margin-top: 30rpx;
					margin-bottom: 74rpx;
					padding: 0 30rpx;
					box-sizing: border-box;
					background: #1E1E22;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.input {
						flex: 1;
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: 400;
					}

					.btn {
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: bold;
						padding-left: 30rpx;
						box-sizing: border-box;
					}
				}

				.submit {
					width: 420rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					color: #111111;
					font-size: 32rpx;
					font-weight: bold;
					border-radius: 20rpx;
					margin: 0 auto;
					background: linear-gradient(-50deg, #5CE5F9, #9785EA);
				}
			}

			.list {
				border-radius: 20rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: #23262F;

				.head_view {
					height: 70rpx;
					color: #A09F9F;
					font-size: 24rpx;
					font-weight: 400;
					display: flex;
					justify-content: space-between;
					align-items: center;
				}

				.item {
					height: 130rpx;
					border-bottom: 1px solid #393940;
					display: flex;
					flex-direction: column;
					justify-content: center;

					&:last-child {
						border: none;
					}

					.cell {
						width: 100%;
						margin: 10rpx 0;
						display: flex;
						justify-content: space-between;

						.value {
							color: #FFFFFF;
							font-size: 28rpx;
							font-weight: bold;
						}

						.status,
						.time {
							color: #B5B5B6;
							font-size: 24rpx;
						}

						.total {
							color: #B5B5B6;
							font-size: 24rpx;
							font-weight: 400;
						}
					}
				}
			}
		}
	}
</style>