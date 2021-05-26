import React,{useState} from 'react';
import './EventProfile.css';
import {Link,useHistory} from 'react-router-dom';
import axios from'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import download from 'downloadjs';


export default function EventProfile(props) {
    const event=props.event;
    const history=useHistory();
    const [errorMsg, setErrorMsg] = useState('');

    const handleDelete=(e)=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Do you want do delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {deleteEvent()}
                    
              },
              {
                label: 'No',
                onClick: () => {history.push('/profile')}
              }
            ]
          });
       
        
    }

    const deleteEvent=()=>{
        axios
        .delete(`https://asktoclearbackend.herokuapp.com/deleteevent/${event._id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
                toast.error(res.data.error)
            }else{
                toast.success(res.data.message);
                setTimeout(()=>{
                    window.location.reload();
                },2000)
               
            }

        }).catch(err=>{
            console.log(err.message);
        })
    }
    
    const downloadFile = async () => {
        await axios
                .get('https://asktoclearbackend.herokuapp.com/download/'+event._id,{responseType:'blob'})
                .then(res=>{

                      setErrorMsg('');
                    return download(res.data,event.name,event.mimetype)
                }).catch(err=>{
                    setErrorMsg('getting from error');
                    toast.error(errorMsg);
                })
       
      };

    return (
        <>
            <div className='event'>
                <div className='event-date'>
                    <p>{event.date}</p>
                </div>
                <div className='event-image'>
                    <img src={event.file_path} alt={event.name} />
                </div>
                <a
                      href="#/"
                      onClick={() =>
                        downloadFile()
                      }
                    >
                      Download
                    </a>
                <div className='event-details'>
                    <div className='event-heading'>
                        <h3>{event.name}</h3>
                        <h3 className='event-organizer'>{event.organizer}</h3> 
                    </div>
                    <div className='event-info'>
                        <p>{event.info}</p>
                        <p>Contacts : {event.contacts}</p>
                    </div>
                </div>
                <div className='buttons button-alignment'>
                    <button><Link style={{color:'red'}} to={`/updateevent/${event._id}`}>Edit</Link></button>
                    <button onClick={handleDelete}>Delete</button>
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
                <hr></hr>
            </div>
            
        </>
    )
}
