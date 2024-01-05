import {
	storeToRefs
} from 'pinia';
import useStore from "@/stores/index.js";
const baseApiUrl = import.meta.env.VITE_BASE_URL;
export const Request = (vm) => {
	const {
		useLoginStore
	} = useStore();
	// 初始化请求配置
	uni.$uv.http.setConfig((config) => {
		config.baseURL = baseApiUrl;
		return config
	})
	// 请求拦截
	uni.$uv.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = config.data || {};
		const {
			token
		} = storeToRefs(useLoginStore);
		let header = {
			ApiToken: token.value
		};
		config.header = header;
		// if (config?.custom?.auth) {
		// 	config.header.token = vm.$store.state.userInfo.token
		// }
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$uv.http.interceptors.response.use((response) => {
		/* 对响应成功做点什么 可使用async await 做异步操作*/
		const data = response.data;
		if (data.code == -10 || data.code == -999) {
			const msg = data.code == -999 ? "登录过期,请重新登录" : "未登录,请先登录";
			uni.$uv.toast(msg);
			setTimeout(() => {
				useLoginStore.outLogin();
			}, 1000);
			return new Promise(() => {})
		}
		// 自定义参数
		const custom = response.config?.custom;
		if (data.code !== 0) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
			if (custom.toast !== false) {
				uni.$uv.toast(data.msg)
			}
			// 如果需要catch返回，则进行reject
			if (custom?.catch) {
				return Promise.reject(data)
			} else {
				// 否则返回一个pending中的promise，请求不会进入catch中
				return new Promise(() => {})
			}
		}
		return data.data === undefined ? {} : data.data
	}, (response) => {
		// 对响应错误做点什么 （statusCode !== 200）
		return Promise.reject(response)
	})
}