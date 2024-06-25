import React from 'react';
import './Header.css';
import { ShoppingCart } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const Logo = require("../Header/logo.jpg");
    const isLoggedIn = Boolean(sessionStorage.getItem('userId'));

    const handleLogout = () => {
        sessionStorage.removeItem('userId');
        navigate("/login");
    };

    return (
        <div className='main-head'>
            <div className="container">
                <div className="row">
                    <div className="col image">
                        <img src={Logo} height={100} className='img'/>
                    </div>

                    <div className="col home" onClick={() => navigate("/")}>
                        Home
                    </div>

                    <div className="col products" onClick={() => navigate("/products")}>
                        Products
                    </div>

                    <div className="col contact">
                        Contact
                    </div>

                    {!isLoggedIn && (
                        <>
                            <div className="col login">
                                <button 
                                    type="button" 
                                    className="btn btn-primary btn-sm login" 
                                    onClick={() => navigate("/login")}
                                >
                                    Login
                                </button>
                            </div>

                            <div className="col">
                                <button 
                                    type="button" 
                                    className="btn btn-success btn-sm reg" 
                                    onClick={() => navigate("/registration")}
                                >
                                    Registration
                                </button>
                            </div>
                        </>
                    )}

                    {isLoggedIn && (
                        <div className="col">
                            <button 
                                type="button" 
                                className="btn btn-danger btn-sm logout" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}

                    <div className="col cart">
                        <ShoppingCart className='cart' onClick={() => navigate("/cart")}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;

