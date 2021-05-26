import React,{useState} from 'react';
import axios from "axios";
import {useHistory} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AskQuestion(props) {
    const [question,setQuestion]=useState('');
    const history=useHistory();
    const m=['Jan','Feb','March','April','May','June','July','Aug','Sept','Nov','Dec'];
    const d=`${m[new Date().getMonth()]} ${new Date().getDate()},${new Date().getFullYear()}`;

  
    const handleSubmit=(e)=>{
      e.preventDefault();
      
      const data={
        question,
        date:d
        
      }
     
      axios
      .post('https://asktoclearbackend.herokuapp.com/askyourquestion',data,{headers:{'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('jwt')}})
      .then(res=>{
        if(res.data.error){
          toast.error(res.data.error);
        }else{
          
          toast.success(res.data.message);
          setTimeout((e) => {
         
            history.goBack();
         }, 2000);
          
        }
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
          <h1>Ask Your Question</h1>
          <div style={{textAlign:'center'}}>
              <textarea value={question} onChange={(e)=>setQuestion(e.target.value)} rows='10' style={{width:'700px',fontSize:'20px',border:'2px solid red',padding:'5px'}} />
          </div>
            <div className="submit-buttons" style={{textAlign:'center'}}>
            <button onClick={handleSubmit}>Ask</button>
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
