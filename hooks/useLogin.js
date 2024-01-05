const wechat = import.meta.env.VITE_WX_URL;
import {
	login
} from "@/request/api";
import {
	ref,
	reactive
} from "vue";
import {
	storeToRefs
} from 'pinia';
import useStore from "@/stores/index.js";
const {
	useLoginStore
} = useStore();
export default function useLogin() {
	let {
		checkbox
	} = storeToRefs(useLoginStore);

	const form = reactive({
		phone: "",
		password: ""
	});
	const change = () => {
		useLoginStore.changeChekced();
	};
	const submit = async (type) => {
		if (!checkbox.value) {
			uni.$uv.toast("请先阅读并同意协议");
			return false;
		}
		if (type == 'wx') {
			let invitation_code = uni.getStorageSync('invitation');
			let wechat_url = `${wechat}?from=1`;
			if (invitation_code) {
				wechat_url = `${wechat_url}&invitation_code=${invitation_code}`;
			}
			location.href = wechat_url;
		}
		if (type == 'phone') {
			let {
				token
			} = await login(form);
			useLoginStore.changeToken(token);
			uni.switchTab({
				url: '/pages/tabbar/home'
			})
		}
	};
	const router = (url) => {
		uni.navigateTo({
			url
		})
	};
	return {
		form,
		checkbox,
		submit,
		change,
		router
	}
}