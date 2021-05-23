import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {useParams,useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateFile(props) {
    const {fileId} =useParams();
    const history =useHistory();
    const [name,setName]=useState('');
    const [description,setDescription]=useState('');
    const [file,setFile]=useState('');
    
    useEffect(()=>{
        axios
        .get('http://localhost:3003/file/'+fileId)
        .then(res=>{
            
            setName(res.data[0].name);
            setDescription(res.data[0].description);
        }).catch(err=>{
            console.log(err.message);
        })
    },[fileId])


    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }

    const updateFile=(e)=>{
        e.preventDefault();
        const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
        const d=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;
        const formData=new FormData();
        formData.append('name',name);
        formData.append('description',description);
        formData.append('file',file);
        formData.append('date',d);

        axios
        .patch('http://localhost:3003/updatefile/'+fileId,formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
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

    return (
        <>
        <div className="updateinfo">
                <h1>Edit Your Profile</h1>
                <form>
                <div className="userinfo">
                    <label>Name :</label><br />
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  />
                </div>
                <div className="userinfo">
                    <label>Description :</label><br />
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
                </div>
                <div style={{marginLeft:'200px',padding:'10px'}}>
                    <label>Change File:</label><br />
                    <input type='file' onChange={(e)=>setFile(e.target.files[0])} />
                </div>
                <div style={{textAlign:"center"}}>
                <button onClick={navigateBack}>Go Back</button>
                <button onClick={updateFile}>Update</button>
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
