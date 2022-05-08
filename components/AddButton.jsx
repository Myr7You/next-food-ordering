import React from 'react'
import styles from '../styles/AddButton.module.css';

const AddButton = ({onClose}) => {
  return (
    <div className={styles.mainAddButton} onClick={() => onClose(false)}>
      Add New Product
    </div>
  );
}

export default AddButton