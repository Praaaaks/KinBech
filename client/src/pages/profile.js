import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Meta from "../components/meta";

const ProfilePage = () => {
    const navigate = useNavigate();
    const [info, setInfo] = useState([]);

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

    useEffect(() => {
        callProfile();
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
        <div className="profile-page py-3">
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <img src="" alt=""/>
                        <div class="input-group mb-3">
                            <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon03">Upload</button>
                            <input type="file" class="form-control" id="inputGroupFile03" aria-describedby="inputGroupFileAddon03" aria-label="Upload"/>
                        </div>
                    </div>
                    <div className="col-5">
                        <h3 className="pb-4">Profile</h3>
                        <p className="profile-name">{info.name}</p>
                        <p className="profile-email">{info.email}</p>
                        <p className="profile-mobile">{info.mobile}</p>
                            <Link className="btn me-4" to="/create">Create Product</Link>
                            <button className="btn me-4" onClick={btnLogout}>Log Out</button>
                            <button className="btn me-4">Edit</button>
                            <button className="btn me-4">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfilePage;