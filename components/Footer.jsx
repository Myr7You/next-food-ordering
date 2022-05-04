import React from 'react'
import styles from '../styles/Footer.module.css';
import Image from 'next/image';
const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image
          src="/img/bg.png"
          alt=""
          width={500}
          height={500}
          objectFit="cover"
        />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE BEST RESTAURANT IN TOWN
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANT</h1>
          <p className={styles.text}>
            1000 W. HAPPY St #012120
            <br />
            City Downtown , 12345
            <br />
            (000) 123-4566
          </p>
          <p className={styles.text}>
            1000 W. HAPPY St #012120
            <br />
            City Downtown , 12345
            <br />
            (000) 123-4566
          </p>

        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY UNTIL FRIDAY
            <br />
            9:00 - 22:00
          </p>
          <p className={styles.text}>
            SATURDAY UNTIL SUNDAT
            <br />
            12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer