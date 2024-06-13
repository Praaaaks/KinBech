import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/meta.js"

const LogIn = () => {
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
                                    <input type="email" name="email" placeholder="Email" className="form-control" />
                                </div>
                                <div>
                                    <input type="password" name="password" placeholder="Password" className="form-control" />
                                </div>
                                <div className="d-flex flex-column gap-10">
                                    <Link to="/signup">Haven't made an account?</Link>
                                    <div className="d-flex justify-content-center gap-20 align-items-center">
                                        <button className="button">Log In</button>
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