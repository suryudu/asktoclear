import React,{useState,useEffect} from 'react';

import axios from 'axios';
import {useParams,useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateQuestion(props) {
    const {questionId} = useParams();
    const history =useHistory();
    const [question,setQuestion]=useState('');
  

    useEffect(()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/question/'+questionId,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            
            setQuestion(res.data[0].question);
           
           
        }).catch(err=>{
            console.log('error from getting')
        })
    },[questionId])


    const updateQuestion=(e)=>{
        e.preventDefault();
        const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
        const d=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;
        const data={
            question,
            date:d
        }
        
        axios
        .patch('https://asktoclearbackend.herokuapp.com/updatequestion/'+questionId,data,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
                toast.error(res.data.error)
            }else{
                toast.success(res.data.message);
                setTimeout(()=>{
                    history.push('/profile');
                },2000);
                
               
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
        <div className='updateinfo'>
        <form>
          <h1>Edit Your Question</h1>
          <div style={{textAlign:'center'}}>
              <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} rows='10' style={{width:'700px',fontSize:'20px',border:'2px solid red',padding:'5px'}} />
          </div>
            <div className="submit-buttons" style={{textAlign:'center'}}>
            <button onClick={updateQuestion}>Update</button>
            <button onClick={navigateBack}>Go Back</button>
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
          </form>
        </div>
        </>
    )
}
