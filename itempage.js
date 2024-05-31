import React from 'react';
import { Link } from 'react-router-dom';
import './itempage.css';
import watch1 from './watch1.jpg';
import watch from './watch.jpg';

function ItemPage() {
    return (
        <div>
            <div id="c">
                <Link id="kinbech" to="/">KinBech</Link>
                <input className="sign" type="button" value="Sign Up" />
                <Link  to="/login"><input className="login" type="button" value="Login" /></Link>
            </div>
            <div id="a">
                <img src={watch1} alt={watch} />
                <input id="Bookmark" type="button" value="Bookmark" />
            </div>
            <div id="b">
                <h3>BIDEN Men's Watch</h3>
                <p>Rs.3000.00</p>
                <p>Prakalpa Satyal</p>
                <h4>Description</h4>
                <p>Watch for sale. Used for only 1 year, nothing wrong with it</p>
                <h4>Contact:</h4>
                <h5>E-mail:</h5>
                <p>praksatyal@gmail.com</p>
                <h5>Phone:</h5>
                <p>9860199571</p>
            </div>
        </div>
    );
}

export default ItemPage;
