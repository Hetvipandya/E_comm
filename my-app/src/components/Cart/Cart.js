import React, { useEffect, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check, Trash2 } from 'react-feather';
import Header from '../Header/Header';
import axios from 'axios';

const Cart = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/api/cart")
            .then(response => {
                setCart(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the cart!', error);
            });
    }, []);

    const handleClick = () => { 
        if(cart.length > 0){
            setMessage('Your order is successful');
        } else {
            setMessage('Your order is not successful');
        }
    };


    const incrementQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item._id === itemId) {
                const newQuantity = parseInt(item.quantity) + 1;
                updateQuantity(item._id, newQuantity);
                return { ...item, quantity: newQuantity};
            }
            return item;
        });
        setCart(updatedCart);
    };

    const decrementQuantity = (itemId) => {
        const updatedCart = cart.map(item => {
            if (item._id === itemId && item.quantity > 1) {
                const newQuantity = item.quantity - 1;
                updateQuantity(item._id, newQuantity);
                return { ...item, quantity: newQuantity};
            }
            return item;
        });
        setCart(updatedCart);
    };

    const updateQuantity = (_id, newQuantity, subTotal) => {
        axios.put("http://localhost:5000/api/cart/update", { 
            quantity: newQuantity, 
            id: _id,
            total: subTotal
        })
            .then(response => {
                if (response.status === 200) {
                    const updatedCart = cart.map(item => {
                        if (item._id === _id) {
                            return { ...item, quantity: newQuantity };
                        }
                        return item;
                    });
                    setCart(updatedCart);
                } else {
                    console.error('There was an error updating the quantity!');
                }
            })
            .catch(error => {
                console.error('There was an error updating the quantity!', error);
            });
    };

    const removeItem = (_id) => {
       // console.log('Removing item with id:', _id); 
    
        axios.delete("http://localhost:5000/api/cart/delete", {
            data: { id: _id }
        }) 
        .then(response => {
            // if (response.status === 200) {
            //     const updatedCart = cart.filter(item => item._id !== _id);
            //     //setCart(updatedCart);
            // } else {
            //     console.error('There was an error deleting the item!');
            // }
        })
        .catch(error => {
            console.error('There was an error deleting the item!', error);
        });
    };
    
    

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const getOrder = () => {
        const userId = sessionStorage.getItem('userId');
        const total = getTotalPrice();
        const date = new Date().toISOString().split('T')[0];
        const status = 'Order placed';
    
        const orderItem = {
            userId: userId,
            total: total,
            orderDate: date,
            status: status,
        };
    
        if (!orderItem.userId || !orderItem.total) {
            setMessage('All fields are required');
            return;
        }
    
        axios.post('http://localhost:5000/api/order/add', orderItem)
                .then(response => {
                console.log('response',response)
                    if (response.status === 201) {
                        console.log('cart',cart)
                        cart.forEach(item => {
                            //console.log('removing Id:', item._id)
                            removeItem(item._id);
                        });
                        setCart([]);
                        setMessage('Your order is successful');
                    } else {
                        setMessage('Your order is not successful');
                    }
                })
            .catch(error => {
                console.error('Error placing order:', error.message);
                setMessage('Error placing order. Please try again.');
            });
    };


      
      

    return (
        <div>
            <Header />
            <div className="container cart-navbar">
                <div className="row">
                    <div className="col">Item</div>
                    <div className="col">Price</div>
                    <div className="col">Quantity</div>
                    <div className="col">Subtotal</div>
                    <div className="col">Remove</div>
                </div>
            </div>
            <hr />

            {cart.map(item => (
                <div className='cart-item' key={item.id}>
                    <img src={item.image} height={200} className='img1' alt={item.name} />
                    <span className='item-name'>{item.itemName}</span>
                    <span className='item-price'>Rs.{item.price}</span>
                    <button onClick={() => incrementQuantity(item._id)} className='increment'>+</button>
                    <span className='item-quantity'>{item.quantity}</span>
                    <button onClick={() => decrementQuantity(item._id)} className='decrement'>-</button>
                    <span className='total'>Rs.{item.price * item.quantity}</span>
                    <button onClick={() => removeItem(item._id)} className='remove'><Trash2 /></button>
                </div>
            ))}

            <div className='total-price'>
                Total Price: Rs.{getTotalPrice()}
            </div>

            <div className='cart-actions'>
                <button className='shopping' onClick={() => navigate('/products')}>
                    Continue Shopping
                </button>
                <button className='checkout' onClick={getOrder}>
                    Checkout <Check />
                </button>
                {message && <p className='message'>{message}</p>}
            </div>
        </div>
    );
};

export default Cart;

