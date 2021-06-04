import React from 'react';
import "./QuestionCard.css";
import {Link} from "react-router-dom";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function QuestionCard(props) {
 
    const q=props.question;
   
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
