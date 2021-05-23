import React,{useState} from 'react';
import "./ShareFile.css";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShareFile(props) {
    const [file,setFile]=useState('');
    const [name,setName]=useState('')
    const [description,setDesrciption]=useState('');
    const history=useHistory();
    
    const handleSubmit=(e)=>{
        e.preventDefault();
        const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
        const date=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;
        const formData=new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('file',file);
        formData.append('date',date);

        axios
        .post('http://localhost:3003/createfile',formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
                toast.error(res.data.error);
            }else{
                toast.success(res.data.message);

                setTimeout(()=>{
                    history.goBack();
                },2000)
            }
        })
    }

    const goBack=()=>{
        history.goBack();
    }


    return (
        <>
           <div className="sharefile">
                <h1>Share Your File</h1>
                <form>
                
                <div className="input">
                    
                    <input className="input-file" type="file" required onChange={(e)=>setFile(e.target.files[0])} />         
                </div>
                <div className="input">
                    <label>name</label><br />
                    <input className="input-style" type="text" required onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="input">
                    <label>Description</label><br />
                    <input className="input-style" type="text" onChange={(e)=>setDesrciption(e.target.value)} />
                </div>
                <div>
                    
                    <button type="submit" onClick={handleSubmit}>Post</button>
                    <button onClick={goBack}>Go Back</button>
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
                </form>
           </div>
        </>
    )
}
