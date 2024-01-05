<template>
	<view class="my">
		<uv-navbar leftIcon="" bgColor="#121212" placeholder>
			<template v-slot:center>
				<view class="nav_title">Bitidea</view>
			</template>
		</uv-navbar>
		<view class="header">
			<view class="info" @click="router('/pages/my/change')">
				<view class="avatar">
					<image :src="user_info.head_portrait"></image>
					<view class="label" v-if="user_info.distribution">{{user_info.distribution.name}}</view>
				</view>
				<view class="info_view">
					<view class="name">{{user_info.nickname}}</view>
					<view class="id">
						<text>会员ID:{{user_info.id}}</text>
						<view class="copy" @click.stop="copy(user_info.id)">
							<image src="@/static/images/copy.png"></image>
						</view>
					</view>
				</view>
				<view class="right_icon">
					<image src="@/static/images/r1.png"></image>
				</view>
			</view>

			<view class="vip" @click="router('/pages/my/vip')" v-if="user_info.vip_date">
				<image src="@/static/images/vip3.png" class="vip_icon"></image>
				<view class="vip_view">
					<view class="status">已开通会员</view>
					<view class="tips">{{user_info.vip_date}} 过期</view>
				</view>
				<view class="right_icon">
					<image src="@/static/images/r2.png"></image>
				</view>
			</view>

			<view class="vip" @click="router('/pages/my/vip')" v-else>
				<image src="@/static/images/vip3.png" class="vip_icon"></image>
				<view class="vip_view">
					<view class="title">
						<view class="status">升级会员</view>
						<view class="btn">
							<text>立即开通</text>
							<image src="@/static/images/r2.png"></image>
						</view>
					</view>
					<view class="tips">尊享无限次文字交互，畅享更多乐趣</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="sub_title">我的积分</view>
			<view class="integral">
				<view class="left">
					<image src="@/static/images/jf.png" class="icon"></image>
					<view class="integral_view" @click="router('/pages/my/integral_log')">
						<text>{{user_info.integral}}</text>
						<image src="@/static/images/r3.png"></image>
					</view>
				</view>
				<view class="right" @click="router('/pages/my/recharge_integral')">
					<text>充值</text>
					<image src="@/static/images/r3.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="item in tabs" @click="navigate(item)">
					<image :src="item.image"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
			<view class="list">
				<view class="item" v-for="item in list" @click="navigate(item)">
					<image :src="item.image"></image>
					<text>{{item.text}}</text>
				</view>
			</view>
		</view>
		<uv-popup ref="popupRef" bgColor="none">
			<component :is="currentComponent" @close="close"></component>
		</uv-popup>
	</view>
</template>

<script setup>
	import {
		userInfo
	} from "@/request/api";

	import Exchange from "@/components/my/Exchange.vue"

	import useMy from "@/hooks/useMy.js";
	import useBase from "@/hooks/useBase.js";

	const {
		user_info
	} = useMy();
	const {
		copy,
		router
	} = useBase();

	import {
		onShow
	} from "@dcloudio/uni-app";
	import {
		ref,
		shallowRef
	} from "vue";

	const popupRef = shallowRef();
	const currentComponent = shallowRef(Exchange);

	const tabs = ref([{
		text: "分销推广",
		image: new URL("../../static/images/m1.png", import.meta.url).href,
		url: "/pages/my/promotion"
	}, {
		text: "团队管理",
		image: new URL("../../static/images/m2.png", import.meta.url).href,
		url: "/pages/my/team"
	}, {
		text: "我的奖励",
		image: new URL("../../static/images/m3.png", import.meta.url).href,
		url: "/pages/my/reward"
	}, {
		text: "卡密兑换",
		image: new URL("../../static/images/m4.png", import.meta.url).href,
		popup: true
	}]);
	const list = ref([{
		text: "分享好友",
		image: new URL("../../static/images/m5.png", import.meta.url).href,
		url: "/pages/my/invite"
	}, {
		text: "任务中心",
		image: new URL("../../static/images/m6.png", import.meta.url).href,
		url: "/pages/my/task"
	}, {
		text: "我的订单",
		image: new URL("../../static/images/m7.png", import.meta.url).href,
		url: "/pages/my/order"
	}, {
		text: "文章资讯",
		image: new URL("../../static/images/m8.png", import.meta.url).href,
		url: "/pages/my/news"
	}, {
		text: "用户协议",
		image: new URL("../../static/images/m9.png", import.meta.url).href,
		url: "/pages/my/article?key=agreement"
	}, {
		text: "隐私协议",
		image: new URL("../../static/images/m10.png", import.meta.url).href,
		url: "/pages/my/article?key=privacy"
	}, {
		text: "法律声明",
		image: new URL("../../static/images/m11.png", import.meta.url).href,
		url: "/pages/my/article?key=legal"
	}, {
		text: "关于我们",
		image: new URL("../../static/images/m12.png", import.meta.url).href,
		url: "/pages/my/article?key=about"
	}]);

	const navigate = ({
		url,
		popup
	}) => {
		if (!url && !popup) {
			uni.$uv.toast("敬请期待");
			return false;
		}
		url ? router(url) : popupRef.value.open('center');
	};
	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		user_info.value = user;
	};
	const close = () => {
		getUserInfo();
		popupRef.value.close();
	};
	onShow(() => getUserInfo());
</script>

<style scoped lang="scss">
	.my {
		min-height: calc(100vh - var(--window-top) - var(--window-bottom));
		background: $background;

		.nav_title {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
		}

		.header {
			height: 400rpx;
			padding: 60rpx 30rpx 30rpx;
			box-sizing: border-box;
			background: url(@/static/images/bg2.png) no-repeat;
			background-size: 100% 100%;

			.info {
				height: 150rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.avatar {
					width: 150rpx;
					height: 100%;
					position: relative;

					image {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}

					.label {
						width: 128rpx;
						height: 44rpx;
						line-height: 44rpx;
						text-align: center;
						color: #111111;
						font-size: 22rpx;
						background: url(@/static/images/label.png) no-repeat;
						background-size: 100% 100%;
						position: absolute;
						left: 50%;
						bottom: -8rpx;
						transform: translateX(-50%);
					}
				}

				.info_view {
					flex: 1;
					height: 100%;
					padding: 18rpx 30rpx;
					box-sizing: border-box;
					overflow: hidden;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						color: #FFFFFF;
						font-size: 50rpx;
						font-weight: bold;
					}

					.id {
						line-height: 1;
						display: flex;
						align-items: center;

						text {
							color: #999999;
							font-size: 26rpx;
							padding-right: 16rpx;
							box-sizing: border-box;
						}

						.copy {
							image {
								width: 36rpx;
								height: 36rpx;
							}
						}
					}
				}

				.right_icon {
					width: 24rpx;
					height: 24rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.vip {
				width: 100%;
				height: 141rpx;
				margin-top: 50rpx;
				padding: 16rpx 26rpx 24rpx;
				box-sizing: border-box;
				background: url(@/static/images/bg3.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.vip_icon {
					width: 100rpx;
					height: 100rpx;
				}

				.vip_view {
					flex: 1;
					height: 100%;
					padding: 10rpx 0rpx 10rpx 30rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.title {
						display: flex;
						justify-content: space-between;
						align-items: flex-end;

						.btn {
							display: flex;
							align-items: center;

							text {
								color: #999999;
								font-size: 24rpx;
								padding-right: 12rpx;
								box-sizing: border-box;
							}

							image {
								width: 20rpx;
								height: 20rpx;
							}
						}
					}

					.status {
						color: #FADAB1;
						font-size: 36rpx;
						font-weight: bold;
					}

					.tips {
						color: #DDDDDD;
						font-size: 24rpx;
					}
				}

				.right_icon {
					width: 20rpx;
					height: 20rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.content {
			padding: 0rpx 30rpx 30rpx;
			box-sizing: border-box;

			.sub_title {
				color: #999999;
				font-size: 24rpx;
				padding: 30rpx 0 35rpx;
				box-sizing: border-box;
			}

			.integral {
				margin-bottom: 60rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.left {
					display: flex;
					align-items: center;

					.icon {
						width: 68rpx;
						height: 68rpx;
					}

					.integral_view {
						flex: 1;
						overflow: hidden;
						display: flex;
						align-items: center;

						text {
							color: #FFFFFF;
							font-size: 40rpx;
							font-weight: bold;
							padding-left: 30rpx;
							padding-right: 10rpx;
							box-sizing: border-box;
						}

						image {
							width: 24rpx;
							height: 24rpx;
						}
					}
				}

				.right {
					display: flex;
					align-items: center;

					text {
						color: #999999;
						font-size: 24rpx;
						padding-right: 10rpx;
						box-sizing: border-box;
					}

					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}

			.list {
				border-radius: 20rpx;
				margin-top: 30rpx;
				padding-top: 40rpx;
				box-sizing: border-box;
				background: #23262F;
				display: flex;
				flex-wrap: wrap;

				.item {
					width: 25%;
					padding-bottom: 40rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					image {
						width: 56rpx;
						height: 56rpx;
					}

					text {
						color: #EEEEEE;
						font-size: 24rpx;
						padding-top: 12rpx;
						box-sizing: border-box;
					}
				}
			}
		}
	}
</style>