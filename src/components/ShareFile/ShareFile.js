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
        .post('https://asktoclearbackend.herokuapp.com/createfile',formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
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

    const goBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }

    return (
        <>
        <div className="updateinfo">
        <h1>upload Your File</h1>
        <form>
        <div className="userinfo">
            <label>Name :</label><br />
            <input type="text" onChange={(e)=>setName(e.target.value)}  />
        </div>
        <div className="userinfo">
            <label>Description :</label><br />
            <input type="text" onChange={(e)=>setDesrciption(e.target.value)} />
        </div>
        <div style={{marginLeft:'200px',padding:'10px'}}>
            <label>Change File:</label><br />
            <input type='file' onChange={(e)=>setFile(e.target.files[0])} />
        </div>
        <div style={{textAlign:"center"}}>
        <button onClick={goBack}>Go Back</button>
        <button onClick={handleSubmit}>Update</button>
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
