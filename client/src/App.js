import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import LogIn from './pages/login';
import SignUp from './pages/signup';
import ProductPage from './pages/product';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Layout/> }>
              <Route index element={ <Home/> } />
              <Route path='login' element={ <LogIn/> } />
              <Route path='signup' element={ <SignUp/> } />
              <Route path='product' element={ <ProductPage/> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
