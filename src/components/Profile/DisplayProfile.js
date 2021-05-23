import React from 'react';
import "./UserProfile.css";
import BasicProfile from "./BasicProfile";
import ProfileInfoCard from "./ProfileInfoCard";
import Header from "../HeaderFile/Header";

// import Footer from "../FooterFiles/Footer";

export default function DisplayProfile(props) {
    

    return (
        <>
            <div style={{display:"flex"}}>
                <Header />
                <div className="profile">
                    <div className="profile-details">
                        <BasicProfile />
                        <ProfileInfoCard />
                    </div>
                </div>
            </div>
         
        </>
    )
}
