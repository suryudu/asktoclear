import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdatePic(props) {
    const [file,setFile]=useState('');
    const history =useHistory();

    const submitPic=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append('file',file);

        axios
        .patch('https://asktoclearbackend.herokuapp.com/updateprofilepic',formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
                toast.error(res.data.error)
            }else{
                toast.success(res.data.message)
                setTimeout(()=>{
                    history.push('/profile')
                },2000)
                
            }
        })
    }
    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }


    return (
        <>
            <div className='updateinfo' style={{textAlign:'center'}}>
            <h2>upload your profile pic</h2>
                <form>
                <div className="userinfo" style={{textAlign:'center'}}>
                
                <input type="file" style={{border:'none'}} onChange={(e)=>setFile(e.target.files[0])} /><br />
                </div>
                   <div className="submit-buttons" style={{textAlign:'center'}}>
                   <button type="submit" onClick={submitPic}>Submit</button>
                   <button onClick={navigateBack}>Go Back</button>
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
