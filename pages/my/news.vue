<template>
	<view class="information">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">文章资讯</view>
			</template>
		</uv-navbar>
		<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
			<view class="item" v-for="item in _this.list" @click="router(`/pages/my/news_deta?id=${item.id}`)">
				<view class="item_view">
					<view class="item_info">
						<view class="title">{{item.title}}</view>
						<view class="synopsis">{{item.synopsis}}</view>
					</view>
					<view class="time">{{item.created_at}}</view>
				</view>
				<image :src="item.thumbnail"></image>
			</view>
			<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
		</scroll-view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		news
	} from "@/request/api";
	import useList from "@/hooks/useList.js";
	import useBase from "@/hooks/useBase.js";
	const {
		_this
	} = useList();
	const {
		router
	} = useBase();
	const getList = async () => {
		let {
			list
		} = await news();
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
	.information {
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
			height: calc(100vh - #{$navBarHeight});
			padding: 0 30rpx;
			box-sizing: border-box;

			.item {
				width: 100%;
				min-height: 220rpx;
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				padding: 30rpx;
				box-sizing: border-box;
				background: #232327;
				display: flex;
				justify-content: space-between;

				.item_view {
					flex: 1;
					padding: 10rpx;
					box-sizing: border-box;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.title {
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
						margin-bottom: 20rpx;
					}

					.synopsis {
						color: #999999;
						font-size: 24rpx;
						padding-right: 10rpx;
						box-sizing: border-box;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}

					.time {
						color: #999999;
						font-size: 24rpx;
					}
				}

				image {
					width: 180rpx;
					height: 180rpx;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>