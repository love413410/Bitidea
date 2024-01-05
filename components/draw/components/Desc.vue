<template>
	<Title>绘画描述</Title>
	<view class="desc">
		<view class="content">
			<view class="desc_head">
				<uv-icon name="edit-pen-fill" color="#FFFFFF" size="24" v-if="!prompt"></uv-icon>
				<uv-textarea v-model="prompt" :maxlength="-1" autoHeight :placeholder="props.placeholder"
					:textStyle="{color:'#fff'}" :customStyle="textStyle" border="none" @input="change"></uv-textarea>
			</view>
			<view class="tips">
				<slot name="tips">支持中英文描述，注意不要在此填入性感、血腥等内容敏感词，否则不会出图~</slot>
			</view>
		</view>
		<view class="clear">
			<view class="btn" @click="empty">
				<image src="@/static/images/qc.png"></image>
				<text>清空</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		ref,
		watch
	} from "vue";
	const emit = defineEmits(["update:prompt"]);
	const props = defineProps({
		placeholder: {
			type: String,
			default: "输入您所描述的画面"
		},
		prompt: {
			type: String,
			default: ""
		}
	});
	const prompt = ref("");
	watch(() => props.prompt, (n) => {
		prompt.value = n;
	});
	const textStyle = ref({
		background: "transparent"
	});
	const change = (e) => emit("update:prompt", e);
	const empty = () => {
		prompt.value = "";
		emit("update:prompt", prompt);
	};
</script>

<style scoped lang="scss">
	.desc {
		min-height: 280rpx;
		border-radius: 16rpx;
		padding: 30rpx 30rpx 20rpx;
		box-sizing: border-box;
		background: #1E1E22;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.desc_head {
			display: flex;
			align-items: center;

			text {
				color: #FFFFFF;
				font-size: 28rpx;
				padding-left: 10rpx;
				box-sizing: border-box;
			}
		}

		.tips {
			line-height: 36rpx;
			color: #999999;
			font-size: 24rpx;
			font-weight: 400;
			padding-top: 27rpx;
			box-sizing: border-box;
		}

		.clear {
			display: flex;
			justify-content: flex-end;

			.btn {
				width: 120rpx;
				height: 44rpx;
				border-radius: 22rpx;
				border: 1px solid #47474A;
				box-sizing: border-box;
				background: #242428;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 24rpx;
					height: 24rpx;
				}

				text {
					color: #666666;
					font-size: 24rpx;
					font-weight: 400;
					padding-left: 12rpx;
					box-sizing: border-box;
				}
			}
		}
	}
</style>