import React,{useState,useEffect} from 'react';
import UpdateCard from "./UpdateCard";
import "./EventUpdates.css";
import Header from "../HeaderFile/Header";
import Grid from '@material-ui/core/Grid';
// import pic from '../../bg.jpeg';


// import ViewUpdate from "./ViewUpdate";
import axios from 'axios';



export default function EventUpdates(props) {
    // const [fullView,setFullView]=useState(false);
    

    const [events,setEvents]=useState([]);

    useEffect(()=>{
        axios
        .get('https://asktoclearbackend.herokuapp.com/allevents',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
            setEvents(res.data);
            console.log(res.data);
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const displayUpdates=()=>{
       
        if(!events.length){
            return <h1>loading....</h1>
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
