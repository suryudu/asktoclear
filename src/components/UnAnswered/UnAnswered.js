import React from 'react';
import {Link} from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function UnAnswered(props) {
    // console.log(props.question);
    
    const q=props.q;
 

    return (
        <>
        <TableRow>
        <TableCell className='font'>Q</TableCell>
        <TableCell component="th" scope="row" align="left" className='q-font'>
          <Link to={`/submitanswer/${q._id}`} style={{color:'black'}}>{q.question}</Link>
        </TableCell>
        <TableCell align="center" style={{color:'#039be5'}}><p>{q.questionedBy.name}</p><p>{q.date}</p></TableCell>
      </TableRow>
        </>
    )
}
