import React, { useState } from 'react';
import styles from "../../styles/Admin.module.css"
import Image from 'next/image';


const Index = ({ productData, orderData }) => {
  console.log(orderData);
  console.log(productData);


  const [productList, setProductList] = useState(productData);
  const [orderList, setOrderList] = useState(orderData);
  const status = ["preparing","delivering","delivered"]
  const handleDelete = async (id) => {
    try {
      fetch(`api/products/${id}`, {
        method: 'DELETE', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => console.log(response))
        .then(responseData => {
          setProductList(productList.filter(product => product._id !== id));
        });
    } catch (error) {
      console.log(error)
    }
  }

  const handleStatus = async (id) => {
    const item = orderList.filter(order => order._id === id)[0]
    const curStatus = item.status
    try {
      fetch(`api/orders/${id}`, {
        method: 'PUT', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: curStatus +1})
      })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          setOrderList([
            responseData,
            ...orderList.filter(order => (order._id !== id))
          ]);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {productList.map(item => (
              <tr className={styles.trTitle} key={item._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={item.img}
                      alt=""
                      width={60}
                      height={60}
                      objectFit="cover"
                      priority
                    />
                  </div>
                </td>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          <tbody>
            {orderList.map(order => (
              <tr className={styles.trTitle} key={order._id}>
                <td>{order._id}</td>
                <td>{order.customer}</td>
                <td>${order.total}</td>
                <td>
                  {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button className={styles.status} onClick={() => handleStatus(order._id)}>Next Stage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ""
  if (myCookie.token !== process.env.NEXT_PUBLIC_TOKEN) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false
      }
    };
  }
  // Fetch data from external API
  const productsRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products`);
  const productsData = await productsRes.json();
  
  const ordersRes = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/orders`);
  const ordersData = await ordersRes.json();
  // Pass data to the page via props
  return {
    props: { productData: productsData, orderData: ordersData }
  };
};

export default Index