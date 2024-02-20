import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [],
	build: {
		assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif', '**/*.webp', '**/*.css']
	}
})