<template>
	<view class="xl">
		<Model />
		<ImageSize @change="val=>size=val" />
		<Algorithm />
		<Submit @click="submit" />
	</view>
</template>

<script setup>
	import Model from "@/components/draw/components/Model.vue"
	import ImageSize from "@/components/draw/components/ImageSize.vue"
	import Algorithm from "@/components/draw/components/Algorithm.vue"
	import Submit from "@/components/draw/components/Submit.vue"
	import {
		ref
	} from "vue";
	const emit = defineEmits(["submit"]);
	let size = "";
	const submit = () => emit("submit", {size});
</script>

<style scoped lang="scss">
	.xl {}
</style>