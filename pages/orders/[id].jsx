import React from 'react'
import styles from "../../styles/Order.module.css"
import Image from 'next/image';
const Order = ({ order }) => {
  const status = 0;
  const statusClass = index => {
    if (index - status < 1) return styles.done;
    if (index - status === 1) return styles.inProgress;
    if (index - status > 1) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Order Id</th>
              <th>Customer</th>
              <th>Adress</th>
              <th>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td className={styles.id}>{order._id}</td>
              <td className={styles.name}>{order.customer}</td>
              <td className={styles.addr}>{order.address}</td>
              <td className={styles.total}>{order.total}</td>
            </tr>
          </tbody>
        </table>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image src="/img/paid.png" alt="" width={30} height={30} />
            <span>Payment</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" alt="" width={20} height={20} />
            </div>
          </div>

          <div className={statusClass(1)}>
            <Image src="/img/bake.png" alt="" width={30} height={30} />
            <span>Preparing</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" alt="" width={20} height={20} />
            </div>
          </div>

          <div className={statusClass(2)}>
            <Image src="/img/bike.png" alt="" width={30} height={30} />
            <span>On the way</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" alt="" width={20} height={20} />
            </div>
          </div>

          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" alt="" width={30} height={30} />
            <span>Delivered</span>
            <div className={styles.checkIcon}>
              <Image src="/img/checked.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${order.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${order.total}
          </div>
          <button className={styles.button}>
            {order.method === 1 ? 'PAID' : 'Pay on Delivery'}
          </button>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_HOST}/api/orders/${params.id}`
  );
  const data = await res.json();
  // Pass data to the page via props
  return {
    props: { order: data }
  };
};

export default Order;