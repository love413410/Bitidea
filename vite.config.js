import {
	defineConfig
} from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
export default defineConfig({
	plugins: [uni()],
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
			},
		},
	},
	server: {
		disableHostCheck: true,
		port: 3410,
		proxy: {
			"/api": {
				target: "https://ai.bitidea.cn",
				changeOrigin: true,
				secure: false
			}
		}
	},
});