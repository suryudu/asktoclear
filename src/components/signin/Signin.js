import React,{useState,useContext} from 'react';
import "./Login.css";
import Header from "../HeaderFile/Header";
import {Link} from "react-router-dom";
import axios from 'axios';
import {UserContext} from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Signin(props) {
    
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    // const [errorMessage,setErrorMessage]=useState('');
   const {state,dispatch} = useContext(UserContext); 
   
    const handleLogin= (e)=>{
        e.preventDefault();
        const data={
            email,
            password
        }
  
        axios
        .post('http://localhost:3003/signin',data,{headers:{'Content-Type':'application/json'}})
        .then((res)=>{
          
            if(res.data.error){
                toast.error(res.data.error);
            }else{
                localStorage.setItem("jwt",res.data.token)
                localStorage.setItem("user",JSON.stringify(res.data.user))
                dispatch({type:"USER",payload:data.user})
               // console.log(res);
               toast.success(res.data.message);
                setTimeout(() => {
                     window.location.href="/";
                }, 2000);

               
            }
        }).catch(err=>{
            console.log(err.message)
        })
    }

    return (
        <div style={{display:"flex"}}>
            <Header />
            <div className="login-form">
               
                <form onSubmit={handleLogin}>
                    <h2>Sign In</h2>
                    <div className="login_field">
                        <label><span className="label-name">Email</span></label>
                        <input type="email" placeholder="surya123@gmail.com" required onChange={e=>setEmail(e.target.value)} />
                        
                    </div>
                    <div className="login_field">
                        <label><span className="label-name">password</span></label>
                        <input type="password" required onChange={e=>setPassword(e.target.value)} />
                    </div>
                    <div className="input">
                        <button>Sign In</button>
                        <ToastContainer
                                position="top-right"
                                autoClose={2000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                />
                    </div>
                    <a href="#/">Forgot Password?</a>
                    <div className="register">
                    <Link to="/signup"><p>Register</p></Link> 
                    </div>
                </form>
            </div>
        
        </div>
    
    )
}
