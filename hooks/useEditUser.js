import {
	smsSend,
	userEdit
} from "@/request/api";
import {
	onUnload
} from "@dcloudio/uni-app"
import {
	ref,
	onUnmounted
} from "vue";
export default function useEditUser() {
	const timer = ref();
	const time = ref(60);
	const isTimer = ref(false);

	const getCode = async (phone, scene) => {
		if (!phone) {
			uni.$uv.toast("请输入手机号");
			return false;
		};
		isTimer.value = true;
		timer.value = setInterval(() => {
			time.value--
			if (time.value < 0) {
				isTimer.value = false;
				time.value = 60;
				clearInterval(timer.value);
			};
		}, 1000);
		await smsSend({
			phone,
			scene
		});
		uni.$uv.toast("验证码已发送,请查看");
	};

	const submit = async (emit, data) => {
		await userEdit(data);
		uni.$uv.toast("操作成功");
		emit('close');
	};
	onUnload(() => clearInterval(timer.value));
	onUnmounted(() => clearInterval(timer.value));
	return {
		timer,
		time,
		isTimer,
		getCode,
		submit
	}
};