import { useState, useEffect } from 'react';
import styles from '../styles/Cart.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import {reset} from "../redux/cartSlice"
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router"
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';
import OrderDetail from '../components/OrderDetail';

const Cart = () => {

  const cart = useSelector(state => state.cart);
  const [open,setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  const amount = cart.total;
  const currency = 'USD';
  const style = { layout: 'vertical' };
  
  const router = useRouter()
  const dispatch = useDispatch();
  console.log(cart);


  const createOrder = async(data) => {
    try {
      fetch("api/orders", {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(response => response.json()
      ).then(responseData => {
        console.log(responseData);
        router.push(`/orders/${responseData._id}`);
        dispatch(reset())
      })
      // if(res.status === 201)
    } catch (error) {
      console.log(error)
    }
  }
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency
        }
      });
    }, [currency, showSpinner, dispatch]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount
                    }
                  }
                ]
              })
              .then(orderId => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              // Your code here after capture the order
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total:cart.total,
                method:1,
              });
            });
          }}
        />
      </>
    );
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map(item => (
              <tr className={styles.tr} key={item._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={item.img}
                      alt=""
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                </td>
                <td className={styles.name}>{item.title}</td>
                <td className={styles.extras}>
                  {item.extras.map(extra => (
                    <span key={extra._id}>{extra.text}</span>
                  ))}
                </td>
                <td className={styles.price}>{item.price}</td>
                <td className={styles.quantity}>{item.quantity}</td>
                <td className={styles.total}>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethod}>
              <button className={styles.payBtn} onClick={() => setCash(true)}>
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'ATgBL8yvIE7FugxfMtDfpL3uCF7vPacaCliFz0dsXMzoFdfhvE6r44BUsw2uzJhSLRvYqjcLJoc5FmhT',
                  components: 'buttons',
                  currency: 'USD',
                  'disable-funding': 'credit,card,p24'
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && (
        <OrderDetail
          total={cart.total}
          createOrder={createOrder}
          cancel={() => setCash(false)}
        />
      )}
    </div>
  );
};

export default Cart;
