import React,{useState} from 'react'
import styles from "../styles/AddProduct.module.css"
import { useRouter } from 'next/router'
import { set } from 'mongoose'

const AddProduct = ({onClose}) => {
  const [file,setFile] = useState(null)
  const [title,setTitle] = useState(null)
  const [desc,setDesc] = useState(null)
  const [prices,setPrices] = useState([])
  const [extra,setExtra] = useState(null)
  const [extraOpt,setExtraOpt] = useState([])

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  }

  const handleExtra = () => {
    setExtraOpt(prev => [...prev, extra]);
  };

  const changePrice = (e,index) => {
    const currentPrices = prices;
    currentPrices[index] = e.target.value
    setPrices(currentPrices);
  }
  const handelCreate = async() => {
    const data = new FormData();
    data.append("file",file);
    data.append("upload_preset","uploads")
    try {
      await fetch('https://api.cloudinary.com/v1_1/dq8qhdgox/upload', {
        method: 'POST',
        body: data
      }).then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          const { url } = result;
          const newProduct = {
            title,
            desc,
            prices,
            extraOptions:extraOpt,
            img: url
          };
          hanldeAddProduct(newProduct);
        });

    } catch (err) {
      console.log(err)
    }
  }
  const hanldeAddProduct = async (newProduct) => {
    console.log(newProduct);
    await fetch(`api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct)
    })
      .then(response => {
        console.log(response);
        response.json()
      })
      .then(responseData => {
        console.log('Success:', responseData);
        onClose(true);
      }).catch(error => {
        console.log(error)
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => onClose(true)} className={styles.close}>
          X
        </span>
        <h1>Add New Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            type="file"
            onChange={e => setFile(e.target.files[0])}
            className={styles.inputFile}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            type="text"
            onChange={e => setTitle(e.target.value)}
            value={title}
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <textarea
            rows={4}
            type="text"
            onChange={e => setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.pricesContainer}>
            <input
              type="number"
              placeholder="small"
              onChange={e => changePrice(e, 0)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type="number"
              placeholder="medium"
              onChange={e => changePrice(e, 1)}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type="number"
              placeholder="large"
              onChange={e => changePrice(e, 2)}
              className={`${styles.input} ${styles.inputSm}`}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              type="text"
              placeholder="item"
              name="text"
              onChange={handleExtraInput}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <input
              type="number"
              placeholder="price"
              name="price"
              onChange={handleExtraInput}
              className={`${styles.input} ${styles.inputSm}`}
            />
            <button className={styles.extraBtn} onClick={handleExtra}>
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOpt.map(item => (
              <span key={item.text} className={styles.extraItem}>
                {item.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handelCreate}>
          Create
        </button>
      </div>
    </div>
  );
}

export default AddProduct