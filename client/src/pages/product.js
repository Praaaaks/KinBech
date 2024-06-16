import React, { useState, useEffect } from "react";
import { BsBookmark, BsX } from "react-icons/bs";
import axios from "axios";
import { useParams } from "react-router-dom";
import Meta from "../components/meta";

const ProductPage = () => {
    const [logged, setLogged] = useState(false);
    const [isBookmark, setIsBookmark] = useState(false);
    const [info, setInfo] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [creator, setCreator] = useState(null);
    let { id } = useParams();

    useEffect(() => {
        const callProfile = async () => {
            try {
                const res = await axios.get("/profile", {
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                    },
                });
                setInfo(res.data);
                setLogged(true);
            } catch (err) {
                setLogged(false);
            }
        };

        callProfile();
    }, []);

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`/product/get/${id}`, {
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                    },
                });
                setData(res.data);
            } catch (error) {
                setError("Cannot find the product");
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    useEffect(() => {
        const checkBookmark = async () => {
            try {
                const res = await axios.get(`/product/checkbookmark/${id}`, {
                    headers: {
                        "Access-Control-Allow-Credentials": true,
                        "Content-Type": "application/json",
                    },
                });
                setIsBookmark(res.data);
            } catch (error) {
                setIsBookmark(false);
            }
        };

        checkBookmark();
    }, [id]);

    const getUserById = async (userId) => {
      try {
          console.log("Fetching creator");
          const response = await axios.get(`http://localhost:5000/auth/user/${userId}`);
          console.log("Fetching creator 2");
          return response.data;
      } catch (error) {
          console.error('Error fetching user by ID:', error);
          return null;
      }
    };

    useEffect(() => {
      const fetchCreator = async () => {
        try {
          if (data && data.creator) {
              console.log(data);
              const user = await getUserById(data.creator);
              console.log(user);
              setCreator(user);
          } else {
              console.error('Product or creator is null');
          }
      } catch (error) {
          console.error('Error fetching creator:', error);
      };
    }
      fetchCreator();
  });

    const btnAddBookmark = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/product/addbookmark/${id}`);
            window.alert("Added to Bookmarks!");
            setIsBookmark(true);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                window.alert("Already added");
            } else {
                window.alert("Something went wrong");
            }
        }
    };

    const btnDelBookmark = async (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure?")) {
            try {
                await axios.post(`/product/deletebookmark/${id}`);
                window.alert("Removed Bookmark");
                setIsBookmark(false);
            } catch (error) {
                window.alert("Something went wrong!");
            }
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    let idMatch = info && data && info._id === data.creator;
    let logUser = idMatch && logged;

    return (
        <>
            <Meta title="Product" />
            <div className="product-page py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="product-image">
                                <img src={data.image_url} alt="Product" />
                            </div>
                        </div>
                        <div className="col-8">
                            <h3 className="product-title pb-4">{data.title}</h3>
                            <p className="product-poster">{creator.name}</p>
                            <p className="product-description">{data.description}</p>
                            <p className="product-price">Rs.{data.price}</p>
                            {isBookmark ? (
                                <button className="bookmark-btn p-2" onClick={btnDelBookmark}>
                                    <span><BsBookmark /> Remove Bookmark</span>
                                </button>
                            ) : (
                                <button className="bookmark-btn p-2" onClick={btnAddBookmark}>
                                    <span><BsBookmark /> Bookmark</span>
                                </button>
                            )}
                            {logUser && (
                                <button className="bookmark-btn p-2">
                                    <span><BsX /> Delete</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;
