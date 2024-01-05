<template>
	<view class="footer">
		<view class="title">其他登录方式</view>
		<view class="list">
			<view class="item" @click="change('wx')" v-if="type!='wx'">
				<image src="@/static/images/l1.png"></image>
			</view>
			<view class="item" @click="change('phone')" v-else>
				<image src="@/static/images/l2.png"></image>
			</view>
		</view>
		<Explain />
	</view>
</template>

<script setup>
	import Explain from "@/components/login/Explain.vue"
	const props = defineProps(["type"]);
	const emit = defineEmits(['change'])
	const change = (value) => emit('change', value);
</script>

<style scoped lang="scss">
	.footer {
		.title {
			color: #999999;
			font-size: 28rpx;
		}

		.list {
			padding: 30rpx 0;
			box-sizing: border-box;
			display: flex;

			.item {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 50rpx;
				background: #23262F;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
</style>