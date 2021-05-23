import React,{useState,useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateEvent(props) {
    const {eventId}=useParams();
    const [type,setType]=useState('');
    const [name,setName]=useState('');
    const [organizer,setOrganizer]=useState();
    const [info,setInfo]=useState('');
    const [contacts,setContacts]=useState('');
    const [file,setFile]=useState('');
    const history =useHistory();
    
    useEffect(()=>{
        axios
        .get('http://localhost:3003/event/'+eventId,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setType(res.data[0].type);
            setName(res.data[0].name);
            setOrganizer(res.data[0].organizer);
            setInfo(res.data[0].info);
            setContacts(res.data[0].contacts);

        })
    },[eventId])

    const handleSubmit=(e)=>{
        e.preventDefault();
        const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
        const d=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;
        const formData =new FormData();
        formData.append('name',name);
        formData.append('type',type);
        formData.append('organizer',organizer);
        formData.append('info',info);
        formData.append('contacts',contacts);
        formData.append('file',file);
        formData.append('date',d);
    
        // for(let pair of formData.entries())
        // {
        // console.log(pair[0] + "->" +pair[1]+"\n");
        // }

        axios
        .patch('http://localhost:3003/updateevent/'+eventId,formData,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
                toast.error(res.data.error)
            }else{
                toast.success(res.data.message);
                setTimeout(()=>{
                    history.push('/profile');
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
        <div className="updateinfo">
        <h1>Update Event/Update</h1>
        <form>
        <div className="userinfo">
        <label>Event Type</label><br />
        <h4 style={{color:'red'}}>{type}</h4>
        </div>
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
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>
        
        <div className="userinfo">
            <label>Organizer</label><br />
            <input type="text" value={organizer} onChange={(e)=>setOrganizer(e.target.value)} />
        </div>
        <div className="userinfo">
            <label>More Info</label><br />
            <input type="text" value={info} onChange={(e)=>setInfo(e.target.value)} />
        </div>
        <div className="userinfo">
            <label>Contacts </label><br />
            <input type="text" value={contacts} onChange={(e)=>setContacts(e.target.value)} />
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
