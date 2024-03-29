import React,{useState} from 'react';
import "./PostEvent.css";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostEvent(props) {
    const [type,setType]=useState('');
    const [name,setName]=useState('');
    const [organizer,setOrganizer]=useState('');
    const [info,setInfo]=useState('');
    const [contacts,setContacts]=useState('');
    const [file,setFile]=useState();
    const history=useHistory();


    const handleSubmit=(e)=>{
        e.preventDefault();
        const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
        const date=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;
        const formData=new FormData();
        formData.append('type',type);
        formData.append('name',name);
        formData.append('organizer',organizer);
        formData.append('info',info);
        formData.append('contacts',contacts);
        formData.append('file',file);
        formData.append('date',date);

        axios
        .post('https://asktoclearbackend.herokuapp.com/createevent',formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
               toast.error(res.data.error);
            }else{
                toast.success(res.data.message);
                setTimeout(()=>{
                    history.goBack();
                },2000)
               
            }
        }).catch(err=>{
            console.log(err);
        })


    }

    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }
    
    return (
        <>
        <div className="updateinfo">
        <h1>Upload Event/Update</h1>
        <form>
        
        <div className="userinfo">
            <label>change event/update type:</label><br />
            <select onChange={(e)=>setType(e.target.value)} style={{height:'30px'}}>
                <option>select category</option>
                <option value='competition'>Competition</option>
                <option value='fest'>Fest</option>
                <option value='techFest'>Tech Fest</option>
                <option value='webinar'>Webinar</option>
                <option value='sports'>Sports</option>
            </select>
        </div>
        <div className="userinfo">
        <label>Event Name</label><br />
        <input type="text" onChange={(e)=>setName(e.target.value)} />
        </div>
        
        <div className="userinfo">
            <label>Organizer</label><br />
            <input type="text" onChange={(e)=>setOrganizer(e.target.value)} />
        </div>
        <div className="userinfo">
            <label>More Info</label><br />
            <input type="text" onChange={(e)=>setInfo(e.target.value)} />
        </div>
        <div className="userinfo">
            <label>Contacts </label><br />
            <input type="text" onChange={(e)=>setContacts(e.target.value)} />
        </div>
        <div className="userinfo">
            <label>Change Poster</label><br/>
            <input type="file" onChange={(e)=>setFile(e.target.files[0])} style={{border:'none'}} />
        </div>
        <div className='submit-buttons' style={{textAlign:'center'}}>
            
            <button type="submit" onClick={handleSubmit}>Update</button>
            <button onClick={navigateBack}>Go Back</button>
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
