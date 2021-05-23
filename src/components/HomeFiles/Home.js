import React from 'react';
import "./Home.css";
import Header from "../HeaderFile/Header";
import bg from "../../hh.png";
import {useHistory} from 'react-router-dom';

export default function Home(props) {    
    const history=useHistory();
   
    return (
        <>
        <div className="home" style={{'backgroundColor':'#2699fb'}}>
        <Header />
     
        
           <div className='hero-container'>
            <div className="content" style={{width:"50%"}}>
                <h1>Share Your Questions and Answers</h1>
                <p>Get answers by searching and asking yours, share your answers and files to help others</p>
                <div className="home-buttons">
                    <button className='button-style' style={{'marginLeft':'0px'}}>
                    <i class="fa fa-search" aria-hidden="true"></i><span style={{'paddingLeft':'7px'}}>Search</span>
                    </button>
                   <button className="button-style MuiButton-colorSecondary" onClick={()=>history.push('/askyourquestion')}>
                       Ask
                    </button>
                    <button className="button-style" onClick={()=>history.push('/sharefile')}>
                        Share
                    </button>     
                </div>
            </div>
            <div style={{width:"50%"}}>
                <img src={bg} alt='background pic' />
            </div>
        </div>
            
        </div>
           
        </>
    )
}
