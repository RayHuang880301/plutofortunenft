/** @type {import('next').NextConfig} */
const nextConfig = {
	// basePath: '/',
	// assetPrefix: '/out/',
	reactStrictMode: true,
	images: {
		loader: 'akamai',
		path: '/',
	},
};

module.exports = nextConfig;
