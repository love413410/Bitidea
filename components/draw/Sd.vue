<template>
	<view class="draw_dream">
		<Styles :text="model" :style="style" @model="model_click" @style="style_click" />
		<Amplitude v-model:value="form.denoising_strength" v-if="type==2" />
		<ImageSize :list="size" v-model:active="form.size" />
		<StepNumber v-model:value="form.sd_setps" />
		<Desc placeholder="负向关键词（选填）" v-model:prompt="form.negative_prompt">
			<template #tips>
				支持中英文描述，只需要填入不想在图片中生成的内容，不需要在提示词前写“不要”
			</template>
		</Desc>
		<Submit @click="submit" />
		<uv-picker ref="pickerRef" keyName="value" :columns="columns" @confirm="confirm"></uv-picker>
	</view>
</template>

<script setup>
	import Styles from "@/components/draw/components/Style.vue"
	import Amplitude from "@/components/draw/components/Amplitude.vue"
	import ImageSize from "@/components/draw/components/ImageSize.vue"
	import StepNumber from "@/components/draw/components/StepNumber.vue"
	import Desc from "@/components/draw/components/Desc.vue"
	import Submit from "@/components/draw/components/Submit.vue"

	import {
		ref,
		reactive,
		shallowRef
	} from "vue";

	const props = defineProps({
		data: Object,
		type: [Number, String]
	});
	const emit = defineEmits(["submit"]);
	let {
		sd_model,
		sd_style,
		size
	} = props.data;

	let keys = Object.keys(size);
	let value = keys.length ? keys[0] : "";

	const form = reactive({
		denoising_strength: 0.01,
		size: value,
		sd_setps: 20,
		negative_prompt: ""
	});

	const pickerRef = shallowRef(),
		columns = ref([]);

	let record = "model";

	const model = ref(""),
		style = ref("");

	let sd_list = [],
		model_id = "",
		style_id = ref("");

	const model_click = () => {
		record = "model";
		columns.value = [sd_list];
		let index = sd_list.findIndex(item => model_id == item.key);
		pickerRef.value.setIndexs([index], true);
		pickerRef.value.open();
	};

	const style_click = () => {
		record = "style";
		columns.value = [sd_style];
		let index = sd_style.findIndex(item => style_id == item.key);
		pickerRef.value.setIndexs([index], true);
		pickerRef.value.open();
	};

	const createModel = () => {
		let sd_keys = Object.keys(sd_model);
		let list = [];
		sd_keys.forEach(key => {
			list.push({
				key,
				value: sd_model[key]
			})
		});
		sd_list = list;

		let dataItem = list.length ? list[0] : null;
		model.value = dataItem?.value;
		model_id = dataItem?.key;

		dataItem = sd_style.length ? sd_style[0] : null;
		style.value = dataItem?.value;
		style_id = dataItem?.key;
	};
	createModel();

	const confirm = ({
		value
	}) => {
		let item = value[0];
		if (record == "model") {
			model.value = item?.value;
			model_id = item?.key;
		}
		if (record == "style") {
			style.value = item?.value;
			style_id = item?.key;
		}
	};
	const submit = () => {
		form.model = model_id;
		form.sd_style = style_id;
		emit("submit", form);
	};
</script>

<style>
</style>