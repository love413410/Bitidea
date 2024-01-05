<template>
	<view class="change">
		<uv-navbar bgColor="#121212" placeholder @leftClick="backRouter">
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">个人信息</view>
			</template>
		</uv-navbar>
		<view class="content">
			<view class="list">
				<view class="avatar_box" @click="uploadAvatar">
					<view class="avatar">
						<image :src="user_info.head_portrait"></image>
					</view>
					<view class="avatar_text">头像</view>
					<view class="right">
						<image src="@/static/images/r1.png"></image>
					</view>
				</view>
				<view class="item" @click="open('nikename')">
					<view class="key">昵称</view>
					<view class="value">
						<text>{{user_info.nickname}}</text>
						<image src="@/static/images/r1.png"></image>
					</view>
				</view>
				<view class="item">
					<view class="key">用户ID</view>
					<view class="value" @click.stop="copy(user_info.id)">
						<text>{{user_info.id}}</text>
						<image src="@/static/images/copy.png" class="copy"></image>
					</view>
				</view>
				<view class="item" @click="open('phone')">
					<view class="key">手机号</view>
					<view class="value">
						<text>{{user_info.phone}}</text>
						<image src="@/static/images/r1.png"></image>
					</view>
				</view>
				<view class="item">
					<view class="key">注册时间</view>
					<view class="value">
						<text>{{user_info.created_at}}</text>
					</view>
				</view>
				<view class="item">
					<view class="key">微信绑定</view>
					<view class="value" v-if="user_info.openid">
						<text>已绑定</text>
					</view>
					<view class="value" @click="open('wx')" v-else>
						<text>未绑定</text>
					</view>
				</view>
				<view class="item" @click="open('password')">
					<view class="key">登录密码</view>
					<view class="value">
						<image src="@/static/images/r1.png"></image>
					</view>
				</view>
			</view>
			<view class="out_login">
				<view @click="out_login">退出登录</view>
			</view>
		</view>
		<uv-popup ref="popupRef" bgColor="none">
			<component :is="currentComponent" :user_info="user_info" @close="onClose"></component>
		</uv-popup>
	</view>
</template>

<script setup>
	import {
		userInfo,
		upload,
		userEdit,
		userBindWechat
	} from "@/request/api";
	import NikeName from "@/components/my/NikeName.vue"
	import Phone from "@/components/my/Phone.vue"
	import Empower from "@/components/login/Empower.vue"
	import Password from "@/components/my/Password.vue"

	import useBase from "@/hooks/useBase.js";
	import useMy from "@/hooks/useMy.js";
	const {
		copy
	} = useBase();
	const {
		user_info
	} = useMy();

	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref,
		shallowRef
	} from "vue";
	import useStore from "@/stores/index.js";
	const {
		useLoginStore
	} = useStore();

	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		user_info.value = user;
	};

	const popupRef = shallowRef();
	const currentComponent = shallowRef(NikeName);
	const open = (value) => {
		if (value == 'nikename') {
			currentComponent.value = NikeName;
		}
		if (value == 'phone') {
			currentComponent.value = Phone;
		}
		if (value == 'wx') {
			currentComponent.value = Empower;
		}
		if (value == 'password') {
			currentComponent.value = Password;
		}
		popupRef.value.open('center');
	};
	const onClose = () => {
		popupRef.value.close();
		getUserInfo();
	};
	const uploadAvatar = async () => {
		uni.chooseImage({
			count: 1,
			success: async (res) => {
				let tempFilePaths = res.tempFilePaths;
				let filePath = tempFilePaths[0];
				let {
					src
				} = await upload({
					filePath
				});
				user_info.value.head_portrait = src;
				await userEdit({
					head_portrait: src
				});
				uni.$uv.toast("操作成功");
			}
		})
	};
	const backRouter = () => {
		uni.switchTab({
			url: "/pages/tabbar/my"
		})
	};
	const out_login = () => {
		uni.$uv.toast("操作成功");
		setTimeout(() => {
			useLoginStore.outLogin();
		}, 1000);
	};
	onLoad(async (optiops) => {
		const code = useLoginStore.codecode || optiops.codecode;
		getUserInfo();
		if (!code) return false;
		await userBindWechat({
			code
		});
		uni.$uv.toast("微信绑定成功");
		getUserInfo();
	});
</script>

<style scoped lang="scss">
	.change {
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

		.content {
			padding: 40rpx 20rpx;
			box-sizing: border-box;

			.list {
				border-radius: 20rpx;
				padding: 0 30rpx;
				box-sizing: border-box;
				background: #23262F;
				overflow: hidden;

				.avatar_box {
					width: 100%;
					height: 200rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.avatar {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
						overflow: hidden;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.avatar_text {
						flex: 1;
						color: #FFFFFF;
						font-size: 28rpx;
						padding-left: 40rpx;
						box-sizing: border-box;
					}

					.right {
						width: 24rpx;
						height: 24rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.item {
					height: 120rpx;
					border-top: 1px solid #393940;
					box-sizing: content-box;
					background: #23262F;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.key {
						color: #FFFFFF;
						font-size: 28rpx;
					}

					.value {
						display: flex;
						align-items: center;

						text {
							color: #999999;
							font-size: 28rpx;
						}

						image {
							width: 24rpx;
							height: 24rpx;
							margin-left: 30rpx;

							&.copy {
								width: 28rpx;
								height: 28rpx;
							}
						}
					}
				}
			}
		}

		.out_login {
			padding-top: 100rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: center;

			view {
				width: 340rpx;
				height: 68rpx;
				color: #999999;
				font-size: 24rpx;
				font-weight: 400;
				border-radius: 5rpx;
				border: 2px solid #393940;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>