<template>
	<view class="register">
		<uv-navbar bgColor="#121212" placeholder autoBack>
			<template v-slot:left>
				<image src="@/static/images/back.png" class="nav_back"></image>
			</template>
		</uv-navbar>
		<view class="content">
			<Header title="注册Bitidea" />
			<Main />
			<Explain />
		</view>
	</view>
</template>

<script setup>
	import Header from "@/components/login/Header.vue"
	import Main from "@/components/login/Main.vue"
	import Explain from "@/components/login/Explain.vue"
</script>

<style scoped lang="scss">
	.register {
		min-height: 100vh;
		background: $background;

		.nav_back {
			width: 40rpx;
			height: 40rpx;
		}

		.content {
			height: calc(100vh - #{$navBarHeight});
			padding: 20rpx 60rpx 0;
			box-sizing: border-box;
		}
	}
</style>