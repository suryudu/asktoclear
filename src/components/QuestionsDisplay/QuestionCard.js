import React from 'react';
import "./QuestionCard.css";
import {Link} from "react-router-dom";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function QuestionCard(props) {
 
    const q=props.question;
    const helo=()=>{
        <div>
            <div className="question">
                <div className="question-details">
                    <Link to={`/answer/${q._id}`}><h4 style={{display:"flex"}}><div style={{color:"red"}}>Q</div><div style={{marginLeft:"10px",textAlign:"justify",cursor:"pointer"}}>. {q.question}</div></h4></Link>
                </div>
                <div className="questionedby">
                    <p style={{cursor:"pointer"}}>{q.questionedBy.name}</p>
                    <p>{q.date}</p>
                </div> 
            </div>

           
            
        </div>
    }
    return (
        <>
        
        <TableRow>
        <TableCell className='font'>Q</TableCell>
        <TableCell component="th" scope="row" align="left" className='q-font'>
          <Link to={`/answer/${q._id}`} style={{color:'black'}}>{q.question}</Link>
        </TableCell>
        <TableCell align="center" style={{color:'#039be5'}}><p>{q.questionedBy.name}</p><p>{q.date}</p></TableCell>
      </TableRow>
           
        </>
    )
}
