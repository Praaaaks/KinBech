import React from 'react';
import {Link} from 'react-router-dom';
import './login.css'; 

function LoginPage() {
    return (
        <div className="log">
            <h1 id="f">Log In</h1>
            <h4 id="e">E-Mail <input id='email' type="email" name="Email"  /></h4>
            <h4 id="g">Password <input id='password' type="password" name="password" /></h4>
            <Link to="/"><input id="d" type="button" value="login" /></Link>
        </div>
    );
}

export default LoginPage;
