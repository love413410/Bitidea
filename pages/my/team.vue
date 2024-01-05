<template>
	<view class="promotion">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">团队管理</view>
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
			<view class="tabs">
				<view class="item" :class="type==0?'active':''" @click="change(0)">全部({{all_value}}）</view>
				<view class="item" :class="type==1?'active':''" @click="change(1)">直接用户({{one_value}})</view>
				<view class="item" :class="type==2?'active':''" @click="change(2)">间接用户({{two_value}}）</view>
			</view>
		</view>
		<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
			<view class="list">
				<view class="item" v-for="item in _this.list">
					<image :src="item.head_portrait" class="avatar"></image>
					<view class="item_view">
						<view class="name">{{item.nickname}}</view>
						<view class="cell_view">
							<view class="cell">用户ID：{{item.id}}</view>
							<view class="cell">分佣比例：{{item.distribution}}%</view>
						</view>
					</view>
					<!-- <view class="setting">
						<image src="@/static/images/setting.png"></image>
					</view> -->
				</view>
				<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		userInfo,
		userTeam
	} from "@/request/api";
	import useMy from "@/hooks/useMy.js";
	import useList from "@/hooks/useList.js";
	const {
		_this
	} = useList();

	const {
		user_info
	} = useMy();
	import {
		ref
	} from "vue";
	const type = ref(0);

	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		user_info.value = user;
	};
	getUserInfo();

	const all_value = ref(0),
		one_value = ref(0),
		two_value = ref(0);
	const getList = async () => {
		let {
			list,
			all_number,
			one_number,
			two_number
		} = await userTeam({
			type: type.value,
			page: _this.page,
			limit: _this.limit,
		});
		all_value.value = all_number;
		one_value.value = one_number;
		two_value.value = two_number;
		_this.last_page = list.last_page;
		list = list.list;
		_this.list = _this.page == 1 ? list : [..._this.list, ...list];
		_this.loadmore_status = _this.last_page == _this.page ? 'nomore' : 'loadmore';
	};
	getList();

	const loadmore = () => {
		if (_this.page >= _this.last_page) return;
		_this.page++;
		getList();
	};

	const change = (value) => {
		type.value = value;
		_this.page = 1;
		_this.list = [];
		getList();
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

		.content {
			padding: 0 30rpx;
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

			.tabs {
				height: 180rpx;
				display: flex;
				justify-content: space-between;
				padding: 60rpx 0 30rpx;
				box-sizing: border-box;

				.item {
					width: 200rpx;
					height: 88rpx;
					line-height: 88rpx;
					text-align: center;
					color: #999999;
					font-size: 28rpx;
					font-weight: bold;

					&.active {
						color: #FFFFFF;
						position: relative;

						&::after {
							width: 100%;
							height: 100%;
							content: "";
							background: url(@/static/images/xzk3.png) no-repeat;
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

		.scroll_view {
			height: calc(100vh - #{$navBarHeight} - 150rpx - 180rpx);

			.list {
				.item {
					height: 160rpx;
					border-radius: 20rpx;
					margin-bottom: 20rpx;
					padding: 40rpx 100rpx 40rpx 30rpx;
					box-sizing: border-box;
					background: #232327;
					display: flex;
					align-items: center;
					position: relative;

					.avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.item_view {
						flex: 1;
						height: 100%;
						padding-left: 20rpx;
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							color: #FFFFFF;
							font-size: 28rpx;
							font-weight: bold;
						}

						.cell_view {
							display: flex;
							justify-content: space-between;

							.cell {
								color: #999999;
								font-size: 24rpx;
								font-weight: 400;
							}
						}
					}

					.setting {
						width: 40rpx;
						height: 40rpx;
						position: absolute;
						right: 30rpx;
						top: 30rpx;
						z-index: 2;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>