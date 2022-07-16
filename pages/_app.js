import React from 'react';
import '../styles/globals.css';
import { WagmiConfig, createClient, configureChains, defaultChains, chain } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
	[chain.mainnet],
	[publicProvider()],
);

const client = createClient({
	autoConnect: false,
	provider,
});


function MyApp({ Component, pageProps }) {
	return (
		<WagmiConfig client={client}>
			<Component {...pageProps} />
		</WagmiConfig> 
	);
}

export default MyApp;
