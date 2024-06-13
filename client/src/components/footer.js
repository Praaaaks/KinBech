import React from 'react';
import { BsEnvelope, BsTelephone } from 'react-icons/bs';

const Footer = () => {
    return(
        <>
            <footer className='footer-bottom py-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <h4>Contact Us:</h4>
                            <br/>
                            <div className='footer-text d-flex gap-20'>
                                <span><BsTelephone/> 9860199571</span>
                                <span><BsEnvelope/> praksatyal@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;