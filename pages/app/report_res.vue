<template>
	<view class="report_res">
		<uv-navbar placeholder bgColor="#121212" autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">Bitidea</view>
			</template>
		</uv-navbar>
		<scroll-view scroll-y class="scroll_view">
			<view id="list" class="list">
				<view class="item">
					<view class="item_view ask">
						<view class="user_info">
							<image :src="avatar" class="avatar"></image>
							<view class="name">{{nickname}}</view>
						</view>
						<view class="item_text">{{message}}</view>
					</view>
					<view class="item_view answer" v-if="answer">
						<view class="user_info">
							<image src="@/static/images/logo2.png" class="avatar"></image>
							<view class="name">Bitidea</view>
						</view>
						<view class="item_text">{{answer}}</view>
						<view class="oper">
							<view class="oper_item" @click="copy(answer)">
								<image src="@/static/images/copy2.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		userInfo,
		applicationArticleInfo
	} from "@/request/api";
	import useBase from "@/hooks/useBase.js";
	const {
		copy
	} = useBase();
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref
	} from "vue";

	const avatar = ref(""),
		nickname = ref("");
	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		avatar.value = user.head_portrait;
		nickname.value = user.nickname;
	};
	getUserInfo();

	const message = ref(""),
		answer = ref("");
	onLoad(async ({
		id
	}) => {
		let {
			application_article
		} = await applicationArticleInfo({
			id
		});
		message.value = application_article.message;
		answer.value = application_article.answer;
	});
</script>

<style scoped lang="scss">
	.report_res {
		height: calc(100vh - var(--window-top));
		background: $background;
		position: relative;

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

			.list {
				padding: 100rpx 30rpx;
				box-sizing: border-box;

				.item {
					margin-bottom: 50rpx;

					&:last-child {
						margin-bottom: 0;
					}

					.item_view {
						&.ask {}

						&.answer {
							padding-top: 50rpx;
							box-sizing: border-box;

							.oper {
								padding-top: 40rpx;
								box-sizing: border-box;
								display: flex;
								justify-content: flex-end;
								align-items: center;

								.oper_item {
									width: 40rpx;
									height: 40rpx;
									margin-left: 40rpx;

									image {
										width: 100%;
										height: 100%;
									}
								}
							}
						}

						.user_info {
							display: flex;
							align-items: center;

							.avatar {
								width: 48rpx;
								height: 48rpx;
								border-radius: 50%;
							}

							.name {
								color: #FFFFFF;
								font-size: 30rpx;
								padding-left: 22rpx;
								box-sizing: border-box;
							}
						}

						.item_text {
							line-height: 48rpx;
							color: #FFFFFF;
							font-size: 30rpx;
							padding-left: 70rpx;

							image {
								max-width: 100%;
							}
						}
					}
				}
			}
		}
	}
</style>