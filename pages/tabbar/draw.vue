<template>
	<view class="draw">
		<NavBar @leftClick="menuRef.show = true"></NavBar>
		<Tabs :list="type_list" :active="type" @change="change" />
		<WayTabs :list="way_list" :active="way" @change="val=>way=val" />
		<UploadImage v-model:refer="refer" v-if="way==2" />
		<Desc v-model:prompt="prompt" />
		<Side />
		<component :is="currentComponent" :data="props_data" :type="way" @submit="submit"></component>
		<uv-popup ref="popupRef" bgColor="none">
			<component :is="popupComponent" @close="popupRef.close" />
		</uv-popup>
	</view>
</template>

<script setup>
	import NavBar from "@/components/draw/NavBar.vue"
	import Tabs from "@/components/draw/components/Tabs.vue"
	import WayTabs from "@/components/draw/components/WayTabs.vue"
	import UploadImage from "@/components/draw/components/UploadImage.vue"
	import Desc from "@/components/draw/components/Desc.vue"
	import Side from "@/components/draw/components/Side.vue"

	import Popup from "@/components/draw/Popup.vue"
	import Mask from "@/components/draw/Mask.vue"

	import Mj from "@/components/draw/Mj.vue"
	import Sd from "@/components/draw/Sd.vue"
	import Xl from "@/components/draw/Xl.vue"

	import {
		drawIndex,
		drawGenerate
	} from "@/request/api";

	import {
		onLoad,
		onHide
	} from "@dcloudio/uni-app";

	import {
		ref,
		reactive,
		shallowRef,
		provide
	} from "vue";

	const type_list = ref({}),
		type = ref("");

	const way_list = ref({}),
		way = ref("");

	const prompt = ref("");
	const refer = ref("");

	let need_integral = ref(0);
	let props_mj = {
		mj_model: {},
		draw_style: [],
		scene_modification: {}
	};
	let props_dream = {
		sd_model: {},
		sd_style: [],
		size: {}
	};
	const props_data = ref({});

	const getList = async () => {
		let res = await drawIndex();

		type_list.value = res.type;
		let keys = Object.keys(res.type);
		type.value = keys.length ? keys[0] : "";

		way_list.value = res.way;
		keys = Object.keys(res.way);
		way.value = keys.length ? keys[0] : "";

		let {
			mj_model,
			draw_style,
			sd_model,
			sd_style,
			size,
			scene_modification
		} = res;

		props_mj = {
			mj_model,
			draw_style,
			scene_modification,
			size
		};
		props_dream = {
			sd_model,
			sd_style,
			size
		};
		need_integral.value = res.need_integral;

		change(type.value);
	};
	provide("need_integral", need_integral);

	const currentComponent = shallowRef();
	const popupComponent = shallowRef();
	const popupRef = shallowRef();
	const change = (value) => {
		if (value == 1) {
			props_data.value = props_mj;
			currentComponent.value = Mj;
			type.value = value;
		}
		if (value == 2) {
			props_data.value = props_dream;
			currentComponent.value = Sd;
			type.value = value;

			popupComponent.value = Popup;
			popupRef.value.open();
		}
		if (value == 3) {
			// currentComponent.value = Xl;
			uni.$uv.toast("敬请期待");
		}
	};
	const submit = async (data = {}) => {
		let params = {
			type: type.value,
			way: way.value,
			prompt: prompt.value,
			refer: refer.value,
			...data
		};
		popupComponent.value = Mask;
		popupRef.value.open();

		await drawGenerate(params);
		refer.value = "";
		prompt.value = "";
		popupRef.value.close();
		uni.$uv.toast("操作成功");
	};
	onLoad(() => getList());
	onHide(() => popupRef.value.close());
</script>

<style scoped lang="scss">
	.draw {
		min-height: calc(100vh - var(--window-top) - var(--window-bottom));
		padding: 0rpx 30rpx 140rpx;
		box-sizing: border-box;
		background: $background;
		position: relative;

		:deep() {
			.submit {
				width: 100%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				color: #111111;
				font-size: 32rpx;
				font-weight: bold;
				border-radius: 20rpx;
				margin-top: 140rpx;
				background: linear-gradient(50deg, #5CE5F9, #9785EA);
			}
		}
	}
</style>