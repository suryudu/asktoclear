import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ChangePassword(props) {
    const [password,setPassword]=useState();
    const [type,setType]=useState(true);
    const [error,setError]=useState();
   
    const history=useHistory();
    const changeInputType=()=>{
        setType(!type);
    }
    const updatePassword=(e)=>{
        e.preventDefault();
        if(!password){
            setError('please fill the filed')
        }
        else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/))
        {
            setError('password should contain atleast one uppercase ,lowercase letter,one digit and special characet');
            
            return ;
        }else{
            
            const data={
                password
            }
            axios
            .patch('https://asktoclearbackend.herokuapp.com/updatepassword',data,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
            .then(res=>{
                if(res.data.error){
                    toast.error(res.data.error)
                }else{
                    toast.success(res.data.message)
                    setTimeout(()=>{
                        history.push('/profile');
                    },2000)
                    
                }
            })
        }
        
    }
    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }

    return (
        <>
        <div className="updateinfo" style={{textAlign:'center'}}>
        <h2>change password</h2>
        <form>
            
            <div className="userinfo">
            
            <input type={type ? 'password' : 'text'} style={{marginLeft:"30px",fontSize:'20px'}} required onChange={(e)=>setPassword(e.target.value)}  /><br />
            </div>
            
            <h3 style={{cursor:'pointer'}} onClick={changeInputType}>show password</h3>
            <h3 style={{color:'red'}}>{error}</h3>
            <div className="submit-buttons">
            <button type="submit" onClick={updatePassword}>Submit</button>
            <button  onClick={navigateBack}>Go Back</button>
            </div>
            
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
            </form>
    </div>
        </>
    )
}
