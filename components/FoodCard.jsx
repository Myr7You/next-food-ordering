import React from 'react'
import Image from 'next/image'
import styles from '../styles/FoodCard.module.css'

const FoodCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/pizza.png" alt="" width={300} height={300} />
      <h1 className={styles.title}>FIORI DI ZUCCA</h1>
      <span className={styles.price}>$19.90</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit
      </p>
    </div>
  );
}

export default FoodCard