import React,{useEffect,useState} from 'react';
import "./Answer.css";
import AnswerCard from "./AnswerCard";
import Header from "../HeaderFile/Header";
import axios from 'axios';
import {useParams,Link} from 'react-router-dom';





export default function Answer(props) {
    
    const {questionId}=useParams();
    const [question,setQuestion]=useState();
    const [answers,setAnswers]=useState([]);
    const [message,setMessage]=useState('');
    
  
    useEffect(()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/answers/'+questionId)
        .then(res=>{
           
            setQuestion(res.data.question);
            if(res.data.error){
                setMessage(res.data.error);
            }else{
                setAnswers(res.data.answer);
            }
           
            
          
        }).catch(err=>{
            console.log('error from getting answers');
        })
    },[questionId])



    const displayQuestion=()=>{
        if(!question){
            return <h4>loading....</h4>
        }else{
            
           
            return (
                
                <>
                <table className="question-table">
                <tbody>
                    <tr>
                        <td rowSpan='2'>
                           <img src={`https://asktoclearbackend.herokuapp.com/${question.questionedBy.file_path}`} height='40px' width='40px' />
                        </td>
                        <td>
                            {question.questionedBy.name} {question.date}
                        </td>
                    </tr>
                    <tr>
                        <td style={{fontSize:'25px'}}>
                           <strong>{question.question}</strong>
                        </td>
                    </tr>

                </tbody>
            </table>
                </>
            )
        }
    }

    const displayAnswers=()=>{
        
        if(!answers.length){
            return <td style={{fontSize:'25px',textAlign:'center'}}>{message}</td>
        }else{
            return answers.map((answer,key)=>{
                const number=key;
                
                return <AnswerCard answer={answer} number={number} key={key} />
            })
        }
    }

    return (
        <>
        
        <div style={{display:"flex"}}>
        
            <Header />
            
        <div className="answers">
        <div className="">
            {displayQuestion()}
        <div className="answer-card answer-table">
            <table className="">
                <tbody>
                   {displayAnswers()}
                </tbody>
            </table>
        </div>
        
        <Link to={`/submitanswer/${questionId}`}><button style={{float:'right',height:'30px',marginTop:'10px',cursor:'pointer',borderRadius:'10px',padding:'5px',backgroundColor:'#bbdefb',color:'black',fontSize:'20px'}}>Create Answer</button></Link>
        
        </div>
        
        </div>
        
        </div>
        
        </>
        
        
    )
}
