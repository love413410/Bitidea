import {
	defineStore
} from 'pinia';

const useLoginStore = defineStore('login', {
	state: () => ({
		code: "",
		codecode: "",
		token: uni.getStorageSync('token') || "",
		checkbox: false
	}),
	actions: {
		setCode(obj) {
			this.code = obj.code;
			this.codecode = obj.codecode;
		},
		changeToken(value) {
			this.token = value;
			uni.setStorageSync('token', value)
		},
		changeChekced() {
			this.checkbox = !this.checkbox;
		},
		outLogin() {
			this.token = null;
			this.code = null;
			uni.removeStorageSync('token');
			uni.reLaunch({
				url: "/pages/login/login",
				success: () => console.log('跳转成功')
			});
		}
	}
});

export default useLoginStore;