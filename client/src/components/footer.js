import React from 'react';
import { BsEnvelope, BsTelephone } from 'react-icons/bs';

const Footer = () => {
    return(
        <>
            <footer className='footer-bottom py-3'>
                <div className='container'>
                    <div className='row'>
                            <h4>Contact Us:</h4>
                            <br/>
                        <div className='col-2'>
                                <p><BsTelephone/> 9860199571</p>
                                <p><BsTelephone/> 9765346805</p>
                        </div>
                        <div className='col-4'>
                                <p><BsEnvelope/> praksatyal@gmail.com</p>
                                <p><BsEnvelope/> aviyankc89@gmail.com</p>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;