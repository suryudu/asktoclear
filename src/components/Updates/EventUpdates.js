import React,{useState,useEffect} from 'react';
import UpdateCard from "./UpdateCard";
import "./EventUpdates.css";
import Header from "../HeaderFile/Header";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import pic from '../../bg.jpeg';

import UpdateSearch from "./UpdateSearch";
// import ViewUpdate from "./ViewUpdate";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function EventUpdates(props) {
    // const [fullView,setFullView]=useState(false);
    const classes = useStyles();

    const [events,setEvents]=useState([]);

    useEffect(()=>{
        axios
        .get('http://localhost:3003/allevents',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setEvents(res.data);
        })
    },[])

    const displayUpdates=()=>{
       
        if(!events.length){
            return <h1>no events</h1>
        }else{
            return events.map((event,key)=>{
                return <UpdateCard event ={event} key={key} />
            })
        }
    }

   
    //   const helllo={backgroundImage: `url(${pic})`,backgroundRepeat: 'no-repeat',backgroundAttachment: 'fixed',backgroundPosition: 'center',backgroundSize: 'cover'}
    return (
        <>
        <div style={{display:"flex",backgroundColor:"#bbdefb"}} >
            <Header />
            <div className="eventupdate">
            
            <Grid container spacing={3} >
                   {displayUpdates()}
                   
            </Grid>
                
            </div>
        
            
        </div>
        
          </>  
            
    )
}
