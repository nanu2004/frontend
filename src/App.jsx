import React, { useState, useEffect } from 'react';

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
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={() => fetchProducts()}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
        <label className="ml-2">Sort by: </label>
        <select
          value={sortOption}
          onChange={(e) => handleSortOptionChange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="default">Default</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
        </select>
      </div>

      <div>
        <p>Categories:</p>
        <div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCardClick(category)}
              className={`p-2 m-2 ${searchTerm === category ? 'bg-gray-300' : 'bg-gray-100'} rounded`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap">
        {loading ? (
          <p>Loading...</p>
        ) : productData.length === 0 ? (
          <p>No products found.</p>
        ) : (
          productData.map((product) => (
            <div key={product.id} className="w-full md:w-1/2 lg:w-1/3 p-4">
              <div className="bg-white p-6 my-4 rounded-lg shadow-md">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-auto rounded-md mb-2"
                />
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-500 mt-2">Price: ${product.price}</p>
               
                <p className="text-gray-500">Category: {product.category}</p>
                <p className="text-gray-500">Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
