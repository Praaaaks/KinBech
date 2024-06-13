import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "../components/custominput";
import Meta from "../components/meta";

const SignUp = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value,
        });
    };
    

    const btnSignup = async (e) => {
        console.log(user);
        e.preventDefault();
        const { name, email, password, mobile } = user;
        if (name && email && password && mobile) {
          axios
            .post("/auth/signup", user)
            .then((response) => {
              window.alert("Registration successful!");
              navigate("/");
            })
            .catch((error) => {
              if (error.response.status === 400) {
                window.alert("Email already used");
              } else {
                window.alert(`There was error : ${error}`);
              }
            });
        } else {
          alert("Please type the fields correctly");
        }
      };

    return(
        <>
            <Meta title="Sign Up"/>
            <div className="signup py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="auth-card">
                            <h4 className="text-center mb-3">Sign Up</h4>
                            <form action="" className="d-flex flex-column gap-20">
                                <div>
                                    <CustomInput type="text" onChange={handleChange} name="name" placeholder="Enter your name" className="form-control" />
                                </div>
                                <div>
                                    <CustomInput type="email" onChange={handleChange} name="email" placeholder="Email" className="form-control" />
                                </div>
                                <div>
                                    <CustomInput type="password" onChange={handleChange} name="password" placeholder="Password" className="form-control" />
                                </div>
                                <div>
                                    <CustomInput type="text" onChange={handleChange} name="mobile" placeholder="Enter your number" className="form-control" />
                                </div>
                                <div className="d-flex flex-column gap-10">
                                    <Link to="/login">Already have an account?</Link>
                                    <div className="d-flex justify-content-center gap-20 align-items-center">
                                        <button className="button" onClick={btnSignup}>Sign Up</button>
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

export default SignUp;