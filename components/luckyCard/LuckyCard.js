import React from 'react';
import styles from './LuckyCard.module.css';
import Image from 'next/image';

export default function LuckyCard(props) {
	const { img, choice } = props;
	return (
		<dic className={styles.box}>
			<Image src={img} width={150} height={150} layout="fixed" alt=''/>
			<div className={styles.word}>{choice}</div>
		</dic>
	);
}
