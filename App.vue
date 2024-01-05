<script>
	import {
		storeToRefs
	} from 'pinia';
	import useStore from "@/stores/index.js";
	import useWechat from "@/hooks/useWechat.js";
	const {
		setConfig
	} = useWechat();
	export default {
		onLaunch: function({
			query
		}) {
			let code = query?.code ?? "";
			let codecode = query?.codecode;
			const {
				useLoginStore
			} = useStore();
			useLoginStore.setCode({
				code,
				codecode
			});
			let invitation = query?.invitation ?? "";
			uni.setStorageSync('invitation', invitation);
			setConfig();
		},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style lang="scss">
	body {
		background: $background;
	}

	* {
		line-height: 1;
	}

	image {
		pointer-events: none;
	}

	// 下面的可删除
	.test {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>