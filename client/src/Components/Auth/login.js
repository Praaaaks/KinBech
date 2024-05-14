import React from "react";
// import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    
    return(


        <div>
                <h1 classname="app_signup">Log In</h1>
            <form action="POST">
                <input type="email" /*onChange={(e)=>{setEmail(e.target.value)}}*/ placeholder="Email"/>
                <input type="password" /*onChange={(e)=>{setPassword(e.target.value)}}*/ placeholder="Password"/>

                <input type="submit" />
            </form>
            {/* <Link to="/signup">Not registered?</Link> */}
        </div>
    );
}

export default Login;