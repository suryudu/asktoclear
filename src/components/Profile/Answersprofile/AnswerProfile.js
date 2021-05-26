import React from 'react';
import "./AnswerProfile.css";
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AnswerProfile(props) {
    const answer=props.answer;
    const history=useHistory();

    const handleDelete=(e)=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Do you want do delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {deleteAnswer()}
                    
              },
              {
                label: 'No',
                onClick: () => {history.push('/profile')}
              }
            ]
          });
       
        
    }

    const deleteAnswer=()=>{
        axios
        .delete(`https://asktoclearbackend.herokuapp.com/deleteanswer/${answer._id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
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

    return (
        <>
        <div className="answer">
            <p><span style={{color:"red"}}>Q </span> . {answer.question_id.question}</p>
            <p style={{marginLeft:"30px",paddingTop:"6px"}}><span style={{color:"blue"}}>A</span> . {answer.answer}.</p>
            <p style={{color:"#1565c0",marginTop:"10px"}}>{answer.date}</p>
            <div className="buttons">
                <button><Link style={{color:'red'}} to={`/updateanswer/${answer._id}`}>Edit</Link></button>
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
            
        </div>
        <hr/>
        </>
    )
}
