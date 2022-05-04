import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import '../styles/globals.css'


function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);
  if (!showChild) {
    return null;
  }
  // to fix the Hydration failed problem
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
