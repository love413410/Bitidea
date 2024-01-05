<template>
	<view class="report">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">{{app_info.name}}</view>
			</template>
		</uv-navbar>
		<scroll-view scroll-y class="scroll_view">
			<view class="header">
				<view class="cover">
					<image :src="app_info.logo"></image>
				</view>
				<view class="header_view">
					<view class="key">{{app_info.name}}</view>
					<view class="value">{{app_info.synopsis}}</view>
				</view>
			</view>
			<Title>表单填写</Title>

			<uv-form labelPosition="top" labelWidth="auto" :model="model" :rules="rules" :labelStyle="customStyle"
				ref="form">
				<view class="content">
					<template v-for="(item,index) in list">
						<uv-form-item :label="item.problem" :required="item.not_null==1" :prop="item.variable">
							<uv-input v-model="model[item.variable]" :placeholder="item.placeholder" border="none"
								color="#fff">
							</uv-input>
						</uv-form-item>
					</template>
				</view>
				<Title>模型选择</Title>
				<view class="tabs">
					<view class="item" :class="type==1?'active':''">GPT3.5</view>
					<view class="item" :class="type==2?'active':''">GPT4.0</view>
				</view>
				<view class="submit">
					<view @click="submit">立即开始</view>
				</view>
			</uv-form>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		applicationInfo,
		applicationArticle
	} from "@/request/api";
	import Title from "@/components/common/Title.vue";
	import useBase from "@/hooks/useBase.js";
	const {
		router
	} = useBase();
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {
		ref,
		shallowRef
	} from "vue";

	const type = ref(1);

	const app_info = ref({
		logo: "",
		name: "",
		synopsis: "",
	});
	const customStyle = ref({
		color: "#fff",
		fontSize: "28rpx",
		fontWeight: "bold"
	});

	const form = shallowRef();
	const model = ref({});
	const list = ref([]);
	const rules = ref({});

	let task_id = "";
	onLoad(async ({
		id
	}) => {
		task_id = id;
		let {
			application_problem,
			info
		} = await applicationInfo({
			id
		});
		let temp_rules = {},
			temp_model = {};
		application_problem.forEach(item => {
			if (item.not_null != 1) return false;
			temp_rules[item.variable] = {
				type: 'string',
				required: true,
				message: item.placeholder,
				trigger: ['blur', 'change']
			};
			temp_model[item.variable] = "";
		});
		app_info.value = info;
		list.value = application_problem;
		rules.value = temp_rules;
		model.value = temp_model;
	});
	const submit = async () => {
		uni.showLoading({
			title: ''
		});
		let res = await applicationArticle({
			id: task_id,
			...model.value
		});
		let id = res.application_article_id;
		uni.hideLoading();
		uni.$uv.toast("操作成功");
		setTimeout(() => {
			router(`/pages/app/report_res?id=${id}`);
		}, 1500);
	};
</script>

<style scoped lang="scss">
	.report {
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

		.scroll_view {
			height: calc(100vh - #{$navBarHeight});
			padding: 30rpx 30rpx 0;
			box-sizing: border-box;

			.header {
				width: 100%;
				height: 150rpx;
				padding: 30rpx;
				box-sizing: border-box;
				background: url(@/static/images/bg8.png) no-repeat;
				background-size: 100% 100%;
				display: flex;

				.cover {
					background: rgba(30, 30, 34, .2);

					image {
						width: 90rpx;
						height: 90rpx;
						border-radius: 10rpx;
					}
				}

				.header_view {
					flex: 1;
					padding-left: 20rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.key {
						color: #FFFFFF;
						font-size: 32rpx;
						font-weight: bold;
					}

					.value {
						color: #999999;
						font-size: 24rpx;
					}
				}
			}

			.content {
				border-radius: 20rpx;
				padding: 0 30rpx 120rpx;
				box-sizing: border-box;
				background: #23262F;

				:deep() {
					.uv-form-item__body__left {
						padding-bottom: 32rpx;
						display: flex;
						align-items: center;
					}

					.uv-form-item__body {
						border-bottom: 1px solid #393940;
						padding: 40rpx 0;
						box-sizing: border-box;
					}
				}
			}

			.tabs {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.item {
					width: 335rpx;
					height: 72rpx;
					color: #EEEEEE;
					font-size: 24rpx;
					font-weight: 400;
					border-radius: 16rpx;
					background: #1E1E22;
					display: flex;
					justify-content: center;
					align-items: center;

					&.active {
						position: relative;

						&::after {
							content: "";
							width: 100%;
							height: 100%;
							background: url(@/static/images/xzk4.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							left: 0;
							top: 0;
							z-index: 2;
						}
					}
				}
			}

			.submit {
				width: 100%;
				padding: 140rpx 0 100rpx;

				view {
					width: 100%;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					color: #111111;
					font-size: 32rpx;
					font-weight: bold;
					border-radius: 20rpx;
					background: linear-gradient(50deg, #5CE5F9, #9785EA);
				}
			}
		}
	}
</style>