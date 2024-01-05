import App from './App'
import * as Pinia from 'pinia';
import uvUI from '@/uni_modules/uv-ui-tools'
import {
	Request
} from '@/request/index'
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia());
	app.use(uvUI);
	Request(app);
	return {
		app,
		Pinia
	}
}