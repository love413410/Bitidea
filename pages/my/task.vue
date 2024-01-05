<template>
	<view class="task">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">任务中心</view>
			</template>
		</uv-navbar>
		<view class="content">
			<Title>免费获取积分</Title>
		</view>
		<scroll-view scroll-y class="scroll_view">
			<view class="item" v-for="(item,index) in list">
				<view class="item_view">
					<view class="name">{{item.name}}</view>
					<view class="synopsis">{{item.synopsis}}</view>
				</view>
				<view class="btn" v-if="index==3 ||index==2&&phone">已完成</view>
				<view class="btn" @click="submit(index)" v-else>去完成</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		userInfo,
		userIntegraltask
	} from "@/request/api";
	import Title from "@/components/common/Title.vue";
	import useBase from "@/hooks/useBase.js";
	const {
		router
	} = useBase();
	import {
		ref
	} from "vue";
	const list = ref([]);
	const getList = async () => {
		let {
			task
		} = await userIntegraltask();
		list.value = task;
	};
	getList();

	const phone = ref();
	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		phone.value = user.phone;
	};
	getUserInfo();

	const submit = (index) => {
		if (index == 3) return;
		if (index == 2) {
			router('/pages/my/change')
		} else {
			router('/pages/my/invite')
		};
	};
</script>

<style scoped lang="scss">
	.task {
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
				border-radius: 20rpx;
				margin-bottom: 20rpx;
				padding: 40rpx 30rpx;
				box-sizing: border-box;
				background: #232327;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.item_view {
					flex: 1;
					overflow: hidden;
					padding-right: 20rpx;
					box-sizing: border-box;

					.name {
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: bold;
						margin-bottom: 26rpx;
					}

					.synopsis {
						line-height: 36rpx;
						color: #999999;
						font-size: 24rpx;
						font-weight: 400;
					}
				}


				.btn {
					width: 200rpx;
					height: 68rpx;
					line-height: 68rpx;
					text-align: center;
					border-radius: 20rpx;
					background: linear-gradient(-50deg, #5CE5F9, #9785EA);
				}
			}
		}
	}
</style>