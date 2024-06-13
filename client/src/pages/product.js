import React from "react";
import { BsBookmark } from "react-icons/bs";
import Meta from "../components/meta";

const ProductPage = () => {
    return(
        <>
        <Meta title="Product"/>
        <div className="product-page py-3">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="product-image">
                            <img src="" alt="Product" />
                        </div>
                    </div>
                    <div className="col-8">
                        <h3 className="product-title pb-4">Product</h3>
                        <p className="product-poster">Me</p>
                        <p className="product-description">This is a product.</p>
                        <p className="product-price">Rs. 100.00</p>
                        <button className="bookmark-btn p-2">
                            <span> <BsBookmark/> Bookmark</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProductPage;