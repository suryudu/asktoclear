import React,{useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import download from 'downloadjs';
import pdf from "../../../pdf.png";
import {Link,useHistory} from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


export default function FileProfile(props) {
    const file=props.file;
    const post=file.file_path;
    const history=useHistory();
    const [message,setMessage]=useState('');


    

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
        <Link to={`/imagefile/${file._id}`}><img src={file.file_path} height="50px" width="100px" style={{cursor:'pointer'}} alt={file.name} /></Link>
        </>)
      }
    }

    const downloadFile=()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/downloadfile/'+file._id,{responseType:'blob'})
        .then(res=>{
            setMessage('');
          return download(res.data,file.name,file.mimetype)
      }).catch(err=>{
          setMessage('getting from error');
          toast.error(message);
      })
    }

    const handleDelete=()=>{
      confirmAlert({
        title: 'Confirm to submit',
        message: 'Do you want do delete?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {deleteFile()}
                
          },
          {
            label: 'No',
            onClick: () => {history.push('/profile')}
          }
        ]
      });
    }

    const deleteFile=()=>{
      axios
      .delete(`https://asktoclearbackend.herokuapp.com/deletefile/${file._id}`,{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
      .then(res=>{
          if(res.data.error){
              toast.error(res.data.error)
          }else{
              toast.success(res.data.message);
              setTimeout(()=>{
                  window.location.reload();
              },2000)
          }
          }).catch(err=>{
              console.log(err.message);
          })
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
        <TableCell align="center" style={{color:'#039be5'}}>{file.date}</TableCell>
        <TableCell align="center" style={{cursor:'pointer'}}><Link style={{color:'red'}} to={`/updatefile/${file._id}`}>Edit</Link></TableCell>
        <TableCell align="center" onClick={handleDelete} style={{cursor:'pointer',color:'red'}}>Delete</TableCell>
      </TableRow>
      <ToastContainer />

        </>
    )
}
