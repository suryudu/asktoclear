import React,{useState,useEffect} from 'react';
import Header from "../HeaderFile/Header";
// import "../QuestionsDisplay/Questions.css";
import axios from 'axios';
import {useParams,useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SubmitAnswer.css";

export default function SubmitAnswer(props) {
    const [answer,setAnswer]=useState('');
    const [question,setQuestion]=useState([]);
    const history =useHistory();
    const {questionId}=useParams();
   
    useEffect(()=>{
        axios.get('http://localhost:3003/question/'+questionId,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setQuestion(res.data);
         
        }).catch(err=>{
            console.log('error from getting question');
        })
    },[questionId])

    const questionDisplay=()=>{
        if(!question.length){
            
            return <h1 style={{fontSize:'20px'}}>question not found</h1>
        }else{
           
            return (
                <>
                <table className="submit-table">
                <tbody>
                    <tr>
                        <td>
                           <img src={`http://localhost:3003/${question[0].questionedBy.file_path}`} height='40px' width='40px' />
                        </td>
                        <td>
                            {question[0].questionedBy.name} {question[0].date}
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td style={{fontSize:'25px'}}>
                           <strong>{question[0].question}</strong>
                        </td>
                    </tr>

                </tbody>
            </table>
                </>
            )

                
        }
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
        .post('http://localhost:3003/createanswer/'+questionId,data,{headers:{'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
               toast.error(res.data.error);
            }else{
                toast.success(res.data.message);
                setTimeout(()=>{
                    history.push("/trytoanswer");
                },2000)
                
            }
        })
    }

    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack()
    }

    return (
        <>
        <div style={{display:'flex'}}>
        <Header />
        
        <div className="submit-answer" style={{marginTop:'100px'}}>
            <div className="question">
                {questionDisplay()}
            </div>
            <div style={{padding:'10px 0px 5px 30px'}}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                              <textarea style={{height:'200px',width:'900px',fontSize:'20px'}} onChange={(e)=>setAnswer(e.target.value)}>

                              </textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{textAlign:'center'}} className='submit-buttons'>
            <button onClick={handleSubmit} >
            Submit
            </button>
            <button onClick={navigateBack}>
            GoBack
            </button>
            </div>
            
            
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
    </div>
    
        </>
    )
}
