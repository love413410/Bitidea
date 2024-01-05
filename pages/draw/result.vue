<template>
	<view class="result">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">绘图广场</view>
			</template>
		</uv-navbar>
		<view class="content">
			<!-- <view class="user_info">
				<image :src="user_info.head_portrait" class="avatar"></image>
				<view class="user_view">
					<view class="name">{{user_info.nickname}}</view>
					<view class="time">累计被赞：10925</view>
				</view>
			</view> -->
			<view class="tabs">
				<view class="item" :class="active==index?'active':''" v-for="(item,index) in list"
					@click="change(index)">
					{{item}}
				</view>
			</view>
		</view>
		<MjList :type="active" v-if="active==1"></MjList>
		<List :type="active" v-else-if="active==2||active==3"></List>
		<!-- <component :is="currentComponent" :type="active"></component> -->
	</view>
</template>

<script setup>
	import {
		drawSquare,
		userInfo
	} from "@/request/api";

	import MjList from "@/components/draw/MjList.vue"
	import List from "@/components/draw/List.vue"
	import useMy from "@/hooks/useMy.js";

	import useBase from "@/hooks/useBase.js";
	const {
		user_info
	} = useMy();

	import {
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref,
		shallowRef
	} from "vue";

	const list = ref({});
	const active = ref("");

	const getType = async () => {
		let {
			type
		} = await drawSquare();
		list.value = type;
		let keys = Object.keys(type);
		active.value = keys.length ? keys[0] : "";
	};
	getType();
	const change = (value) => {
		active.value = value;
	};

	// const currentComponent = shallowRef(MjList);
	// const change = (value) => {
	// 	active.value = value;
	// 	currentComponent.value = value == 1 ? MjList : List;
	// };
	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		user_info.value = user;
	};
	onShow(() => getUserInfo());
</script>

<style scoped lang="scss">
	.result {
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
			// padding: 20rpx 30rpx 0;
			padding: 0rpx 30rpx;
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
				padding: 40rpx 0 30rpx;
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

		:deep() {
			.scroll_view {
				height: calc(100vh - #{$navBarHeight} - 180rpx);
			}
		}

		// .scroll_view {
		// 	height: calc(100vh - #{$navBarHeight} - 150rpx - 180rpx);
		// 	padding: 0 30rpx;
		// 	box-sizing: border-box;
		// }
	}
</style>