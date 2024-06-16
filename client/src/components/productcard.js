import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="col-4 justify-items-center">
            <div className="product-card" onClick={() => navigate(`/product/${product._id}`)}>
                <div className="product-image pb-2">
                    <img src={product.image_url} alt="product" height="190" width="223"/>
                </div>
                <div className="product-details">
                    <h6 className="product-title">{product.title}</h6>
                    <p className="product-price">Rs. {product.price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
