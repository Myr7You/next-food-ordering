import React, { useState } from 'react';
import styles from "../styles/OrderDetail.module.css"
const OrderDetail = ({ total, createOrder, cancel }) => {
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handelClick = () => {
    createOrder({ customer, address, total, method: 0 });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery.</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            value={customer}
            onChange={e => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Num.</label>
          <input
            placeholder="+123 45667"
            type="number"
            className={styles.input}
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            placeholder="Elon St."
            type="text"
            className={styles.input}
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handelClick}>
          ORDER
        </button>
        <button className={styles.close} onClick={cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OrderDetail