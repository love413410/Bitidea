<template>
	<view class="draw_record">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">绘画记录</view>
			</template>
		</uv-navbar>
		<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
			<view class="item" v-for="item in _this.list">
				<view class="title">
					<view class="id">ID: {{item.id}}</view>
					<view class="status">{{item.status_name}}</view>
				</view>
				<view class="desc">{{item.prompt}}</view>
				<view class="number">图片数量：{{item.imgs.length}}</view>
				<view class="time">创建时间：{{item.created_at}}</view>
				<view class="images" v-if="item.imgs.length" @click="preview_image(item.imgs)">
					<view class="cell_img" v-for="src in item.imgs">
						<image :src="src"></image>
					</view>
				</view>
			</view>
			<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		drawLists
	} from "@/request/api";

	import useBase from "@/hooks/useBase.js";
	import useList from "@/hooks/useList.js";
	const {
		preview_image
	} = useBase();
	const {
		_this
	} = useList();

	const getList = async () => {
		let {
			list
		} = await drawLists({
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
	.draw_record {
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

		.scroll_view {
			height: calc(100vh - #{$navBarHeight});
			padding: 30rpx;
			box-sizing: border-box;

			.item {
				// height: 400rpx;
				margin-bottom: 30rpx;
				padding: 30rpx;
				box-sizing: border-box;
				border-radius: 16rpx;
				background: #232327;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				&:last-child {
					margin-bottom: 0;
				}

				.title {
					margin-bottom: 32rpx;
					display: flex;
					justify-content: space-between;

					.id {
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
					}

					.status {
						color: #58CB6B;
						font-size: 24rpx;
					}
				}

				.desc {
					line-height: 36rpx;
					color: #999999;
					font-size: 24rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.number,
				.time {
					color: #999999;
					font-size: 24rpx;
					margin-top: 16rpx;
				}

				.images {
					margin-top: 18rpx;
					display: flex;

					.cell_img {
						width: 120rpx;
						height: 120rpx;
						border-radius: 10rpx;
						margin-right: 20rpx;
						overflow: hidden;

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