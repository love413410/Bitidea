import {
	ref
} from "vue";
import {
	userOrderPlace,
	userInfo
} from "@/request/api";

import useWechat from "@/hooks/useWechat.js";
const {
	wxPay
} = useWechat();

export default function useMy() {
	const user_info = ref({
		head_portrait: "",
		id: "",
		nickname: "",
		integral: "",
		vip_date: "",
		balance: "",
		phone: "",
		created_at: "",
		openid: "",
		distribution: {
			name: ""
		}
	});
	const getUserInfo = async () => {
		let {
			user
		} = await userInfo();
		user_info.value = user;
	};
	const submit = async (type, id) => {
		let {
			pay_data
		} = await userOrderPlace({
			type,
			id
		});
		wxPay(pay_data, () => {
			uni.$uv.toast("操作成功");
			setTimeout(() => {
				uni.navigateBack();
			}, 1000);
		})
	};
	return {
		user_info,
		getUserInfo,
		submit
	}
};