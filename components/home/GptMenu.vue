<template>
	<view class="gpt_menu">
		<view class="content">
			<view class="add_view" @click="add_msg">
				<image src="@/static/images/add.png"></image>
				<text>新对话</text>
			</view>
			<scroll-view scroll-y class="scroll_view">
				<view class="list">
					<view class="title">今天</view>
					<view class="item" v-for="item in list" :key="item.id" @click="change(item)">
						<view class="name" v-if="edit_id!=item.id">{{item.title}}</view>
						<input type="text" v-model="item.title" focus class="name" v-else />
						<view class="oper">
							<view class="icon" @click.stop="edit_click(item)">
								<image src="@/static/images/gpt_edit.png"></image>
							</view>
							<view class="icon" @click.stop="delete_group(item.id)">
								<image src="@/static/images/gpt_delete.png"></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="menu_footer">
				<view class="clear" @click="clear_msg">清空所有聊天记录</view>
				<view class="integral">
					<image src="@/static/images/jf.png"></image>
					<view class="balance">
						<text class="key">积分：</text>
						<text class="value">{{integral_val}}</text>
					</view>
				</view>
				<view class="oper">
					<view class="item" @click="reLoad">
						<view class="icon">
							<image src="@/static/images/gpt1.png"></image>
						</view>
						<text>刷新</text>
					</view>
					<view class="item" @click="router('/pages/my/recharge_integral')">
						<view class="icon">
							<image src="@/static/images/gpt2.png"></image>
						</view>
						<text>充值</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		chatGroup,
		chatGroupNew,
		chatGroupEdit,
		chatGroupDel,
		chatGroupEmpty
	} from "@/request/api";

	import useBase from "@/hooks/useBase.js";
	const {
		router
	} = useBase();

	import {
		onReady
	} from "@dcloudio/uni-app";

	import {
		ref
	} from "vue";
	const emit = defineEmits(["change", "delete"]);
	const props = defineProps({
		list: Array,
		model_id: String
	});
	const list = ref([]);
	const integral_val = ref("");

	const getList = async () => {
		let {
			group,
			integral
		} = await chatGroup({
			chat_model_id: props.model_id
		});
		list.value = group;
		integral_val.value = integral;
	};
	getList();

	const add_msg = async () => {
		let {
			group_id,
			group_all
		} = await chatGroupNew({
			chat_model_id: props.model_id
		});
		uni.$uv.toast("操作成功");
		let dataItem = group_all.find(item => item.id = group_id);
		emit("change", dataItem);
		getList();
	};

	const reLoad = () => {
		uni.$uv.toast("操作成功");
		getList();
	};
	const change = item => {
		if (edit_id.value) return false;
		emit("change", item);
	};

	const edit_id = ref("");
	const edit_click = async (item) => {
		if (!edit_id.value) {
			edit_id.value = item.id;
			return false;
		}
		await chatGroupEdit({
			id: item.id,
			name: item.title
		});
		uni.$uv.toast("操作成功");
		edit_id.value = "";
	};
	const delete_group = async (id) => {
		await chatGroupDel({
			id
		});
		uni.$uv.toast("操作成功");
		getList();
		emit("delete", id);
	};
	const clear_msg = async () => {
		await chatGroupEmpty();
		uni.$uv.toast("操作成功");
		list.value = [];
	};
</script>

<style scoped lang="scss">
	.gpt_menu {
		width: 400rpx;
		height: 100vh;
		padding-top: $navBarHeight;
		box-sizing: border-box;

		.content {
			height: calc(100vh - #{$navBarHeight});
			padding: 30rpx;
			box-sizing: border-box;
			background: #232327;

			.add_view {
				width: 100%;
				height: 68rpx;
				border-radius: 5rpx;
				border: 2px solid #393940;
				box-sizing: border-box;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 40rpx;
					height: 40rpx;
				}

				text {
					color: #FFFFFF;
					font-size: 28rpx;
					font-weight: 400;
					padding-left: 5rpx;
					box-sizing: border-box;
				}
			}

			.scroll_view {
				height: calc(100vh - #{$navBarHeight} - 60rpx - 68rpx - 250rpx);
				padding: 20rpx 0;
				box-sizing: border-box;

				.list {
					.title {
						height: 76rpx;
						line-height: 76rpx;
						color: #FFFFFF;
						font-size: 28rpx;
						font-weight: bold;
						background: linear-gradient(50deg, #5CE5F9 0%, #9785EA 100%);
						-webkit-background-clip: text;
						-webkit-text-fill-color: transparent;
					}

					.item {
						height: 68rpx;
						display: flex;
						border-radius: 5rpx;
						margin-bottom: 20rpx;
						padding: 0 14rpx 0 24rpx;
						box-sizing: border-box;
						background: #1E1E22;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.name {
							flex: 1;
							color: #FFFFFF;
							font-size: 28rpx;
							font-weight: 400;
							white-space: nowrap;
							text-overflow: ellipsis;
							overflow: hidden;

							&:focus {
								border: none;
								outline: none;
							}
						}

						.oper {
							display: flex;

							.icon {
								margin-left: 22rpx;

								image {
									width: 40rpx;
									height: 40rpx;
								}
							}
						}
					}
				}
			}

			.menu_footer {
				height: 250rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.clear {
					height: 60rpx;
					color: #999999;
					font-size: 24rpx;
					font-weight: 400;
					border-radius: 5rpx;
					border: 2px solid #393940;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.integral {
					height: 60rpx;
					border-radius: 5rpx;
					padding: 0 10rpx;
					box-sizing: border-box;
					background: #1E1E22;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
					}

					.balance {
						display: flex;
						padding-left: 12rpx;
						box-sizing: border-box;

						.key {
							color: #FFFFFF;
							font-size: 32rpx;
						}

						.value {
							color: #FFFFFF;
							font-size: 32rpx;
						}
					}
				}

				.oper {
					display: flex;
					justify-content: space-between;

					.item {
						width: 160rpx;
						height: 60rpx;
						border-radius: 5rpx;
						border: 2px solid #393940;
						padding-left: 14rpx;
						padding-right: 30rpx;
						box-sizing: border-box;
						display: flex;
						justify-content: space-between;
						align-items: center;

						.icon {
							width: 40rpx;
							height: 40rpx;

							image {
								width: 100%;
								height: 100%;
							}
						}

						text {
							color: #999999;
							font-size: 28rpx;
						}
					}
				}
			}
		}
	}
</style>