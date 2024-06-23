import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import ProductCard from "../components/productcard";
import Meta from "../components/meta";

const Home = () => {

    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const fetchProducts = async (query = "", category = "") => {
        try {
            const response = await axios.get('/product/popular', {
                params: {
                    searchQuery: query,
                    category: category
                }
            });
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts(searchQuery, selectedCategory);
    }, [searchQuery, selectedCategory]);

    const handleSearchChange = (e) => {
        console.log("Search value change");
        setSearchQuery(e.target.value);
    };

    const handleSearchClick = () => {
        console.log("Search initiated")
        fetchProducts(searchQuery, selectedCategory);
    };

    const handleCategoryClick = (category) => {
        console.log("Category clicked");
        setSelectedCategory(category === "All Categories" ? "" : category);
        fetchProducts(searchQuery, category === "All Categories" ? "" : category);
    };

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
                        <li onClick={() => handleCategoryClick("All Categories")}>All Categories</li>
                        {["Clothing", "Vehicles", "Books and Education", "Electronics", "Computer & Peripherals", "Smartphones & Accessories", "Games and Toys", "Furniture", "Appliances", "Sports and Fitness"].map((category) => (
                                        <li key={category} onClick={() => handleCategoryClick(category)}>{category}</li>
                                    ))}
                        </ul>
                    </div>
                </div>
                <div className="col-9">
                    <div className="search-bar input-group mb-3">
                        <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" value={searchQuery} onChange={handleSearchChange}/>
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearchClick}><BsSearch/></button>
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