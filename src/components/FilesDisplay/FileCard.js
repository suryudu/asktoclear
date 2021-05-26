import React from 'react';
import "./Files.css";
import axios from 'axios';
import download from 'downloadjs';
import pdf from "../../pdf.png";
import {Link} from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function FileCard(props) {
    const file=props.file;
    const post=file.file_path;

    // console.log(post.split('.').pop());
    const extension =post.split('.').pop();


    const fileDisplay=()=>{
      if(extension === "pdf"){
       
          return (
          <>
          <Link to={`/pdfviewer/${file._id}`}><img src={pdf} height="100px" width="100px" style={{cursor:'pointer'}} alt={file.name} /></Link>
          </>)
      }else{
        return (
        <>
        <Link to={`/imagefile/${file._id}`}><img src={file.file_path} alt={file.name} height="100px" width="200px" style={{cursor:'pointer'}} /></Link>
        </>)
      }
    }

    const downloadFile=()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/downloadfile/'+file._id,{responseType:'blob'})
        .then(res=>{
          return download(res.data,file.name,file.mimetype)
      }).catch(err=>{
          console.log('error from downloading')
      })
    }
   
    const d=()=>{
      <tr>
          <td>
            {fileDisplay()}
          </td>
          <td>
            <a href="#/" onClick={()=>downloadFile()}>download</a>
          </td>
          <td>
            <p>{file.name}</p>
          </td>
          <td>
            <p>{file.description}</p>
          </td>
          <td>
            <p>{file.uploadedBy.name}</p>
            <p>{file.date}</p>
            </td>
        </tr>
    }
    return (
        <>
        <TableRow>
        <TableCell component="th" scope="row" align="center">
          {fileDisplay()}
        </TableCell>
        <TableCell align="center"><a href="#/" onClick={()=>downloadFile()}>download</a></TableCell>
        <TableCell align="left">{file.name}</TableCell>
        <TableCell align="center">{file.description}</TableCell>
        <TableCell align="center" style={{color:'#039be5'}}><p>{file.uploadedBy.name}</p><p>{file.date}</p></TableCell>
      </TableRow>
        </>
    )
}
