import {
	wechatSetting
} from "@/request/api";
import wx from 'weixin-js-sdk';
export default function useWechat() {
	const isWechat = () => {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) != 'micromessenger') {
			// uni.$uv.toast('请在微信浏览器中打开');
			return false;
		}
		return true;
	};
	const setConfig = async () => {
		// isWechat();
		let url = window.location.href.split('#')[0];
		let {
			appId,
			timestamp,
			nonceStr,
			signature,
			jsApiList
		} = await wechatSetting({
			url
		});

		wx.config({
			debug: false,
			appId, // 必填，公众号的唯一标识
			timestamp, // 必填，生成签名的时间戳
			nonceStr, // 必填，生成签名的随机串
			signature, // 必填，签名
			jsApiList // 必填，需要使用的JS接口列表
		});
	};
	const wxPay = (data,success) => {
		let isWx = isWechat();
		if (!isWx) {
			uni.$uv.toast('请在微信浏览器中打开');
			return false;
		}
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', data,
			(res) => {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					success()
					// uni.$uv.toast('操作成功');
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
				}
			});
	};

	const updateAppMessageShareData = () => {
		wx.updateAppMessageShareData({
			title: '111', // 分享标题
			desc: '222', // 分享描述
			link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			imgUrl: '', // 分享图标
			success: function() {
				// 设置成功
			}
		})
	};
	return {
		setConfig,
		wxPay,
		updateAppMessageShareData
	}
}