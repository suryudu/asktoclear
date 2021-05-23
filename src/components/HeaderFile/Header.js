import React,{useState,useEffect,useRef,useContext} from 'react';
import "./Header.css";
import logo from "../question.svg";
import {Link} from "react-router-dom";
import {UserContext} from "../../App";



export default function Header(props) {
    
    const [navbar,setNavbar]=useState(false);
    const [signed,setSigned]=useState();
    const [popupMenu,setPopupMenu]=useState(false);
    const ref=useRef();
    const {state,dispatch} =useContext(UserContext);

    
    useEffect(()=>{
        if(state){
            setSigned(true);
        }else{
            setSigned(false);
        }
        const popup=document.getElementById("mypopup");
        if(signed){
            const onBodyClick=(event)=>{
                if(ref.current && ref.current.contains(event.target)){

                    document.body.removeEventListener('click',onBodyClick);
                }
                setPopupMenu(true)
                popup.classList.remove("show")
                
                
            } 
               
        document.body.addEventListener('click',onBodyClick,{capture:true})
        return ()=>{
            document.body.removeEventListener('click',onBodyClick);
        }
        }
            
        
        
       
    },[signed,state,])
  
    const logout=()=>{
        localStorage.clear();
        window.location.href="/";
       
    }

    const clickProfile=()=>{
       let popup=document.getElementById("mypopup");
     
       setPopupMenu(!popupMenu);
       if(popupMenu){
           
            popup.classList.add("show");
       }else{
           popup.classList.remove("show");
       }
       
       
    }

    const changeBackground=()=>{
        if(window.scrollY>=10){
            setNavbar(true);
        }
        else{
            setNavbar(false);
        }
    }

    window.addEventListener("scroll",changeBackground);

    return (
        <nav className={navbar ? "navbar sticky" : "navbar"}>
            <div className="navbar-content">
                 <div className="navbar-logo">       
                     <Link className="logo" to="/"><img src={logo} alt="logo" className="header-image"></img><p>Ask To Clear</p></Link>
                 </div>
                <table className="menu">
                <tr>
                
                
                <td><Link className="menu-item" to="/questions">Q&A</Link></td> 
                
                {signed ? <td><Link className="menu-item" to="/sharedfiles">Files</Link></td> :''}
                {signed ? <td><Link className="menu-item" to="/eventsandupdates">Events</Link></td> :''}
                {signed ? <td><Link className="menu-item" to="/trytoanswer">Try to Answer</Link></td> : ''}
                
                <td>
                    {signed ? <div className="popup"><img src={`http://localhost:3003/${state.file_path}`} alt="imoji" className="avatar" ref={ref} onClick={clickProfile} />
                        <div className="popuptext" id="mypopup">
                            <p><Link to="/profile">view profile</Link></p>
                            <div className='divider'></div>
                            <p><Link to="/askyourquestion">ask Question</Link></p>
                            <div className='divider'></div>
                            <p><Link to="/sharefile">share files</Link></p>
                            <div className='divider'></div>
                            <p><Link to="/postevent">post update</Link></p>
                            <div className='divider'></div>
                            <p style={{cursor:'pointer'}} onClick={logout}>Log Out</p>
                        </div>
                    </div> :  <Link className="special-btn menu-item" to="/signin">LogIn</Link>}
                </td>
                </tr>
                    
                </table>
            </div>
            
            
        </nav>
    )
}


