import React from "react";
import Meta from "../components/meta";

const ProfilePage = () => {
    return(
        <>
        <Meta title="Profile"/>
        <div className="profile-page py-3">
            <div className="container">
                <div className="col-6">
                    <h3 className="pb-4">Profile</h3>
                    <p className="profile-name">User</p>
                    <p className="profile-email">Email</p>
                    <p className="profile-mobile">Number</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default ProfilePage;