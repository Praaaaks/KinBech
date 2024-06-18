import React, { useState, useEffect } from "react";
import { BsXLg } from "react-icons/bs";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Meta from "../components/meta";

const ProductPage = () => {
    const navigate = useNavigate();
    const [logged, setLogged] = useState(false);
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

    const getUserById = async (user_id) => {
      try {
        //   console.log("Fetching creator");
          const response = await axios.get(`http://localhost:5000/auth/user/${user_id}`);
        //   console.log("Fetching creator 2");
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
              console.log(data.creator);
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
                                <img src={data.image_url} alt="Product" height="500" width ="350"/>
                            </div>
                        </div>
                        <div className="col-8">
                            <h3 className="product-title pb-4">{data.title}</h3>
                            <p className="fs-5 fw-semibold">Poster:</p>
                            <p className="product-poster">{creator ? creator.name : "Loading creator..."}</p>
                            <p className="fs-5 fw-semibold">Contact Info:</p>
                            <p className="product-poster-email">{creator ? creator.email : "Loading creator..."}</p>
                            <p className="product-poster-number">{creator ? creator.mobile : "Loading creator..."}</p>
                            <p className="fs-5 fw-semibold">Description:</p>
                            <p className="product-description">{data.description}</p>
                            <p className="fs-5 fw-semibold">Price:</p>
                            <p className="product-price">Rs.{data.price}</p>
                            {logUser && (
                                <button className="bookmark-btn btn-warning p-2 align-items-center" onClick={() => {
                                    if(window.confirm("Are you sure?") === true){
                                        axios
                                            .delete(`/product/delete/${id}`)
                                            .then(() => {navigate(`/profile`)})
                                    }
                                }}>
                                    <BsXLg /> Delete
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
