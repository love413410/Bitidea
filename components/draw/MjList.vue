<template>
	<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
		<view class="list">
			<view class="item" v-for="item in _this.list" @click="router(`/pages/draw/draw_deta?id=${item.id}`)">
				<image :src="item.result" class="cover"></image>
				<view class="item_view">
					<view class="author">
						<image :src="item.user.head_portrait" class="avatar"></image>
						<view class="name">{{item.user.nickname}}</view>
					</view>
					<view class="number" @click.stop="link_click(item)">
						<image src="@/static/images/x2.png" v-if="item.is_like==1"></image>
						<image src="@/static/images/x1.png" v-else></image>
						<view class="value">{{item.like_number}}</view>
					</view>
				</view>
			</view>
		</view>
		<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
	</scroll-view>
</template>

<script setup>
	import {
		drawSquare,
		drawLike
	} from "@/request/api";

	import useList from "@/hooks/useList.js";
	import useBase from "@/hooks/useBase.js";
	const {
		_this
	} = useList();
	const {
		router
	} = useBase();

	import {
		ref,
		watch,
		onMounted
	} from "vue";

	const props = defineProps({
		type: {
			type: [Number, String],
			default: 1
		}
	});
	const getList = async () => {
		let {
			list
		} = await drawSquare({
			type: props.type,
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

	const link_click = async (item) => {
		let {
			id,
			is_like
		} = item;
		await drawLike({
			id
		});
		if (is_like == 0) {
			item.is_like = 1;
			item.like_number += 1;
		} else {
			item.is_like = 0;
			item.like_number -= 1;
		}
	};
</script>

<style scoped lang="scss">
	.scroll_view {
		// height: calc(100vh - #{$navBarHeight} - 180rpx);
		// height: calc(100vh - #{$navBarHeight} - 150rpx - 180rpx);
		padding: 0 30rpx;
		box-sizing: border-box;

		.list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				width: 335rpx;
				height: 335rpx;
				margin-bottom: 20rpx;
				position: relative;

				.cover {
					width: 100%;
					height: 100%;
				}

				.item_view {
					width: 100%;
					height: 60rpx;
					border-radius: 10rpx;
					padding: 0 20rpx;
					box-sizing: border-box;
					box-shadow: 0rpx 4rpx 10rpx 0rpx rgba(214, 214, 214, 0.2);
					background: rgba(0, 0, 0, 0.7);
					display: flex;
					justify-content: space-between;
					position: absolute;
					left: 0;
					bottom: 0;
					z-index: 2;

					.author {
						display: flex;
						align-items: center;

						image {
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
						}

						.name {
							color: #FFFFFF;
							font-size: 30rpx;
							padding-left: 10rpx;
							box-sizing: border-box;
						}
					}

					.number {
						display: flex;
						align-items: center;

						image {
							width: 28rpx;
							height: 28rpx;
						}

						.value {
							color: #EEEEEE;
							font-size: 24rpx;
							font-weight: 400;
							padding-left: 6rpx;
							box-sizing: border-box;
						}
					}
				}
			}
		}
	}
</style>