import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';

const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    console.log({ username, password });
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
        .then(response => console.log(response))
        .then(responseData => {
          router.push(`/admin`);
        });
    } catch (err) {
      console.log(err);
      setError(true)
    }   
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          placeholder="username"
          type="text"
          className={styles.input}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Sign in
        </button>
        {error && <span className={styles.error}>Wrong Credentials!</span>}
      </div>
    </div>
  );
};

export default Login;
