<template>
	<view class="home">
		<NavBar :is_vip="user_info.vip_date" @leftClick="menuRef.show = true" @rightClick="router('/pages/my/vip')"></NavBar>
		<view class="content">
			<view class="swiper">
				<uv-swiper height="135" autoplay circular keyName="img" bgColor :list="list"></uv-swiper>
			</view>
			<!-- @click="router('/pages/home/gpt')"0 -->
			<view class="banner">
				<view class="banner_head">
					<image src="@/static/images/jqr.png"></image>
					<text>{{banner.describe_name}}</text>
				</view>
				<view class="desc">{{banner.describe_notes}}</view>
				<view class="banner_ai">
					<view class="ai_view" :class="status== 'open'?'open':''" @click.stop="choose">
						<view>
							<image src="@/static/images/ai.png"></image>
							<text>AI聊天</text>
						</view>
						<image src="@/static/images/down.png" class="down"></image>
					</view>
					<view class="ai_select" :style="{height:`${height}rpx`}">
						<view class="item" v-for="item in model_list" @click="router(`/pages/home/gpt?id=${item.id}`)">
							<image :src="item.logo" class="item_logo"></image>
							<view class="name">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="title">热门提问</view>
			<view class="list">
				<view class="item" v-for="(item,index) in hot_list" @click="hot_click(item.id)">
					<view class="item_view">
						<view class="item_head">
							<image :src="item.icon"></image>
							<text>{{item.title}}</text>
						</view>
						<view class="synopsis">{{item.synopsis}}</view>
					</view>
					<view class="btn">
						<text>立即开始吧</text>
						<image src="@/static/images/xx.png"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import NavBar from "@/components/home/NavBar.vue"
	import {
		wechatLogin,
		index,
		chatHotQuestion
	} from "@/request/api";

	import useWechat from "@/hooks/useWechat.js";
	import useMy from "@/hooks/useMy.js";
	import useBase from "@/hooks/useBase.js";

	const {
		user_info,
		getUserInfo
	} = useMy();
	const {
		copy,
		router
	} = useBase();

	import {
		onShow,
		onHide
	} from "@dcloudio/uni-app";
	import {
		reactive,
		ref
	} from "vue";
	import useStore from "@/stores/index.js";
	const {
		useLoginStore
	} = useStore();

	const list = ref([]);
	const model_list = ref([]);
	const hot_list = ref([]);
	let banner = ref({
		describe_name: "",
		describe_notes: ""
	});

	const getIndex = async () => {
		let {
			rotation,
			hot_question,
			setting,
			chat_model
		} = await index();
		list.value = rotation;
		model_list.value = chat_model;
		hot_list.value = hot_question;
		banner.value = setting;
		getUserInfo();
	};

	const wxLogin = async () => {
		const code = useLoginStore.code;
		if (!code) {
			setTimeout(() => {
				useLoginStore.outLogin();
			}, 1000);
			return false;
		}
		let {
			token
		} = await wechatLogin({
			code: useLoginStore.code
		});
		useLoginStore.changeToken(token);
		getIndex();
	};

	const height = ref(0);
	const status = ref("close");
	const choose = () => {
		if (status.value == "close") {
			let size = model_list.value.length;
			let h = 100 * size;
			height.value = h;
			status.value = "open";
			return false;
		}
		height.value = 0;
		status.value = "close";
	};

	const hot_click = async (id) => {
		let {
			chat_group_id,
			chat_id,
			chat_model_id
		} = await chatHotQuestion({
			id
		});
		router(`/pages/home/gpt?id=${chat_model_id}&group_id=${chat_group_id}&chat_id=${chat_id}`)
	};
	const token = useLoginStore.token;
	onShow(() => token ? getIndex() : wxLogin());
	onHide(() => {
		height.value = 0;
		status.value = "close";
	})
</script>

<style scoped lang="scss">
	.home {
		min-height: calc(100vh - var(--window-top) - var(--window-bottom));
		background: $background;
		position: relative;

		.content {
			padding: 0rpx 20rpx;
			box-sizing: border-box;

			.swiper {
				padding: 30rpx 0;
				box-sizing: border-box;
			}

			.banner {
				width: 100%;
				// height: 250rpx;
				border-radius: 16rpx;
				padding: 20rpx 25rpx;
				box-sizing: border-box;
				background: #232327;
				// display: flex;
				// flex-direction: column;
				// justify-content: space-between;

				.banner_head {
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					text {
						color: #EEEEEE;
						font-size: 32rpx;
						font-weight: bold;
						padding-left: 10rpx;
						box-sizing: border-box;
					}
				}

				.desc {
					line-height: 28rpx;
					color: #999999;
					font-size: 22rpx;
					padding: 18rpx 0 24rpx;
					box-sizing: border-box;
				}

				.banner_ai {
					width: 100%;
					position: relative;

					.ai_view {
						width: 100%;
						height: 80rpx;
						padding: 0 20rpx;
						box-sizing: border-box;
						background: url(@/static/images/bg1.png) no-repeat;
						background-size: 100% 100%;
						display: flex;
						justify-content: space-between;
						align-items: center;

						&.open {
							image.down {
								transform: rotate(180deg);
							}
						}

						&>view {
							display: flex;
							align-items: center;

							image {
								width: 50rpx;
								height: 50rpx;
							}

							text {
								color: #EEEEEE;
								font-size: 32rpx;
								font-weight: bold;
								padding-left: 14rpx;
								box-sizing: border-box;
							}
						}

						image.down {
							width: 24rpx;
							height: 24rpx;
						}
					}

					.ai_select {
						width: 100%;
						height: 0rpx;
						border-left: 1px solid rgba(238, 238, 238, .1);
						border-right: 1px solid rgba(238, 238, 238, .1);
						transition: height 1s;
						overflow: hidden;

						.item {
							height: 100rpx;
							border-bottom: 1px solid rgba(238, 238, 238, .1);
							box-sizing: border-box;
							display: flex;
							align-items: center;

							.item_logo {
								width: 50rpx;
								height: 50rpx;
								border-radius: 50%;
								margin: 0 16rpx;
								background: #FFFFFF;
							}

							.name {
								color: #999999;
								font-size: 28rpx;
							}
						}
					}
				}
			}

			.title {
				width: 100%;
				text-align: center;
				color: #FFFFFF;
				font-size: 40rpx;
				font-weight: bold;
				line-height: 48rpx;
				padding: 50rpx 0 30rpx;
				box-sizing: border-box;
				background: linear-gradient(-50deg, #5CE5F9 0%, #9785EA 100%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.list {
				padding: 0 10rpx;
				box-sizing: border-box;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					width: 335rpx;
					height: 250rpx;
					border-radius: 16rpx;
					margin-bottom: 20rpx;
					background: #1E1E22;
					overflow: hidden;

					.item_view {
						height: 190rpx;
						padding: 14rpx 20rpx;
						box-sizing: border-box;

						.item_head {
							display: flex;
							align-items: center;

							image {
								width: 60rpx;
								height: 60rpx;
							}

							text {
								color: #FFFFFF;
								font-size: 30rpx;
								font-weight: bold;
							}
						}

						.synopsis {
							line-height: 36rpx;
							color: #999999;
							font-size: 24rpx;
							font-weight: 400;
							padding: 12rpx 10rpx 0;
							box-sizing: border-box;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}

					.btn {
						height: 60rpx;
						background: #29292C;
						display: flex;
						justify-content: center;
						align-items: center;

						text {
							color: #999999;
							font-size: 24rpx;
							font-weight: 400;
							padding-right: 15rpx;
							box-sizing: border-box;
						}

						image {
							width: 30rpx;
							height: 30rpx;
						}
					}
				}
			}
		}
	}
</style>