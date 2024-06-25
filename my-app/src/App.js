import {BrowserRouter, Route, Routes} from "react-router-dom"
import './App.css';
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";
import Description from "./components/Description/Description";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Home/>}/>
       <Route path="/login" element={<Login/>}/>
       <Route path="/registration" element={<Registration/>}/>
       <Route path="/products" element={<Products/>}/>
       <Route path="/cart" element={<Cart/>}/>
       <Route path="/footer" element={<Footer/>}/>
       <Route path="/description" element={<Description/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
