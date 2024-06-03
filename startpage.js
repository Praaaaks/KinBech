import React from 'react';
import {Link} from 'react-router-dom';
import './startpage.css'; 
import mywatch from './watch.jpg';

const products = [
    {
        id: 0,
        Image: mywatch,
        title: 'BIDEN Mens Watch',
        price: 3000,
    },
    {
        id: 1,
        Image: mywatch,
        title: 'BIDEN Mens Watch',
        price: 3000,
    }
];

function StartPage() {
    function addToCart(id) {
        console.log('Product added to cart:', products[id]);
    }

    return (
        <div>
            <div id="h">
                <Link id='kinbech' to="/">KinBech</Link>
                <Link to="/"><input className="sign" type="button" value="Sign Up" /></Link>
                <Link to="/login"><input className="login" type="button" value="Login" /></Link>
            </div>
            <div id="i">
                <h1>Category</h1>
                <ul>
                    <li>Vehicles</li>
                    <li>Books</li>
                    <li>Computers</li>
                    <li>Furnitures</li>
                    <li>Appliances</li>
                    <li>Mobiles</li>
                    <li>Music Instruments</li>
                    <li>Clothings</li>
                </ul>
            </div>
            <div id="j">
                {products.map((item, index) => (
                    <Link to="/item" key={index}>
                        <div className='box'>
                            <div className='img-box'>
                                <img className='image' src={item.Image} alt={item.title} />
                            </div>
                            <div className='bottom'>
                                <p>{item.title}</p>
                                <h2>Rs. {item.price}.00</h2>
                                <button onClick={() => addToCart(index)}>Add to cart</button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default StartPage;
