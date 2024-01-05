<template>
	<view class="mj_view">
		<Model :list="mj_model" v-model:active="form.model" />
		<Art :list="draw_style" v-model:active="form.draw_style_id" />
		<Scene :list="scene_modification" v-model:active="form.scene_modification" />
		<ImageSize :list="size" v-model:active="form.size" />
		<Submit @click="submit" />
	</view>
</template>

<script setup>
	import Model from "@/components/draw/components/Model.vue"
	import Art from "@/components/draw/components/Art.vue"
	import Scene from "@/components/draw/components/Scene.vue"
	import ImageSize from "@/components/draw/components/ImageSize.vue"
	import Submit from "@/components/draw/components/Submit.vue"
	import {
		reactive
	} from "vue";
	const props = defineProps({
		data: Object
	});
	const emit = defineEmits(["submit"]);

	let {
		mj_model,
		draw_style,
		scene_modification,
		size
	} = props.data;

	let keys = Object.keys(mj_model);
	let model = keys.length ? keys[0] : "";
	let draw_style_id = draw_style.length ? draw_style[0].id : "";

	keys = Object.keys(scene_modification);
	let scene_id = keys.length ? keys[0] : "";

	keys = Object.keys(size);
	let value = keys.length ? keys[0] : "";
	const form = reactive({
		model,
		draw_style_id,
		scene_modification: scene_id,
		size: value
	});
	// const submit = () =>{
	// 	console.log(form)
	// };
	const submit = () => emit("submit", form);
</script>

<style>
</style>