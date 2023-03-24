import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Checkout } from './pages/checkout';

function App() {
  return (
    <Routes>
      <Route index element={<Checkout />} />
    </Routes>
  );
}

export default App;
