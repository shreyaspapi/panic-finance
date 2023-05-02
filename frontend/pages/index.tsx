import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content=""
          name=""
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
    </div>
  );
};

export default Home;
