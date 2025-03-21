import adapterNode from '@sveltejs/adapter-node';
import adapterVercel from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';

dotenv.config();

const adapterConfig = {
	// See below for an explanation of these options
	routes: {
		include: ['/*'],
		exclude: ['<all>']
	}
};

function getAdapter() {
	return ['docker-node', 'electron-node'].includes(process.env.PUBLIC_ADAPTER)
		? adapterNode(adapterConfig)
		: adapterVercel(adapterConfig);
}

const adapter = getAdapter();

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess({})],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter,
		version: {
			name: process.env.npm_package_version
		},
		alias: {
			$i18n: 'src/i18n'
		}
	}
};

export default config;
