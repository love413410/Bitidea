import {
	defineStore
} from 'pinia';
const useBaseStore = defineStore('base', {
	state: () => ({
		share_poster: uni.getStorageSync('share_poster') || ""
	}),
	actions: {
		setSharePoster(value) {
			this.share_poster = value;
			uni.setStorageSync('share_poster', value);
		}
	}
});

export default useBaseStore;