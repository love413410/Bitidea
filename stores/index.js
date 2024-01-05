import useLoginStore from "@/stores/module/login.js";

export default function useStore() {
	return {
		useLoginStore: useLoginStore()
	}
}