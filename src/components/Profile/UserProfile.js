import React,{useEffect,useState} from 'react';
import "./UserProfile.css";
import BasicProfile from "./BasicProfile";
import ProfileInfoCard from "./ProfileInfoCard";
import ProfileMenu from "./ProfileMenu";
import Header from "../HeaderFile/Header";
import {Link} from "react-router-dom";
import axios from "axios";


export default function UserProfile(props) {
     const [userData,setUserData]=useState();
     
   
    useEffect(()=>{       
            axios
            .get('https://asktoclearbackend.herokuapp.com/myprofile',{headers:{'Authorization':'Bearer '+localStorage.getItem("jwt")}})
            .then(res=>{
                if(res.data.error){
                    console.log(res.data.error);
                }else{
                    setUserData(res.data)
                }
            }).catch(err=>{
                console.log('error from getting');
            })
            
    },[])

    const displayProfile=()=>{
        
        if(!userData){
           return <h4>Loading....</h4>
        }else{
            return (
                <>
                    <BasicProfile data={userData}/>
                    <ProfileInfoCard data={userData} />
                </>
            )
        }
    }
    return (
        <>
            <div style={{display:"flex"}}>
                <Header />
                <div className="profile">
                    <div className="profile-details">
                        {displayProfile()}
                    </div>
                </div>
            </div>
            <div className="profile-buttons">
            <Link to="/updateinfo"><button>Update Info</button></Link>
                <Link to="/updatepic" ><button>update profile pic</button></Link>
                <Link to="/changepassword"><button>change password</button></Link>
            </div>
            <ProfileMenu />
            
            
           
        </>
    )
}
