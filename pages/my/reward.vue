<template>
	<view class="promotion">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">我的奖励</view>
			</template>
		</uv-navbar>
		<view class="content">
			<view class="info_view">
				<view class="oper">
					<view class="left" @click="is_open=!is_open">
						<text>我的收益</text>
						<image src="@/static/images/y4.png" v-if="is_open"></image>
						<image src="@/static/images/y3.png" v-else></image>
					</view>
					<view class="btn" @click="router('/pages/my/withdrawal')">提现</view>
				</view>
				<view class="number">
					<view class="unit" v-if="is_open">￥</view>
					<view class="value" v-if="is_open">{{user_info.balance}}</view>
					<view class="value" v-else>***</view>
				</view>
			</view>
			<Title>收支明细</Title>
		</view>
		<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
			<view class="item" v-for="item in _this.list">
				<view class="item_view">
					<image :src="item.order.user.head_portrait" class="avatar"></image>
					<view class="user_info">
						<view class="name">{{item.order.user.nickname}}</view>
						<view class="cell">
							<view>用户ID：{{item.order.user.id}}</view>
							<view>推荐关系：{{item.type_name}}</view>
						</view>
					</view>
				</view>
				<view class="cell_view">
					<view>充值金额：{{item.order.price}}</view>
					<view>分佣：{{item.value}}</view>
					<view>时间：{{item.created_at}}</view>
					<view>类型：{{item.order.type_name}}</view>
				</view>
			</view>
			<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		userBouns,
		userInfo
	} from "@/request/api";
	import Title from "@/components/common/Title.vue";

	import useBase from "@/hooks/useBase.js";
	import useList from "@/hooks/useList.js";
	import useMy from "@/hooks/useMy.js";

	const {
		router
	} = useBase();
	const {
		_this
	} = useList();
	const {
		user_info
	} = useMy();
	import {
		ref,
		shallowRef,
		onMounted
	} from "vue";
	const is_open = ref(false);

	const getList = async () => {
		let {
			list
		} = await userBouns({
			page: _this.page,
			limit: _this.limit,
		})
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

	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		user_info.value = user;
	};
	getUserInfo();
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
			padding: 20rpx 30rpx 0;
			box-sizing: border-box;

			.info_view {
				width: 100%;
				height: 210rpx;
				padding: 30rpx;
				box-sizing: border-box;
				background: url(@/static/images/bg7.png) no-repeat;
				background-size: 100% 100%;

				.oper {
					display: flex;
					justify-content: space-between;

					.left {
						display: flex;
						align-items: center;

						text {
							color: #666666;
							font-size: 28rpx;
							font-weight: bold;
							padding-right: 20rpx;
							box-sizing: border-box;
						}

						image {
							width: 30rpx;
							height: 30rpx;
						}
					}

					.btn {
						width: 150rpx;
						height: 72rpx;
						color: #222222;
						font-size: 28rpx;
						font-weight: bold;
						border-radius: 10rpx;
						border: 1px solid #000000;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}

				.number {
					display: flex;
					align-items: center;

					.unit {
						color: #222222;
						font-size: 36rpx;
						font-weight: bold;
					}

					.value {
						color: #222222;
						font-size: 50rpx;
						font-weight: bold;
					}
				}
			}
		}

		.scroll_view {
			height: calc(100vh - #{$navBarHeight} - 230rpx - #{$titleHeight});
			padding: 0 30rpx;
			box-sizing: border-box;

			.item {
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				padding: 40rpx 30rpx 30rpx;
				box-sizing: border-box;
				background: #232327;

				.item_view {
					height: 80rpx;
					border-bottom: 1px solid #393940;
					padding-bottom: 30rpx;
					box-sizing: content-box;
					display: flex;

					.avatar {
						width: 80rpx;
						height: 80rpx;
						border-radius: 50%;
					}

					.user_info {
						height: 100%;
						flex: 1;
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
					}

					.cell {
						display: flex;
						justify-content: space-between;

						view {
							flex: 1;
							color: #999999;
							font-size: 24rpx;
							font-weight: 400;
						}
					}
				}

				.cell_view {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					view {
						width: 50%;
						color: #999999;
						font-size: 24rpx;
						font-weight: 400;
						padding-top: 30rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>