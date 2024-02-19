import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SortDropdown from './SortDropdown';
import CategoryButtons from './CategoryButtons';
import ProductCard from './ProductCard';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [searchTerm, sortOption]);

  const apiUrl = 'https://fakestoreapi.com/products';

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Filter products based on the search term
      const filteredProducts = searchTerm
        ? data.filter(product => product.category.includes(searchTerm))
        : data;

      // Sort products based on the selected option
      let sortedProducts = [...filteredProducts];
      if (sortOption === 'priceLowToHigh') {
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'priceHighToLow') {
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProductData(sortedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSortOptionChange = (option) => {
    setSortOption(option);
  };

  const handleCardClick = (category) => {
    setSearchTerm(category);
  };

  return (
    <div className="container mx-auto p-4">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} fetchProducts={fetchProducts} />
      <SortDropdown sortOption={sortOption} handleSortOptionChange={handleSortOptionChange} />
      <CategoryButtons categories={categories} searchTerm={searchTerm} handleCardClick={handleCardClick} />

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

export default App;
