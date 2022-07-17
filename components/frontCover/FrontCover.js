import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import LuckyCard from '../luckyCard/LuckyCard';
import styles from './FrontCover.module.css';
import logo from '../../assets/plutolab.png';
import dcLogo from '../../assets/dcLogo.svg';
import twLogo from '../../assets/twLogo.svg';
import osLogo from '../../assets/osLogo.svg';
import igLogo from '../../assets/igLogo.svg';
import plutoImg1 from '../../assets/plutoImg1.png';
import plutoImg2 from '../../assets/plutoImg2.png';
import plutoImg3 from '../../assets/plutoImg3.png';
import plutoImg4 from '../../assets/plutoImg4.png';
import Image from 'next/image';
import { utils, BigNumber, ethers} from 'ethers';
import { CONTACT_ADDRESS, CONTACT_ABI } from '../../config';
import { useSigner , useContract , chain, useAccount, useConnect, useEnsName, useDisconnect, useNetwork, useContractWrite, useSwitchNetwork } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import Swal from 'sweetalert2';

const FrontCover = () => {
	const { address } = useAccount();
	const { data: ensName } = useEnsName({ address });
	const { data: connectData, connect, error } = useConnect({
		connector: new InjectedConnector(),
	});
	const { disconnect } = useDisconnect();
	const [profile, setProfile] = useState(null);
	const { data: signer } = useSigner();
	const { chains, switchNetwork } = useSwitchNetwork();
	let connectedChainId = connectData?.chain.id;
	let validChainId = chain.mainnet.id;

	useEffect(() => {
		if(address) {
			let str = address.slice(0,6) + '...' + address.slice(-4);
			setProfile(str);
		}
	}, [address]);

	useEffect(() => {
		if(connectedChainId != validChainId) {
			switchNetwork?.(validChainId);
		}
	}, [connectData]);

	const web3ErrorToMsg = (error) => {
		if (!error) {
			return '';
		}
		return error.error?.message || error.message || error.message || 'Something went wrong';
	};

	const connectError = () => {
		Swal.fire({
			icon: 'warning',
			title: 'Need to install Metamask Wallet',
			confirmButtonColor: '#FFF732',
			customClass: {
				confirmButton: 'confirm-button-class'
			},
		});
	};

	const price = '0';
	const { data, isError, isLoading, writeAsync } = useContractWrite(
		{
			addressOrName: CONTACT_ADDRESS,
			contractInterface: CONTACT_ABI,
			functionName: 'publicMint',
			args: [address, 2, 1],
			overrides: {
				value: ethers.utils.parseEther(price),
			},
		}
	);

	const mint = async () => {
	  if(connectedChainId==validChainId) {
	  try {
	    const receipt = await writeAsync();
	    const tx = receipt?.hash.slice(0,6) + '...' + receipt?.hash.slice(-4);
	    Swal.fire({
	      icon: 'success',
	      title: 'Success',
	      html:
	      'Send transaction successfully.<br/>' +
	      `your tx: <a style="color: blue;" href="https://etherscan.io/tx/${receipt.hash}">${tx}</a> `,
	      confirmButtonColor: '#FFF732',
	      customClass: {
	        confirmButton: 'confirm-button-class'
	      },
	    });
	  } catch (error) {
	    console.error(error);
	    Swal.fire({
	      title: 'Error',
	      text: web3ErrorToMsg(error),
	      icon: 'error',
	      confirmButtonColor: '#FFF732',
	      customClass: {
	        confirmButton: 'confirm-button-class'
	      },
	    });
	  }
		}
	};

	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<Image src={logo} width={135} height={30} alt=''/>
				<div className={styles.mediaBox}>
					<Link href="https://discord.gg/plutolab"><a target="_blank" rel="noreferrer"><Image src={dcLogo} width={40} height={40} alt=''/></a></Link>
					<Link href="https://www.instagram.com/plutolab_official/"><a target="_blank" rel="noreferrer"><Image src={igLogo} width={40} height={40} alt=''/></a></Link>
					<Link href="https://twitter.com/phhd_nft"><a target="_blank" rel="noreferrer"><Image src={twLogo} width={40} height={40} alt=''/></a></Link>
					<Link href="https://opensea.io/collection/plutolabnft "><a target="_blank" rel="noreferrer"><Image src={osLogo} width={40} height={40} alt=''/></a></Link>
				</div>
			</div>
			<div className={styles.container}>
				{address && <button className={styles.profile} onClick={() => disconnect()}>{ensName ?? profile}</button>} 
				{!address && <button className={styles.btn} onClick={() => connect()}>Connect</button>}
				{error && <div {...connectError()}></div>}
				{address && 
				<>
					<div className={styles.Cards}>
						<LuckyCard img={plutoImg1} choice="學業運"/>
						<LuckyCard img={plutoImg2} choice="事業運"/>
						<LuckyCard img={plutoImg3} choice="愛情運"/>
						<LuckyCard img={plutoImg4} choice="健康運"/>
					</div>
					<div className={styles.word}>今天，我想來點...
						
					</div>
					<button className={styles.mintBtn} onClick={() => mint()}>免費求籤</button>
					<div className={styles.tip}>信徒眾多，每人限求一籤</div>
				</>
				}
			</div>
		</div>
	);
};

export default FrontCover;
