<template>
	<view class="upload_image">
		<Title>参考图</Title>
		<view class="content" @click="upload_image">
			<view class="cover" v-if="url">
				<!-- <image src="@/static/test/1.jpg" mode="widthFix"></image> -->
				<image :src="url" mode="widthFix"></image>
			</view>
			<view class="oper" v-else>
				<image src="@/static/images/upload.png"></image>
				<text>点击上传图片</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		upload
	} from "@/request/api";
	import Title from "@/components/common/Title.vue";
	import {
		ref,
		watch,
		onUnmounted
	} from "vue";
	const emit = defineEmits(["update:refer"]);
	const props = defineProps({
		refer: {
			type: String,
			default: ""
		}
	});
	const url = ref("");
	watch(() => props.refer, (n) => {
		url.value = n;
	});
	const upload_image = () => {
		uni.chooseImage({
			success: async (res) => {
				let tempFilePaths = res.tempFilePaths;
				let filePath = tempFilePaths[0];
				let {
					src
				} = await upload({
					filePath
				});
				url.value = src;
				emit("update:refer", src);
			}
		})
	};
	onUnmounted(() => emit("update:refer", ""));
</script>

<style scoped lang="scss">
	.upload_image {
		.content {
			.oper {
				height: 280rpx;
				border-radius: 16rpx;
				background: #1E1E22;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				image {
					width: 60rpx;
					height: 60rpx;
					margin-bottom: 16rpx;
				}

				text {
					color: #FFFFFF;
					font-size: 24rpx;
				}
			}

			.cover {
				width: 100%;

				image {
					width: 100%;
					border-radius: 10rpx;
				}
			}
		}
	}
</style>