/* eslint-disable @next/next/no-typos */
import { useState } from 'react';
import Head from 'next/head';
import Featured from '../components/Featured';
import ProductList from '../components/ProductList';
// import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddProduct from '../components/AddProduct';
import AddButton from '../components/AddButton';


export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Ordering App</title>
        <meta name="description" content="Best food ordering app in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      {admin && <AddButton onClose={setClose} />}
      <ProductList products={productList} />
      {!close && <AddProduct onClose={setClose} />}
    </div>
  );
}



// This gets called on every request
export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || '';
  let admin = false
  if (myCookie.token === process.env.NEXT_PUBLIC_TOKEN) {
    admin = true
  }
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { productList: data, admin:admin} };
};
