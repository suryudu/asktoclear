import React from 'react';
import "./QuestionProfile.css";
import {Link,useHistory} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QuestionProfile(props) {
    
    const question =props.question;
    const history=useHistory();
    const handleDelete=(e)=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Do you want do delete?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {deleteQuestion()}
              },
              {
                label: 'No',
                onClick: () => {history.push('/profile')}
              }
            ]
          });
       
        
    }

    const deleteQuestion=()=>{
            axios
            .delete(`http://localhost:3003/deletequestion/${question._id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
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
        <div style={{display:"flex"}}>
            <div className="question">
                <div className="question-content">
                    <p><span style={{color:"red"}}>Q </span> . {question.question}</p>
                </div>
                <div className="posted-time">
                    <p>{question.date}</p>
                </div>
                
            </div>
            <div className="buttons" style={{marginTop:'30px'}}>
               
                <button><Link style={{color:'red'}} to={`/updatequestion/${question._id}`}>Edit</Link></button>
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
       
        <hr />
        </>
    )
}
