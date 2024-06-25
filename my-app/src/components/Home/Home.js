import React, { useEffect, useState } from 'react';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'react-feather';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import axios from 'axios';

const Home = () => {
  const Navigate = useNavigate();

  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsMen, setProductsMen] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/id')
      .then(response => {
        setProductsMen(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products/byId')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:5000/api/category')
      .then(response => {
        setCategory(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  

  const cart = async (product) => {
    try {
      const userId = sessionStorage.getItem('userId');
      console.log('User ID from sessionStorage:', userId);
  
      const cartItem = {
        userId: userId,
        image:product.image,
        itemName: product.itemName,
        price: product.price,
        quantity: 1,
        subTotal: product.price,
      };
  
      if (!cartItem.itemName || !cartItem.price) {
        throw new Error('All fields are required');
      }
  
      const response = await axios.post('http://localhost:5000/api/cart/add', cartItem);
      console.log('Product added to cart:', response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with an error:', error.response.status, error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };
  
  

  const Image1 = require('../Home/img1.jpg');
  const Image2 = require('../Home/img2.jpg');
  const Image3 = require('../Home/img3.jpg');
  const Image7 = require('../Home/women.jpg');
  const Image20 = require('../Home/men.jpg');

  return (
    <>
      <Header />

      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={Image1} className="d-block w-100" alt="..." height={500} />
          </div>
          <div className="carousel-item">
            <img src={Image2} className="d-block w-100" alt="..." height={500} />
          </div>
          <div className="carousel-item">
            <img src={Image3} className="d-block w-100" alt="..." height={500} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        <div className="row">
          {category.map((item, index) => {
            return (
              <div key={index} className="col-md-4">
                <div className="cards">
                  <img src={item.image} className="card-img-top" alt="..." height={235} />
                  <div className="card-body">
                    <p className="box">{item.categoryName}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <img src={Image7} height={500} className="image" />
          </div>

          <div className="col">
            <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-inner slider1">

                <div className="carousel-item active">
                  <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active slider">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                          {products.map((item, index) => {
                            return (
                              <div className="col" key={index}>
                                <div className="card">
                                  <img src={item.image} className="card-img-top" alt="..." height={200} />
                                  <div className="card-body">
                                    <h5 className="card-title">{item.itemName}</h5>
                                    <p className="card-text">
                                      {item.price}
                                      <ShoppingCart className="cart1" onClick={() => cart(item)} />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="carousel-item slider">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                        </div>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {productsMen.map((item, index) => {
                return (
                  <div className="col" key={index}>
                    <div className="card slider">
                      <img src={item.image} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{item.itemName}</h5>
                        <p className="card-text">{item.price}
                          <ShoppingCart className="cart1" onClick={() => cart(item)} />
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col">
            <img src={Image20} className="image2" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;


