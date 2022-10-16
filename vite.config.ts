import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import reactRefresh from '@vitejs/plugin-react-refresh'
import svgr from 'vite-plugin-svgr'
import viteCompression from 'vite-plugin-compression'
// const viteCompressionConfig: Object = {
// 	verbose: true,
// 	disable: false,
// 	threshold: 10240,
// 	algorithm: 'gzip',
// 	ext: '.gz'
// }
export default defineConfig({
	plugins: [tsconfigPaths(), reactRefresh(), svgr()],

	build: {
		rollupOptions: {
			output: {
				chunkFileNames: 'static/js/[name]-[hash].js',
				entryFileNames: 'static/js/[name]-[hash].js',
				assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
			}
		}
	},
	server: {
		port: 1024,
		cors: true,
		proxy: {
			'/ai': {
				target: 'https://api.kotori.icu', // BT-PANEL URL
				changeOrigin: true,
				rewrite: path => path.replace(/^\/bt/, '')
			}
		}
	}
})
