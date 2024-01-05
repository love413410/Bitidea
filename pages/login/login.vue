<template>
	<view class="login">
		<!-- <uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
		</uv-navbar> -->
		<!-- <view class="content">
			<Header />
			<component :is="currentComponent" />
			<Footer :type="type" @update:modelValue="change" />
		</view> -->
		<Header title="登录Bitidea" />
		<component :is="currentComponent" />
		<Footer :type="type" @change="change" />
	</view>
</template>

<script setup>
	import Header from "@/components/login/Header.vue"
	import Footer from "@/components/login/Footer.vue"
	import Code from "@/components/login/Code.vue"
	import Phone from "@/components/login/Phone.vue"
	import {
		ref,
		shallowRef
	} from "vue";
	let type = ref("wx");
	const currentComponent = shallowRef(Code);
	const change = (value) => {
		if (value == "wx") {
			currentComponent.value = Code;
		}
		if (value == "phone") {
			currentComponent.value = Phone;
		}
		type.value = value;
	};
</script>

<style scoped lang="scss">
	.login {
		min-height: 100vh;
		padding: 40rpx 60rpx;
		box-sizing: border-box;
		background: $background;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		// .content {
		// 	height: calc(100vh - #{$navBarHeight});
		// 	padding: 30rpx 60rpx 30rpx;
		// 	box-sizing: border-box;
		// }
	}
</style>