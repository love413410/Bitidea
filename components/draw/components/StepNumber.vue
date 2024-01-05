<template>
	<view class="step_number">
		<Title>训练步数</Title>
		<view class="content">
			<view class="tips">步数是生成图的迭代步数，建议使用默认</view>
			<uv-number-box step="1" min="20" max="100" integer v-model="value" @overlimit="overlimit" @change="change">
				<template v-slot:minus>
					<view class="btn_view">
						<image src="@/static/images/btn1.png"></image>
					</view>
				</template>
				<template v-slot:input>
					<input type="text" placeholder="输入步长" disabled v-model="value" class="value">
				</template>
				<template v-slot:plus>
					<view class="btn_view">
						<image src="@/static/images/btn2.png"></image>
					</view>
				</template>
			</uv-number-box>
		</view>
	</view>
</template>

<script setup>
	import Title from "@/components/common/Title.vue";
	import {
		ref
	} from "vue";
	const props = defineProps({
		value: [String, Number]
	});
	const emit = defineEmits(["update:value"]);
	const value = ref(props.value);
	const change = ({
		value
	}) => emit("update:value", value);

	const overlimit = (type) => {
		if (type == "minus") {
			uni.$uv.toast("已经是最小值了");
		}
		if (type == "plus") {
			uni.$uv.toast("已经是最大值了");
		}
	};
</script>

<style scoped lang="scss">
	.step_number {
		.content {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.tips {
				color: #999999;
				font-size: 24rpx;
				font-weight: 400;
				margin-bottom: 30rpx;
			}

			.value {
				width: 250rpx;
				height: 72rpx;
				text-align: center;
				color: #666666;
				font-size: 32rpx;
				font-weight: bold;
				margin: 0 10rpx;
				border-radius: 16rpx;
				background: #1E1E22;
			}

			.btn_view {
				width: 72rpx;
				height: 72rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>