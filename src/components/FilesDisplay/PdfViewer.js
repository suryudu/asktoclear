import React, { useState,useEffect } from 'react';
import { Document, Page,pdfjs } from 'react-pdf';
import axios from 'axios';
import {useParams,useHistory} from 'react-router-dom';
import download from 'downloadjs';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Files.css';

export default function PdfViewer(props) {
    const {id} =useParams();
    const history=useHistory();
    const [pdf,setPdf]=useState();
    const [message,setMessage]=useState()
    useEffect(()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/file/'+id)
        .then(res=>{
            setPdf(res.data[0])
        })
    },[id])

    pdfjs.GlobalWorkerOptions.workerSrc = 
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);


  const onDocumentLoadSuccess=({ numPages })=> {
    setNumPages(numPages);
    setPageNumber(1);
  }
  const changePage=(offset)=> {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  const previousPage=()=> {
    changePage(-1);
  }
  
    const nextPage=()=> {
    changePage(1);
  }
  const downloadFile=()=>{
    axios
    .get('https://asktoclearbackend.herokuapp.com/downloadfile/'+pdf._id,{responseType:'blob'})
    .then(res=>{
        setMessage('');
      return download(res.data,pdf.name,pdf.mimetype)
  }).catch(err=>{
      setMessage('getting from error');
      toast.error(message)
  })
}

const navigateBack=(e)=>{
    e.preventDefault();
    history.goBack();
}


const pdfdisplay=()=>{
    if(!pdf){
        return <h1>no pdf</h1>
    }else{
        return (
          <>
            <div className="pdf-table">
              <table>
                <tbody>
                <tr style={{marginLeft:'100px'}}>
                  <td style={{textAlign:'right'}}>
                  
                  <div className="pdf-buttons">
                  
                  <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                    className="Pre"
                    style={{backgroundColor:'white',color:'black'}}
                  >
                    Previous
                  </button>
                 
                  </div>
                  
                  </td>
                  <td style={{textAlign:'center'}}>
                  <div className='pdf-buttons'>
                  <button onClick={navigateBack}>Go back</button>
                  <a href="#/" onClick={()=>downloadFile()}><button>download</button></a>
                  </div>
                  </td>
                  <td>
                  <div className="pdf-buttons">
                 
                  <button
                    type="button"
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                    style={{backgroundColor:'white',color:'black'}}
                     
                  >
                    Next
                  </button>
                  
                  </div>
                  
                  </td>
                </tr>
                <tr>
                    <td colSpan='3' style={{textAlign:'center'}}>
                    <div className="pagenumber">
          Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </div>
                    </td>
                  </tr>
                  <tr>
                    
                    <td colSpan='3' align='left'>
                    <Document
                    file={`https://asktoclearbackend.herokuapp.com/${pdf.file_path}`}
                    onLoadSuccess={onDocumentLoadSuccess} >
                    <Page pageNumber={pageNumber} />
                    </Document>
                    </td>
                      
        
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </>
    )
    }
}

  return (
    <>
    {pdfdisplay()}
    </>
  )

  }

