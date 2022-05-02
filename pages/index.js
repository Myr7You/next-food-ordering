import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Ordering App</title>
        <meta name="description" content="Best food ordering app in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      homepage
      <Image src="/img/logo.png" alt="logo" width="32" height="32"/>
    </div>
  );
}
