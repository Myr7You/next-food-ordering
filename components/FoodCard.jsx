import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/FoodCard.module.css'

const FoodCard = ({product}) => {
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`} passHref>
        <a>
          <Image src={product.img} alt="" width={300} height={300} />
        </a>
      </Link>
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>${product.prices[0]}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  );
}

export default FoodCard