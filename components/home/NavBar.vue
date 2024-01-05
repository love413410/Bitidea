<template>
	<view class="navbar">
		<uv-navbar placeholder bgColor="#121212" @leftClick="leftClick" @rightClick="rightClick">
			<template v-slot:left>
				<image src="@/static/images/logo.png" class="nav_img"></image>
			</template>
			<template v-slot:center>
				<view class="nav_title">Bitidea</view>
			</template>
			<template v-slot:right>
				<image src="@/static/images/vip2.png" class="nav_img" v-if="is_vip"></image>
				<image src="@/static/images/vip.png" class="nav_img" v-else></image>
			</template>
		</uv-navbar>
		<Menu ref="menuRef" />
	</view>
</template>

<script setup>
	import Menu from "@/components/home/Menu.vue";
	import {
		ref,
		shallowRef,
		watch
	} from "vue";
	const emit = defineEmits(["leftClick", "rightClick"]);

	const props = defineProps({
		is_vip: String
	});
	const is_vip = ref();
	watch(() => props.is_vip, (n, o) => {
		is_vip.value = n;
	}, {
		immediate: true
	});

	const menuRef = shallowRef(null);
	const leftClick = () => {
		menuRef.value.show = true
	};
	const rightClick = () => {
		emit('rightClick');
	};
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