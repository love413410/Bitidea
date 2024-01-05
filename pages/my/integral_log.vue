<template>
	<view class="integral_log">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">明细</view>
			</template>
		</uv-navbar>
		<view class="content">
			<view class="title">明细记录</view>
			<view class="header">
				<view>类型</view>
				<!-- <view>备注</view> -->
				<view class="time">日期</view>
				<view class="number">数量</view>
			</view>
			<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
				<view class="list">
					<view class="item" v-for="item in _this.list">
						<view>{{item.type_name}}</view>
						<!-- <view>AI绘画消耗</view> -->
						<view class="time">{{item.created_at}}</view>
						<view class="number">{{item.value}}</view>
					</view>
					<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import {
		userLog
	} from "@/request/api";
	import useList from "@/hooks/useList.js";
	const {
		_this
	} = useList();
	const getList = async () => {
		let {
			list
		} = await userLog({
			field: "integral",
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
	.integral_log {
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
			padding: 0 30rpx;
			box-sizing: border-box;

			.title {
				height: 150rpx;
				line-height: 150rpx;
				color: #FFFFFF;
				font-size: 36rpx;
				font-weight: bold;
				box-sizing: border-box;
			}

			.header {
				height: 48rpx;
				display: flex;
				justify-content: space-between;

				view {
					flex: 3;
					line-height: 1;
					color: #999999;
					font-size: 24rpx;

					&.time {
						flex: 5;
					}

					&.number {
						text-align: right;
					}
				}
			}

			.scroll_view {
				height: calc(100vh - 44px - var(--window-top) - 150rpx - 48rpx);

				.list {
					.item {
						height: 90rpx;
						border-bottom: 1px solid #393940;
						display: flex;
						justify-content: space-between;
						align-items: center;

						view {
							flex: 3;
							line-height: 1;
							color: #999999;
							font-size: 24rpx;

							&.time {
								flex: 5;
							}

							&.number {
								color: #FFFFFF;
								text-align: right;
							}
						}
					}
				}
			}
		}
	}
</style>