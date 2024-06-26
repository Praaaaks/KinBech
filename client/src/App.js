import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from './components/layout';
import Home from './pages/home';
import LogIn from './pages/login';
import SignUp from './pages/signup';
import ProductPage from './pages/product';
import ProfilePage from './pages/profile';
import { CreateProduct } from './pages/createProduct';

function App() {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Layout/> }>
              <Route index element={ <Home/> } />
              <Route path='login' element={ <LogIn/> } />
              <Route path='signup' element={ <SignUp/> } />
              <Route path='product/:id' element={ <ProductPage/> } />
              <Route path='profile' element={ <ProfilePage/> } />
              <Route path='create' element={ <CreateProduct/> } />
            </Route>
          </Routes>
        </BrowserRouter>
      </>
  );
}

export default App;
