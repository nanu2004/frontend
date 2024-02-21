// HomePage.js
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const apiUrl = 'https://fakestoreapi.com/products';

    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : productData.length === 0 ? (
          <p>No products found.</p>
        ) : (
          productData.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default HomePage;
