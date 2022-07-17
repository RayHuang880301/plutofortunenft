import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// import FrontCover from '../components/frontCover/FrontCover';
import dynamic from 'next/dynamic';
const DynamicComponentWithNoSSR = dynamic(() => import('../components/frontCover/frontCover.js'), {
	ssr: false
});

export default function Home() {
	return (
		<>
			<Head>
				<title>Pluto Fortune NFT</title>
				<meta property="og:type" content="website" />
				<meta property="og:title" content="Pluto Fortune NFT" />
				<meta property="og:image" content="/public/main.png"></meta>
				<meta property="og:description" content="Pluto Lab x Park Park Carnival fortune NFT"></meta>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;600;800&display=swap" rel="stylesheet"></link>
				<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200;400;600;900&display=swap" rel="stylesheet"></link>
			</Head>
			<DynamicComponentWithNoSSR />
		</>
	);
}
