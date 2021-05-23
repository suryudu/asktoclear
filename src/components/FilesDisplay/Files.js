import React,{useState,useEffect} from 'react';
import Header from "../HeaderFile/Header";
import FileCard from "../FilesDisplay/FileCard";
import axios from 'axios';
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


export default function Files(props) {
    const classes = useStyles();
    const [files,setFiles]=useState([]);
    const [message,setMessage]=useState('');

    useEffect(()=>{
        axios
        .get('http://localhost:3003/allfiles',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            if(res.data.message){
                setMessage(res.data.message);
            
            }else{
                setFiles(res.data);
            }
        })
    },[])
    

    const fileDisplay=()=>{
        
        if(!files.length){
            return <h2>{message}</h2>
        }else{
            return files.map((file,key)=>{
                return <FileCard file={file} key={key} />
               
            })
            
            
        }
    }


    return (
        <><div style={{backgroundColor:"#bbdefb",backgroundSize:'1000px'}}>
            <div style={{display:"flex"}}>
                <Header />
                <div className="files">
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="a dense table" style={{fontSize:'30px'}}>
                  <TableHead>
                    <TableRow style={{}}>
                      <TableCell align="center">File</TableCell>
                      <TableCell align="center" style={{width:'200px'}}></TableCell>
                      <TableCell align="left" style={{width:'100px'}}>name</TableCell>
                      <TableCell align="left" style={{width:'500px',textAlign:'center'}}>description</TableCell>
                      <TableCell align="left">uploader</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fileDisplay()}
                  </TableBody>
                </Table>
              </TableContainer>
                </div>
            </div>
        </div>
            
        </>
    )
}
