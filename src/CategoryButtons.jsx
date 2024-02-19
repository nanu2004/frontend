import React from 'react';

const CategoryButtons = ({ categories, searchTerm, handleCardClick }) => {
  return (
    <>
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
    </>
  );
};

export default CategoryButtons;
