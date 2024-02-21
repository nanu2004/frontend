// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./Category";
import Home from "./Home";
import Header from "./Header";
import { ProductProvider } from "./ProductContext"; // Import ProductProvider

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        {/* Wrap the entire application with ProductProvider */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} >
            <Route path=":category" element={<Category />} /> {/* Corrected typo in route */}
          </Route>
        </Routes>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
