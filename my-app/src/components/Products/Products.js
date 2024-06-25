import React, { useEffect, useState } from 'react';
import './Products.css';
import Header from '../Header/Header';
import Left from './Left/Left';
import Right from './Right/Right';
import Footer from '../Footer/Footer';
import axios from 'axios';

const Products = () => {
  const [category,setCategory] = useState([]);
  const [selectedCategoryId,setSelectedCategoryId] =useState("1");
  const[productsPage,setProductsPage] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/category")
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
}, []);



    useEffect(() => {
      axios.get("http://localhost:5000/api/productsPage/byId", {
        params: {
          categoryId: selectedCategoryId,
        }
      })
      .then(response => {
        setProductsPage(response.data);
        //console.log('update data:',selectedCategoryId)
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, [selectedCategoryId])

  return (
    <div>
      <Header/>
      <div class="container">
  <div class="row">
    <div class="col-sm-4">
        <Left category={category}
              setSelectedCategoryId={setSelectedCategoryId}
        />
    </div>
    <div class="col-sm-8">
        <Right productsPage={productsPage}/>
    </div>
  </div>
</div>
    </div>
  )
}

export default Products
