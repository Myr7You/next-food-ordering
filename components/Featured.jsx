import React, { useState } from 'react';
import styles from '../styles/Featured.module.css';
import Image from 'next/image';
const images = [
  '/img/featured.png',
  '/img/featured2.png',
  '/img/featured3.png'
];
const Featured = () => {
  const [index, setIndex] = useState(0);
  const handleArrow = dir => {
    if (dir === 'l') {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (dir === 'r') {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow('l')}
      >
        <Image src="/img/arrowl.png" alt="" width={100} height={100} />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image
              src={img}
              alt=""
              layout="fill"
              objectFit="contain"
              priority="false"
            />
          </div>
        ))}
      </div>

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow('r')}
      >
        <Image src="/img/arrowr.png" alt="" width={100} height={100} />
      </div>
    </div>
  );
};

export default Featured;
