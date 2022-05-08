import React, { useState } from 'react';
import styles from '../../styles/Product.module.css';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';


const Product = ({ product }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(product.prices[0]);
  const [extras,setExtras] = useState([])
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch()
  // console.log(extras);



  const changePrice = number => {
    setPrice(price + number);
  };
  const handlerSize = (sizeIndex) => {
    const diff = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex)
    changePrice(diff);
  }
  const handleChange = (e,option) => {
    const checked = e.target.checked;
    if (checked){
      changePrice(option.price);
      setExtras(prev => [...prev,option])
    }else{
      changePrice(-option.price);
      setExtras(extras.filter(extra => extra._id !== option._id ));
    }

  }
  const handleClick = () => {
    dispatch(addProduct({ ...product, extras, price, quantity }));
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={product.img}
            alt={product.desc}
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>

      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.select}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handlerSize(0)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handlerSize(1)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handlerSize(2)}>
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.select}>Choose additional ingredients</h3>

        <div className={styles.ingredient}>
          {product.extraOptions.map(opt => (
            <div className={styles.option} key={opt._id}>
              <input
                type="checkbox"
                id={opt.text}
                name={opt.text}
                className={styles.checkbox}
                onChange={e => handleChange(e, opt)}
              />
              <label htmlFor="double">{opt.text}</label>
            </div>
          ))}
        </div>

        <div className={styles.add}>
          <input
            type="num"
            value={quantity}
            className={styles.quantity}
            onChange={e => setQuantity(e.target.value)}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Product;

export const getServerSideProps = async ({ params }) => {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/products/${params.id}`
  );
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: { product: data }
  };
};
