import React from 'react'
import styles from '../styles/ProductList.module.css'
import FoodCard from './FoodCard';
const ProductList = ({ products }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE Best RESTAURANT IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
        nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
        ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
        molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero
        eros et accumsan et iusto odio dignissim qui blandit praesent luptatum
        zzril delenit augue duis dolore te feugait nulla facilisi.
      </p>
      <div className={styles.wrapper}>
        {products.map(item => (
          <FoodCard key={item._id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList