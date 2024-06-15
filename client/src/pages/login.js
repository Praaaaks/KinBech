import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Meta from "../components/meta.js"
import CustomInput from "../components/custominput.js";

const LogIn = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "", 
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    };
    
    const btnLogin = async (e) =>{
        e.preventDefault();
        const { email, password } = user;
        if (email && password) {
          axios
            .post("/auth/login", user)
            .then((res) => {
              navigate("/profile");
            })
            .catch((error) => {
              window.alert("Invalid Credentials");
            });
        } else {
          window.alert("Type all fields");
        }
    }

    return(
        <>
            <Meta title="Log In"/>
            <div className="login py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h4 className="text-center mb-3">Log In</h4>
                            <form action="" className="d-flex flex-column gap-20">
                                <div>
                                    <CustomInput type="email" onChange={ handleChange } name="email" placeholder="Email" className="form-control" />
                                </div>
                                <div>
                                    <CustomInput type="password" onChange={ handleChange } name="password" placeholder="Password" className="form-control" />
                                </div>
                                <div className="d-flex flex-column gap-10">
                                    <Link to="/signup">Haven't made an account?</Link>
                                    <div className="d-flex justify-content-center gap-20 align-items-center">
                                        <button className="button" onClick={btnLogin}>Log In</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn;