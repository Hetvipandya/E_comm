import React from 'react'
import './Footer.css';

const Footer = () => {
  return (
    <div>
      <footer className='footer'>

      <div className="container ">
           <div className="row">

            <div className="col part"><h4>Get to Know Us</h4>
            <p className='details'>About Us<br/>Careers<br/>Press Releases</p>
            </div>
            
            <div className="col part"><h4>Connect with us</h4>
            <p className='details'>Facebook<br/>Twitter<br/>Instagram</p>
            </div>

            <div className="col part"><h4>Make Money with Us</h4>
            <p className='details'>Sell on Amazon<br/>Sell under Amazon Accelerator<br/>
            Protect and Build Your Brand<br/>Amazon Global Selling<br/>
            Become an Affiliate<br/>Fulfilment by Amazon<br/>
            Advertise Your Products<br/>Amazon Pay on Merchants
            </p>
            </div>

            <div className="col part"><h4>Let Us  Help You</h4>
            <p className='details'>COVID-19 and Amazon <br/> Your Account <br/>
               Return Center <br/> 100% Purchase Protection <br/> Help
            </p>
            </div>
           </div>
     </div>

      </footer>
    </div>
  )
}

export default Footer
