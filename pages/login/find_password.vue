<template>
	<view class="find_password">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
		</uv-navbar>
		<view class="content">
			<Header title="找回密码" />
			<view class="main">
				<view class="item">
					<view class="key">手机号</view>
					<input type="text" placeholder="请输入手机号" v-model="form.phone" class="input">
				</view>
				<view class="item">
					<input type="text" placeholder="请输入验证码" v-model="form.code" class="input">
					<view class="code" v-if="isTimer">{{time}}s</view>
					<view class="code active" v-else @click="getCode(form.phone,'forgot')">发送</view>
				</view>
				<view class="item">
					<view class="key">密码</view>
					<input type="password" placeholder="请输入密码" v-model="form.password" class="input">
				</view>
				<view class="item">
					<view class="key">确认密码</view>
					<input type="password" placeholder="再次输入密码" v-model="form.confirm_password" class="input">
				</view>
				<view class="submit" @click="submit">确认</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Header from "@/components/login/Header.vue"
	import {
		forgot
	} from "@/request/api";
	import {
		ref,
		reactive
	} from "vue";

	import useStore from "@/stores/index.js";
	const {
		useLoginStore
	} = useStore();

	import useEditUser from "@/hooks/useEditUser.js";
	const {
		timer,
		time,
		isTimer,
		getCode
	} = useEditUser();

	const form = reactive({
		phone: "",
		code: "",
		password: "",
		confirm_password: "",
	});
	const submit = async () => {
		await forgot(form);
		uni.$uv.toast("操作成功");
		setTimeout(() => {
			uni.navigateBack();
		}, 1500);
	};
</script>

<style scoped lang="scss">
	.find_password {
		.nav_back {
			width: 40rpx;
			height: 40rpx;
		}

		.content {
			height: calc(100vh - #{$navBarHeight});
			padding: 20rpx 60rpx 0;
			box-sizing: border-box;

			.main {
				padding: 40rpx 0;
				box-sizing: border-box;

				.item {
					width: 630rpx;
					height: 110rpx;
					border-radius: 20rpx;
					margin-bottom: 36rpx;
					padding-left: 45rpx;
					box-sizing: border-box;
					background: #23262F;
					display: flex;

					.key {
						width: 190rpx;
						color: #999999;
						font-size: 36rpx;
						display: flex;
						align-items: center;
					}

					.input {
						height: 100%;
						flex: 1;
						color: #FFFFFF;
						font-size: 36rpx;
					}

					.code {
						height: 100%;
						color: #999999;
						font-size: 36rpx;
						padding: 0 50rpx;
						box-sizing: content-box;

						display: flex;
						align-items: center;

						&.active {
							background: linear-gradient(50deg, #5CE5F9 0%, #9785EA 100%);
							-webkit-background-clip: text;
							-webkit-text-fill-color: transparent;
						}
					}
				}

				.submit {
					width: 630rpx;
					height: 110rpx;
					line-height: 110rpx;
					text-align: center;
					color: #111111;
					font-size: 36rpx;
					font-weight: bold;
					border-radius: 20rpx;
					background: linear-gradient(50deg, #5CE5F9, #9785EA);
				}
			}
		}
	}
</style>