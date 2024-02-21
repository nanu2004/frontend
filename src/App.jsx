// App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Category from "./Category";
import Home from "./Home";
import Header from "./Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category />} >
        <Route path="category/:category" element={<category />}/>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
