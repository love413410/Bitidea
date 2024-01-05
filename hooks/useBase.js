export default function useBase() {
	const preview_image = (data) => {
		let list = [];
		if (typeof data == 'string') {
			list.push(data)
		} else {
			list = data;
		};
		uni.previewImage({
			urls: list,
			loop: true,
			indicator: "default",
			longPressActions: {
				itemList: ['保存图片'],
				success: function(data) {
					console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	};
	const copy = (data) => {
		uni.setClipboardData({
			data: data,
			showToast: false,
			success: () => uni.$uv.toast("复制成功")
		})
	};
	const router = (url) => {
		if (!url) {
			uni.$uv.toast("敬请期待");
			return false;
		}
		uni.navigateTo({
			url
		})
	};
	return {
		preview_image,
		copy,
		router
	}
}