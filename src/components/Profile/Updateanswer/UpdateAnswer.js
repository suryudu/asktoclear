import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useParams,useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UpdateAnswer(props) {
    const {answerId} =useParams();
    const [question,setQuestion]=useState('');
    const [answer,setAnswer]=useState('');
    const history =useHistory();

    useEffect(()=>{
        axios
        .get('http://localhost:3003/answer/'+answerId,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setAnswer(res.data[0].answer);
            setQuestion(res.data[0].question_id.question);
            
        })
    },[answerId])

    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
        const d=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;
        const data={
            answer,
            date:d
        }
        
        axios
        .patch('http://localhost:3003/updateanswer/'+answerId,data,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
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
  

    return (
        <>
        <div style={{textAlign:'center'}}>
        <h2 style={{marginBottom:'20px'}}>Update your answer</h2>

        <div>
            <p style={{fontSize:'20px',marginBottom:'20px'}}><strong>{question}</strong></p>
        </div>
        <div>
            <form >
            <div>
            <textarea value={answer} onChange={(e)=>setAnswer(e.target.value)} rows='10' style={{width:'700px',fontSize:'20px',border:'2px solid red',padding:'5px'}} />
            </div>
                <div style={{textAlign:"center"}} className="submit-buttons">
                
                <button type="submit" onClick={handleSubmit} >update</button>
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
        
    </div>
    
        </>
    )
}
