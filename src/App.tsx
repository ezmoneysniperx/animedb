/** @jsxImportSource @emotion/react */

import React from 'react';
import logo from './logo.svg';
import './App.css';
import { css } from '@emotion/react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import DetailPage from './pages/DetailPage'
import CollectionList from './pages/CollectionList'
import CollectionDetail from './pages/CollectionDetail';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:animeId' element={<DetailPage />} />
          <Route path='/collections' element={<CollectionList />} />
          <Route path='/collections/:collectionId' element={<CollectionDetail />} />
        </Routes>
    </div>
  );
}

export default App;
