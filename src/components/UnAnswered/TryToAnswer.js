import React,{useEffect,useState} from 'react';
import UnAnswered from "./UnAnswered";
import Header from "../HeaderFile/Header";
// import Footer from "../FooterFiles/Footer";

import "../QuestionsDisplay/Questions.css";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
export default function TryToAnswer(props) {
    const classes = useStyles();
    const [questions,setQuestions]=useState([]);
    const [message,setMessage]=useState();

    useEffect(()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/allquestions',{headers:{'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.error){
                setMessage(res.data.error)
            }else{
                setQuestions(res.data);
            }
        }).catch(err=>{
            console.log('error from getting questions')
        })
    },[])
    

    const allQuestions=()=>{
        if(!questions.length){
            return (
                <>
                    <TableRow>
                        <TableCell>
                            <h4>{message}</h4>
                        </TableCell>
                    </TableRow>
                </>
            )
        }else{
            return questions.map((question,key)=>{
                // console.log(question.date);
             return  <UnAnswered q={question} key={key} />
            
            })
            // return <h1>{q.question}</h1>
        }
    }

    return (
        <>
        <div style={{display:'flex',backgroundColor:"#bbdefb",backgroundSize:'1000px'}}>
            <Header />

            

                <div className="questions" style={{marginTop:"100px",marginBottom:'300px'}}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="a dense table" >
                  <TableBody>
                    {allQuestions()}
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
            
            
            
        </div>
        
            
        </>
    )
}
