import React,{useEffect,useState} from 'react';
// import "./Questions.css";
import QuestionCard from "./QuestionCard";
import Header from "../HeaderFile/Header";
import axios from 'axios';
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

export default function Questions(props) {
    const classes = useStyles();
    const [questions,setQuestions]=useState([]);
    const [message,setMessage]=useState();

    useEffect(()=>{
        const ac = new AbortController();
        axios
        .get('https://asktoclearbackend.herokuapp.com/allquestions')
        .then(res=>{
            if(res.data.error){
                setMessage(res.data.error)
               
            }else{
                setQuestions(res.data);
               
            }
           
        }).catch(err=>{
            console.log(err);
            
        })
        return () => ac.abort();
    },[])

    const allquestions=()=>{
        if(!questions.length){
            
            return (
                <>
                    <TableRow>
                        <TableCell>
                        {message ? message : "loading.."}
                           
                        </TableCell>
                    </TableRow>
                </>
            )
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
