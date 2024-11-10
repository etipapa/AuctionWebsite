import './App.css';
import SignUp from './comp/Login/SignUp'
import SignIn from './comp/Login/SignIn';
import { Routes, Route } from 'react-router-dom'
import NavBar from './comp/NavBar'
import Product from './comp/Products/Product';
import ProductList from './comp/Products/ProductList';
import Home from './comp/Home';
import SuccessBid from './comp/SuccessBid';
import Personal from './comp/personalArea/Personal';
import MyProducts from './comp/personalArea/MyProducts';
import AddProduct from './comp/personalArea/AddProduct';
import { useEffect } from 'react';
import { fetchUserById,putProductsIWant } from './comp/slices/userSlice'
import { useDispatch } from 'react-redux';

function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
   const id= sessionStorage.getItem('userId');
    if(id){
       dispatch(fetchUserById(id))
    }
  },[])
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path='signIn' element={<SignIn />} />
        <Route path='signUp' element={<SignUp />} />
        <Route path='productList' element={<ProductList />} />
        <Route path='product/:id' element={<Product />} />
        <Route path='myProducts/:index' element={<MyProducts />} />
        <Route path='addProduct' element={<AddProduct />} />
        <Route path='home' element={<Home />} />
        <Route path='success' element={<SuccessBid />} />
        <Route path='signIn/personal' element={<Personal />} />
        <Route path='personal' element={<Personal />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
