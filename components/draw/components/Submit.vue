<template>
	<view class="submit">生成画作（{{need_integral}}积分）</view>
</template>

<script setup>
	import {
		inject
	} from "vue";
	const need_integral = inject("need_integral");
</script>

<style>
</style>