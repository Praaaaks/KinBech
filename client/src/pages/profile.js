import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Meta from "../components/meta";
import ProductCard from "../components/productcard";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);
    const [products, setProducts] = useState([]);
    const [haveproducts, setHaveproducts] = useState(false);
    
    const callProfile = async () => {
        try {
            const res = await axios.get("/profile", {
                headers: {
                "Access-Control-Allow-Credentials": true,
                "Content-Type": "application/json",
            },
        });
        if (res && res.data) {
            const value = res.data;
            setInfo(value); 
        } else {
            throw new Error("Can't login");
        }
        } catch (error) {
            navigate("/login");
        }
    };

    const fetchProducts = async () => {
        try {
            console.log("Step 1");
            const response = await axios.get('http://localhost:5000/product/getmyproducts', {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Ensure credentials are included if authentication is required
            });
            console.log(response);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const checkProducts = async () => {
        try{
            if(products.length > 0){
                setHaveproducts(true);
            } else {
                setHaveproducts(false);
            }
        } catch(error) {
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    })
    useEffect(() => {
        callProfile();
    })
    // useEffect(() => {
    //     fetchBookmarked();
    // })
    useEffect(() => {
        checkProducts();
    })

    const btnLogout = async (e) => {
        e.preventDefault();
        axios
          .get("/auth/logout", {
            headers: {
              "Access-Control-Allow-Credentials": true,
            },
          })
          .then((res) => {
            window.location.reload();
            navigate("/");
          })
          .catch((error) => {
            window.alert("Unsuccessfull");
          });
    };

    return(
        <>
        <Meta title="Profile"/>
        <div className="profile-page py-4">
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <h3 className="pb-4">Profile</h3>
                        <p className="profile-name">Name: {info.name}</p>
                        <p className="profile-email">Email: {info.email}</p>
                        <p className="profile-mobile">Contact Number: {info.mobile}</p>
                        <Link className="btn me-4 mb-2" to="/create">Create Product</Link>
                        <button className="btn me-4 mb-2" onClick={btnLogout}>Log Out</button>
                        <div className="w-100"></div>
                                <div className="product-list">
                                    <p className="fs-4 fw-bold">My Products: </p>
                                    <div className="w-100"></div>
                                    {haveproducts ? (
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
    )
}

export default ProfilePage;