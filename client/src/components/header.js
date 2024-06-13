import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return(
        <>
        <header className='header-top py-3'>
            <div className='container'>
                <div className='row justify-content-between'>
                    <div className='col'>
                        <Link to="/">KinBech</Link>
                    </div>
                    <div className='col-1'>
                        <Link className='btn btn-sm btn-light' to='/login'>LogIn</Link>
                    </div>
                    <div className='col-1'>
                        <Link className='btn btn-sm btn-light' to='/signup'>SignUp</Link>
                    </div>
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;