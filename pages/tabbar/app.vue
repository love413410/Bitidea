<template>
	<view class="app">
		<view class="label label1">功能广场</view>
		<scroll-view scroll-x class="scroll_box">
			<view class="item" :class="!tabs_id?'active':''" @click="change()">
				<view class="cover">
					<image src="@/static/images/a2.png"></image>
				</view>
				<view class="name">热门</view>
			</view>
			<view class="item" :class="item.id==tabs_id?'active':''" v-for="(item,index) in tabs"
				@click="change(item.id)">
				<view class="cover">
					<image :src="item.logo"></image>
				</view>
				<view class="name">{{item.name}}</view>
			</view>
		</scroll-view>
		<view class="label label2">探索</view>
		<view class="list">
			<view class="item" v-for="item in _this.list">
				<image :src="item.logo"></image>
				<view class="item_view">
					<view class="name">{{item.name}}</view>
					<view class="synopsis">{{item.synopsis}}</view>
				</view>
				<view class="btn">
					<view @click="navigate(item)">进入</view>
					<!-- <view @click="router('/pages/app/report')">进入</view> -->
				</view>
			</view>
		</view>
		<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
	</view>
</template>

<script setup>
	import {
		applicationClass,
		applicationLists
	} from "@/request/api";
	import {
		onReachBottom
	} from "@dcloudio/uni-app"
	import {
		ref
	} from "vue";
	import useList from "@/hooks/useList.js";
	import useBase from "@/hooks/useBase.js";

	const {
		_this
	} = useList();
	const {
		router
	} = useBase();

	const tabs = ref([]),
		tabs_id = ref("");

	const getList = async () => {
		let {
			list
		} = await applicationLists({
			class_id: tabs_id.value,
			page: _this.page,
			limit: _this.limit,
		});
		_this.last_page = list.last_page;
		list = list.list;
		_this.list = _this.page == 1 ? list : [..._this.list, ...list];
		_this.loadmore_status = _this.last_page == _this.page ? 'nomore' : 'loadmore';
	};
	getList();
	const get_class = async () => {
		let res = await applicationClass();
		let list = res.class;
		// tabs_id.value = list.length ? list[0].id : "";
		tabs.value = list;
	};
	get_class();

	const change = (id) => {
		tabs_id.value = id ? id : "";
		_this.page = 1;
		_this.list = [];
		getList();
	};
	const loadmore = () => {
		if (_this.page >= _this.last_page) return;
		_this.page++;
		getList();
	};
	const navigate = (item) => {
		if (item.type == 0) return false;
		router(`/pages/app/report?id=${item.id}`);
	};
	onReachBottom(() => loadmore());
</script>

<style scoped lang="scss">
	.app {
		min-height: calc(100vh - var(--window-top) - var(--window-bottom));
		padding: 20rpx 30rpx 0;
		box-sizing: border-box;
		background: $background;
		position: relative;

		.label {
			width: 260rpx;
			height: 72rpx;
			line-height: 72rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			padding-left: 28rpx;
			box-sizing: border-box;

			&.label1 {
				background: url(@/static/images/label1.png) no-repeat;
				background-size: 100% 100%;
			}

			&.label2 {
				background: url(@/static/images/label2.png) no-repeat;
				background-size: 100% 100%;
			}
		}

		.scroll_box {
			white-space: nowrap;

			.item {
				display: inline-block;
				height: 255rpx;
				margin-right: 20rpx;
				padding: 30rpx 0;
				box-sizing: border-box;

				&.active {
					.cover {
						position: relative;

						&::after {
							width: 100%;
							height: 100%;
							content: "";
							background: url(@/static/images/xzk.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 2;
						}
					}

					.name {
						background: linear-gradient(50deg, #5CE5F9 0%, #9785EA 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}
				}

				.cover {
					width: 150rpx;
					height: 150rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.name {
					height: 44rpx;
					text-align: center;
					color: #EEEEEE;
					font-size: 28rpx;
					font-weight: bold;
					padding-top: 16rpx;
					box-sizing: border-box;
				}
			}
		}

		.list {
			.item {
				margin-top: 30rpx;
				display: flex;
				justify-content: space-between;

				image {
					width: 200rpx;
					height: 200rpx;
				}

				.item_view {
					flex: 1;
					padding: 20rpx 20rpx 10rpx;
					box-sizing: border-box;

					.name {
						color: #EEEEEE;
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 30rpx;
					}

					.synopsis {
						color: #999999;
						font-size: 24rpx;
					}
				}

				.btn {
					display: flex;
					align-items: flex-end;

					view {
						width: 200rpx;
						height: 78rpx;
						line-height: 78rpx;
						text-align: center;
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
						border-radius: 20rpx;
						background: #1E1E22;
					}
				}
			}
		}
	}
</style>