import React,{useEffect,useState} from 'react';
import {useParams,useHistory} from 'react-router-dom';
import axios from 'axios';
import download from 'downloadjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Files.css';

export default function ImageViewer(props) {
    const [image,setImage]=useState();
    const {id}=useParams();
    const history =useHistory();
    const [message,setMessage]=useState();
    useEffect(()=>{
        axios
        .get('http://localhost:3003/file/'+id)
        .then(res=>{
            
            setImage(res.data[0])
        })
    },[id])
    

    const display=()=>{
        if(!image){
            return <h1>no image</h1>
        }else{
            
            return <img src={'http://localhost:3003/'+image.file_path} alt={image.name} ></img>
        }
    }
    const downloadFile=()=>{
        axios
        .get('http://localhost:3003/downloadfile/'+image._id,{responseType:'blob'})
        .then(res=>{
            setMessage('');
          return download(res.data,image.name,image.mimetype)
      }).catch(err=>{
          setMessage('getting from error');
          toast.error(message);
      })
    }

    const navigateGoBack=(e)=>{
        e.preventDefault()
        history.goBack();
    }

    return (
        <>
        <div className="view-buttons">
        <button onClick={navigateGoBack}>Go back</button>
        <a href="#/" onClick={()=>downloadFile()}><button>download</button></a>
        </div>
            <div className="imageviewer">
            {display()}
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
        
        </>
    )
}
