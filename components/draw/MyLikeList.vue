<template>
	<scroll-view scroll-y class="scroll_view" @scrolltolower="loadmore">
		<view class="waterfall">
			<view class="left">
				<view class="item" v-for="(item,index) in list1" @click="router(`/pages/draw/draw_deta?id=${item.id}`)">
					<image :src="item.draw.result" class="cover"></image>
					<view class="item_view">
						<view class="author">
							<image :src="item.draw.user.head_portrait" class="avatar"></image>
							<view class="name">{{item.draw.user.nickname}}</view>
						</view>
						<view class="number" @click.stop="link_click(item.draw.id)">
							<image src="@/static/images/x2.png"></image>
							<view class="value">{{item.draw.like_number}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="right">
				<view class="item" v-for="(item,index) in list2" @click="router(`/pages/draw/draw_deta?id=${item.id}`)">
					<image :src="item.draw.result" class="cover"></image>
					<view class="item_view">
						<view class="author">
							<image :src="item.draw.user.head_portrait" class="avatar"></image>
							<view class="name">{{item.draw.user.nickname}}</view>
						</view>
						<view class="number" @click.stop="link_click(item.draw.id)">
							<image src="@/static/images/x2.png"></image>
							<view class="value">{{item.draw.like_number}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uv-load-more :status="_this.loadmore_status" line @loadmore="loadmore" />
	</scroll-view>
</template>

<script setup>
	import {
		drawLikeList,
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
		watch
	} from "vue";
	const props = defineProps({
		type: [Number, String]
	});

	const list1 = ref([]);
	const list2 = ref([]);

	const getList = async () => {
		let {
			list
		} = await drawLikeList({
			type: props.type,
			page: _this.page,
			limit: _this.limit,
		});
		_this.last_page = list.last_page;
		list = list.list;
		_this.loadmore_status = _this.last_page == _this.page ? 'nomore' : 'loadmore';
		let temp1 = [],
			temp2 = [];
		list.map((item, index) => {
			index % 2 == 0 ? temp1.push(item) : temp2.push(item)
		});
		list1.value = [...list1.value, ...temp1];
		list2.value = [...list2.value, ...temp2];
	};
	const loadmore = () => {
		if (_this.page >= _this.last_page) return;
		_this.page++;
		getList();
	};
	watch(() => props.type, (n) => {
		_this.page = 1;
		list1.value = [];
		list2.value = [];
		getList();
	}, {
		immediate: true
	});

	const link_click = async (id) => {
		await drawLike({
			id
		});
		uni.$uv.toast("操作成功");
		_this.page = 1;
		list1.value = [];
		list2.value = [];
		getList();
	};
</script>

<style scoped lang="scss">
	.scroll_view {
		height: calc(100vh - #{$navBarHeight} - 150rpx - 180rpx);
		padding: 0 30rpx;
		box-sizing: border-box;

		.waterfall {
			display: flex;
			justify-content: space-between;

			&>view {
				&.left {
					.item {
						width: 335rpx;
						height: 448rpx;
						margin-bottom: 20rpx;
						position: relative;

						&:nth-child(2n) {
							height: 335rpx;
						}

						.cover {
							width: 100%;
							height: 100%;
						}
					}
				}

				&.right {
					.item {
						width: 335rpx;
						height: 335rpx;
						margin-bottom: 20rpx;
						position: relative;

						&:nth-child(2n) {
							height: 448rpx;
						}

						.cover {
							width: 100%;
							height: 100%;
						}
					}
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