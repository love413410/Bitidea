<template>
	<view class="order">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">我的订单</view>
			</template>
		</uv-navbar>
		<view class="content">
			<Title>我的订单</Title>
		</view>
		<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
			<view class="item" v-for="item in _this.list">
				<view class="name">类型：{{item.type_name}}</view>
				<view class="other">
					<view class="value">充值金额：{{item.price}}</view>
					<view class="time">{{item.created_at}}</view>
				</view>
			</view>
			<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
		</scroll-view>
	</view>
</template>
<script setup>
	import {
		userOrderLists
	} from "@/request/api";
	import Title from "@/components/common/Title.vue";
	import useList from "@/hooks/useList.js";
	const {
		_this
	} = useList();
	const getList = async () => {
		let {
			list
		} = await userOrderLists({
			page: _this.page,
			limit: _this.limit,
		});
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
</script>

<style scoped lang="scss">
	.order {
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
		}

		.scroll_view {
			height: calc(100vh - #{$navBarHeight} - 20rpx - #{$titleHeight});
			padding: 0 30rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				min-height: 140rpx;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				padding: 30rpx;
				box-sizing: border-box;
				background: #232327;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: bold;
				}

				.other {
					display: flex;
					justify-content: space-between;

					.value {
						color: #999999;
						font-size: 24rpx;
						font-weight: 400;
					}

					.time {
						color: #999999;
						font-size: 24rpx;
						font-weight: 400;
					}
				}
			}
		}
	}
</style>