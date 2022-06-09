import adapter from '@sveltejs/adapter-auto';
import svg from "vite-plugin-svgstring";
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			resolve: {
				alias: {
					$components: path.resolve('./src/components'),
					$styles: path.resolve('./src/styles'),
					$svg: path.resolve('./src/svg'),
				}
			},
			plugins: [svg()]
		}
	}
};

export default config;
