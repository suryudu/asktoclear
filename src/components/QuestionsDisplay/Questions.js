import React,{useEffect,useState} from 'react';
// import "./Questions.css";
import QuestionCard from "./QuestionCard";
import Header from "../HeaderFile/Header";
import QuestionSearch from "./QuestionSearch";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

export default function Questions(props) {
    const classes = useStyles();
    const [questions,setQuestions]=useState([]);
    const [message,setMessage]=useState();

    useEffect(()=>{
        axios
        .get('http://localhost:3003/allquestions')
        .then(res=>{
            if(res.data.error){
                setMessage(res.data.error)
            }else{
                setQuestions(res.data);
            }
           
        })
    },[])

    const allquestions=()=>{
        if(!questions.length){
            return <h4>{message}</h4>
        }else{
            return questions.map((question,key)=>{
                return <QuestionCard question={question} key={key} />
            })
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
                    {allquestions()}
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
            
            
            
        </div>

        </>
    )
}
