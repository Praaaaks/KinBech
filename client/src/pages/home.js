import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import ProductCard from "../components/productcard";
import Meta from "../components/meta";

const Home = () => {

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/product/popular');
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    })

    return(
        <>
        <Meta title="KinBech" />
        <div className="store py-3">
            <div className="container">
                <div className="row">
                <div className="col-3">
                    <div className="category-card p-2">
                        <p className="category-title">Categories</p>
                        <ul className="ps-0">
                            <li>Clothing</li>
                            <li>Vehicles</li>
                            <li>Books and Education</li>
                            <li>Electronics</li>
                            <li>Computer & Peripherals</li>
                            <li>Smartphones & Accessories</li>
                            <li>Games and Toys</li>
                            <li>Furniture</li>
                            <li>Appliances</li>
                            <li>Sports and Fitness</li>
                        </ul>
                    </div>
                </div>
                <div className="col-8">
                    <div className="search-bar input-group mb-3">
                        <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2"><BsSearch/></button>
                    </div>
                    <div className="product-list">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            ) : (
                                <p>No products available</p>
                            )}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home;