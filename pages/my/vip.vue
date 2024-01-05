<template>
	<view class="vip">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">购买VIP会员</view>
			</template>
		</uv-navbar>
		<view class="content">
			<view class="user_info">
				<image :src="user_info.head_portrait" class="avatar"></image>
				<view class="user_view">
					<view class="name">{{user_info.nickname}}</view>
					<view class="time">会员到期时间：{{user_info.vip_date}}</view>
				</view>
			</view>
			<Title>文字套餐</Title>
			<view class="list">
				<view class="item" :class="id==item.id?'active':''" v-for="item in list" @click="change(item)">
					<image src="@/static/images/vip3.png" class="cover"></image>
					<view class="type">{{item.name}}</view>
					<view class="term">{{item.synopsis}}</view>
					<view class="other">
						<view class="price">
							<text class="key">￥</text>
							<text class="value">{{item.price}}</text>
						</view>
						<view class="or_price">￥{{item.original_price}}</view>
					</view>
				</view>
			</view>
			<view class="submit" @click="submit(1,id)">立即开通</view>
			<Title>会员权益</Title>
			<view class="parse_view">
				开通后，会员生效期间内所有文字交互型对话功能不限次数无限畅聊（包括GPT3.5 Turbo，GPT4.0及应用广场中的角色模拟对话等），其他服务型功能以积分形式扣取功能点
				<!-- <uv-parse :preview-img="false" :content="content"></uv-parse> -->
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		userVip
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

	const id = ref("");
	const list = ref([]);
	const content = ref("");

	const getList = async () => {
		let {
			user,
			package_user
		} = await userVip();
		user_info.value = user;

		list.value = package_user;
		if (!package_user.length) return;
		id.value = package_user[0].id;
		// content.value = package_user[0].synopsis;
	};
	getList();

	const change = (item) => {
		id.value = item.id;
		content.value = item.synopsis;
	};
</script>

<style scoped lang="scss">
	.vip {
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

			.list {
				display: flex;
				flex-wrap: wrap;

				.item {
					width: 204rpx;
					height: 285rpx;
					border-radius: 20rpx;
					margin-right: 34rpx;
					margin-bottom: 20rpx;
					padding: 10rpx 40rpx 20rpx;
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
							background: url(@/static/images/xzk5.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 2;
						}
					}

					&:nth-child(3n) {
						margin-right: 0;
					}

					.cover {
						width: 80rpx;
						height: 80rpx;
					}

					.type {
						color: #FFFFFF;
						font-size: 24rpx;
						font-weight: bold;
					}

					.term {
						color: #999999;
						font-size: 18rpx;
						font-weight: 400;
						text-align: center;
					}

					.other {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;

						.price {
							color: #FFFFFF;
							font-family: PingFang SC;
							font-weight: bold;

							&.key {
								font-size: 24rpx;
							}

							&.value {
								font-size: 50rpx;
							}
						}

						.or_price {
							color: #999999;
							font-size: 20rpx;
							font-weight: bold;
							text-decoration: line-through;
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

			.parse_view {
				line-height: 36rpx;
				color: #999999;
				font-size: 24rpx;
			}
		}
	}
</style>