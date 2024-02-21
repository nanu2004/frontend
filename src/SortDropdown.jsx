import React from 'react';

const SortDropdown = ({ sortOption, handleSortOptionChange }) => {
  return (
    <>
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
    </>
  );
};

export default SortDropdown;