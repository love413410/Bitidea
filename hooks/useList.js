import {
	reactive
} from "vue";
export default function useMy() {
	const _this = reactive({
		list: [],
		page: 1,
		limit: 10,
		last_page: 1,
		loadmore_status: "loadmore"
	});

	const loadmore = () => {
		if (_this.page >= _this.last_page) return;
		_this.page++;
		getList();
	};

	return {
		_this,
		loadmore
	}
}