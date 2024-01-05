<template>
	<view class="navbar">
		<uv-navbar placeholder bgColor="#121212" @leftClick="leftClick" @rightClick="rightClick">
			<template v-slot:left>
				<image src="@/static/images/xz.png" class="nav_img"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">Bitidea</view>
			</template>
		</uv-navbar>
		<Menu ref="menuRef" />
	</view>
</template>

<script setup>
	import Menu from "@/components/draw/Menu.vue"
	import {
		shallowRef
	} from "vue";
	const emit = defineEmits(["leftClick", "rightClick"]);

	const menuRef = shallowRef(null);
	const leftClick = () => menuRef.value.show = true;
	const rightClick = () => {
		emit('rightClick');
	}
</script>

<style scoped lang="scss">
	.navbar {
		position: relative;

		.nav_title {
			color: #FFFFFF;
			font-size: 36rpx;
			font-weight: bold;
		}

		.nav_img {
			width: 44rpx;
			height: 44rpx;
		}
	}
</style>