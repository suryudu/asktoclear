import React,{useState,useEffect} from 'react';
import "./ProfileMenu.css";
import QuestionProfile from "./QuestionsProfile/QuestionProfile";
import AnswerProfile from "./Answersprofile/AnswerProfile";
import EventProfile from "./eventsProfile/EventProfile";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import FileProfile from './filesProfile/FileProfile';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


export default function ProfileMenu(props) {
    const classes = useStyles();
    const [questions,setQuestions]=useState([]);
    const [answers,setAnswers]=useState([]);
    const [files,setFiles]=useState([]);
    const [events,setEvents]=useState([]);
    
   
    useEffect(()=>{
        axios
        .get('http://localhost:3003/myquestions',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{

            setQuestions(res.data);
            
        })
        axios
        .get('http://localhost:3003/myanswers',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setAnswers(res.data);
            
        })
        axios
        .get('http://localhost:3003/myevents',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setEvents(res.data)
        })
        axios
        .get('http://localhost:3003/allfiles',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{    
            setFiles(res.data);
        })
    },[])

    const [menuItem,setMenuItem]=useState('questions');
    const menu=()=>{
        if(menuItem==="questions"){
            
            if(!questions.length){
                return <h1>no questions</h1>
            }else{
                return questions.map((question,key)=>{
                    return <QuestionProfile question={question} key={key} />
                })
                
            }
        }else if(menuItem==="answers"){
            
            if(!answers.length){
                return <h1 style={{textAlign:'center'}}>no answers</h1>
            }else{
                return answers.map((answer,key)=>{
                    return <AnswerProfile answer={answer} key={key} />
                })
            }
        }else if(menuItem==="files"){
            
           if(!files.length){
               return <h1>no files</h1>
           }else{
               return (
                   <>
                   <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="a dense table" style={{fontSize:'30px'}}>
                  <TableHead>
                    <TableRow style={{}}>
                      <TableCell align="center">File</TableCell>
                      <TableCell align="center" style={{width:'200px'}}></TableCell>
                      <TableCell align="left" style={{width:'100px'}}>name</TableCell>
                      <TableCell align="left" style={{width:'500px',textAlign:'center'}}>description</TableCell>
                      <TableCell align="center">date</TableCell>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileDisplay()}
                  </TableBody>
                </Table>
              </TableContainer>
                   </>
               )
           }
        }else if(menuItem==="updates"){
            
            if(!events.length){
                return <h1>no events</h1>
            }else{

                return (
                    <>
                    <Grid container spacing={1}>
                        {eventsfunction()}
                    </Grid>
                    </>
                )
                
                
            }
        }
    }

    const fileDisplay=()=>{
        return files.map((file,key)=>{
            return <FileProfile file={file} key={key} />
        })
    }
    
    const eventsfunction=()=>{
        return(
            events.map((event,key)=>{
           return (
               <>
                   <Grid container item xs={4} spacing={3}>
                       <EventProfile event={event} key={key} />
                   </Grid>
               </>)
       }))
    }

    return (
        <div style={{marginBottom:"30px"}}>
            <div className="profile-menu">
                <ul>
                    <li className="" style={{color: menuItem==='questions' ? 'blue':'black'}} onClick={()=>{setMenuItem("questions")}} >Questions</li>
                    <li className="" style={{color: menuItem==='answers' ? 'blue':'black'}} onClick={()=>{setMenuItem("answers")}}>Answered</li>
                    <li className="" style={{color: menuItem==='files' ? 'blue':'black'}} onClick={()=>{setMenuItem("files")}}>Shared Files</li>
                    <li className="" style={{color: menuItem==='updates' ? 'blue':'black'}} onClick={()=>{setMenuItem("updates")}}>Updates</li>
                </ul>
            </div>
            <div style={{marginLeft:'20px'}}>
                {menu()}
            </div>
        </div>
    )
}
