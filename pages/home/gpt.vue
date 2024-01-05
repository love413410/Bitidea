<template>
	<view class="nav_bar">
		<uv-navbar placeholder bgColor="#121212" @leftClick="popupRef.open('left')">
			<template v-slot:left>
				<image src="@/static/images/menu.png" class="nav_img"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">Bitidea</view>
			</template>
		</uv-navbar>
		<view class="label">{{name}}</view>

		<scroll-view scroll-y :scroll-top="scrollTop" id="scroll_view" class="scroll_view">
			<view id="list" class="list">
				<view class="item" v-for="item in msg_list">
					<view class="item_view ask">
						<view class="user_info">
							<image :src="avatar" class="avatar"></image>
							<view class="name">{{nickname}}</view>
						</view>
						<view class="item_text">
							{{item.message}}
							<image mode="widthFix" :src="item.images" v-if="item.images"></image>
						</view>
					</view>
					<view class="item_view answer" v-if="item.answer">
						<view class="user_info">
							<image src="@/static/images/logo2.png" class="avatar"></image>
							<view class="name">Bitidea</view>
						</view>
						<view class="item_text">{{item.answer}}</view>
						<view class="oper">
							<view class="oper_item" @click.stop="stop_msg(item)" v-if="item.is_have">
								<image src="@/static/images/btn3.png"></image>
							</view>
							<view class="oper_item" @click="copy(item.answer)">
								<image src="@/static/images/copy2.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="footer">

			<view class="content">
				<textarea class="textarea" v-model="msg" :auto-height="true" :maxlength="-1"
					:disable-default-padding="true" placeholder="请输入内容"></textarea>
				<view class="upload" @click="uploadImage" v-if="model_id==2">
					<image src="@/static/images/upload2.png"></image>
				</view>
			</view>

			<view class="send" @click="submit">
				<image src="@/static/images/send.png"></image>
			</view>

		</view>

		<uv-popup ref="popupRef" bgColor="none">
			<GptMenu :model_id="model_id" @change="change" @delete="menu_delete" />
		</uv-popup>
	</view>
</template>

<script setup>
	const baseApiUrl = import.meta.env.VITE_BASE_URL;
	import GptMenu from "@/components/home/GptMenu.vue"
	import {
		chatIndex,
		chatSend,
		chatStream,
		userInfo,
		upload
	} from "@/request/api";

	import useBase from "@/hooks/useBase.js";
	const {
		copy
	} = useBase();

	import {
		ref,
		shallowRef
	} from "vue";
	import {
		onLoad,
		onUnload
	} from "@dcloudio/uni-app";
	let model_id = ref("");
	let group_id = ref("");
	let name = ref("");

	const msg_list = ref([]);

	const get_once = async () => {
		let res = await chatIndex({
			chat_model_id: model_id.value,
			group_id: group_id.value
		});
		name.value = res.chat_model.name;
		msg_list.value = res.list;
		group_id.value = res.group_id;
		scrollToBottom();

		if (!chat_id) return false;
		send_eventSource();
	};

	const getHistory = async () => {
		let res = await chatIndex({
			chat_model_id: model_id.value,
			group_id: group_id.value
		});
		msg_list.value = res.list;
		group_id.value = res.group_id;
		scrollToBottom();
	};

	let images = "";
	const uploadImage = () => {
		uni.chooseImage({
			success: async (res) => {
				let tempFilePaths = res.tempFilePaths;
				let filePath = tempFilePaths[0];
				let {
					src
				} = await upload({
					filePath
				});
				images = src;
			}
		})
	};
	const msg = ref("");
	let chat_id = "";
	let source = null;

	const send_eventSource = () => {
		source = new EventSource(`${baseApiUrl}/api/chat/stream?id=${chat_id}`);
		let item = msg_list.value.at(-1);
		item.answer = "";
		item.is_have = true;
		source.onmessage = res => {
			if (res.data == '[DONE]') {
				source.close();
				source = null;
				item.is_have = false;
				return false;
			}
			let data = JSON.parse(res.data);
			let delta = data?.choices[0].delta;
			let content = delta?.content;
			if (content && content != "null") {
				item.answer += content;
				scrollToBottom();
			}
		};
		source.onerror = () => {
			source.close();
			source = null;
			item.is_have = false;
		};
	};
	const stop_msg = (item) => {
		source.close();
		source = null;
		item.is_have = false;
	};
	const submit = async () => {
		if (source) {
			uni.$uv.toast("请等待回复完毕");
			return false;
		}
		if (!msg.value) {
			uni.$uv.toast("请输入内容");
			return false;
		}
		let content = msg.value;
		msg.value = "";
		let res = await chatSend({
			chat_model_id: model_id.value,
			group_id: group_id.value,
			content,
			images
		});
		msg_list.value.push({
			message: content,
			images: images,
			answer: "",
			is_have: true
		})
		scrollToBottom();
		images = "";
		if (!group_id.value) {
			group_id.value = res.group_id;
		}
		chat_id = res.chat_id;

		send_eventSource();
		// const source = new EventSource(`${baseApiUrl}/api/chat/stream?id=${chat_id}`);
		// msg_list.value.push({
		// 	message: content,
		// 	answer: ""
		// })
		// scrollToBottom();
		// let item = msg_list.value.at(-1);
		// source.onmessage = res => {
		// 	if (res.data == '[DONE]') {
		// 		source.close();
		// 		return false;
		// 	}
		// 	let data = JSON.parse(res.data);
		// 	let delta = data?.choices[0].delta;
		// 	let content = delta?.content;
		// 	if (content && content != "null") {
		// 		item.answer += content;
		// 		scrollToBottom();
		// 	}
		// };
		// source.onerror = () => source.close();
	};

	const popupRef = shallowRef();
	const open = () => {
		popupRef.value.open('left');
	};
	const change = (item) => {
		model_id.value = String(item.chat_model_id);
		group_id.value = String(item.id);
		popupRef.value.close();
		getHistory();
	};
	const menu_delete = (id) => {
		if (id != group_id.value) return false;
		group_id.value = "";
		msg_list.value = [];
	};

	const scrollTop = ref(0);
	const scrollToBottom = () => {
		setTimeout(() => {
			const query = uni.createSelectorQuery().in(this);
			query.select('#scroll_view').boundingClientRect();
			query.select('#list').boundingClientRect();
			query.exec(res => {
				let h1 = res[0].height;
				let h2 = res[1].height;
				if (h2 <= h1) return false;
				scrollTop.value = h2 - h1 + 60;
			});
		}, 0);
	};

	const avatar = ref("");
	const nickname = ref("");
	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		avatar.value = user.head_portrait;
		nickname.value = user.nickname;
	};
	getUserInfo();

	onLoad(options => {
		model_id.value = options.id;
		group_id.value = options.group_id ?? "";
		chat_id = options.chat_id ?? "";
		get_once();
	});
	onUnload(() => {
		if (!source) return;
		source.close();
		source = null;
	});
</script>

<style scoped lang="scss">
	.nav_bar {
		height: calc(100vh - var(--window-top));
		background: $background;
		position: relative;

		.nav_title {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
		}

		.nav_img {
			width: 40rpx;
			height: 40rpx;
		}

		.label {
			width: 260rpx;
			height: 50rpx;
			line-height: 50rpx;
			color: #FFFFFF;
			font-size: 28rpx;
			padding-left: 28rpx;
			box-sizing: border-box;
			background: url(@/static/images/label3.png) no-repeat;
			background-size: 100% 100%;
			position: fixed;
			right: 0;
			top: calc(#{$navBarHeight} + 32rpx);
			z-index: 99;
		}

		.scroll_view {
			height: calc(100vh - #{$navBarHeight} - 100rpx);

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

		.footer {
			width: 100%;
			min-height: 100rpx;
			padding: 14rpx 30rpx;
			box-sizing: border-box;
			background: #121212;
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 2;

			.content {
				flex: 1;
				width: 580rpx;
				border: 1px solid #343740;
				border-radius: 36rpx;
				padding: 0 30rpx;
				box-sizing: border-box;

				background: rgba(52, 55, 64, 0.3);
				overflow: hidden;
				display: flex;
				align-items: center;


				.textarea {
					flex: 1;
					color: #999999;
					font-size: 28rpx;
					padding: 20rpx;
					box-sizing: content-box;
					max-height: 180rpx;

					:deep() {
						.uni-textarea-wrapper {
							max-height: 180rpx;
						}
					}
				}

				.upload {
					width: 40rpx;
					height: 40rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.send {
				width: 100rpx;
				height: 60rpx;
				padding-left: 40rpx;
				box-sizing: border-box;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

	}
</style>