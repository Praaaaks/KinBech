import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsPersonCircle } from 'react-icons/bs';

const Header = () => {

    const [logged, setLogged] = useState(false);
    const [info, setInfo] = useState([]);

    const callProfile = async () => {
        try{
          const res = await axios.get("/profile", {
            headers: {
              "Access-Control-Allow-Credentials": true,
              "Content-Type": "application/json",
            },
          });
          if (res) {
            const value = res.data;
            setInfo(value);
            setLogged(true);
          }
        } catch (error) {
          if(error.response && error.response.status === 401)
          {
              setLogged(false);
            console.error("Unauthorized - possibly invalid token");
            // Optionally redirect to login or handle token refresh
          } else {
            console.error("An error occurred:", error);
          }
        }
    };

    useEffect(() => {
    callProfile(); // Call the profile once when the component mounts
        const interval = setInterval(callProfile, 1000); // Optionally check every 1000 ms

        return () => clearInterval(interval); // Clear interval on component unmount
    }, []);

    return(
        <>
        <header className='header-top py-3'>
            <div className='container'>
                <div className='row justify-content-between'>
                    <div className='col'>
                        <Link to="/">KinBech</Link>
                    </div>
                    {logged ? (<>
                    <div className='col-2 justify-content-end'>
                        <Link className='profile-link' to="/profile"><span><BsPersonCircle/></span>{info.name}</Link>
                    </div>
                    </>) : (
                    <>
                    <div className='col-1'>
                        <Link className='btn btn-sm btn-light' to='/login'>LogIn</Link>
                    </div>
                    <div className='col-1'>
                        <Link className='btn btn-sm btn-light' to='/signup'>SignUp</Link>
                    </div>
                    </>
                    )}
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;