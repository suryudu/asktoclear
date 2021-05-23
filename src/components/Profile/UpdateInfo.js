import React,{useState,useEffect} from 'react';
import "./UpdateInfo.css";
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UpdateInfo(props) {
    const history =useHistory();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [userType,setUserType]=useState('');
    const [collegeId,setCollegeId]=useState('');
    const [department,setDepartment]=useState('');
    const [aim,setAim]=useState('');
    const [position,setPosition]=useState('');
    const [specialization,setSpecialization]=useState('');
    const [workName,setWorkName]=useState('');
    const [workPlace,setWorkPlace]=useState('');
    useEffect(()=>{
        axios
        .get('http://localhost:3003/myprofile',{headers:{'Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
           
            setName(res.data.name);
            setEmail(res.data.email);
            setUserType(res.data.user_type);
            if(res.data.user_type==="student"){
                setCollegeId(res.data.student_id);
                setDepartment(res.data.student_department);
                setAim(res.data.student_aim);
            }else if(res.data.user_type==="faculty"){
                setPosition(res.data.faculty_position);
                setDepartment(res.data.faculty_department);
                setSpecialization(res.data.faculty_specialization);
            }else if(res.data.user_type === 'oldstudent'){
                setWorkName(res.data.oldstudent_workname);
                setWorkPlace(res.data.oldstudent_workplace);
            }
            
        }).catch(err=>{
            console.log('error fro getting')
        })
    },[])

    const submitInfo=(e)=>{
        e.preventDefault();
     const data={
            name,
            email,
            student_id:collegeId,
            student_department:department,
            student_aim:aim,
            faculty_position:position,
            faculty_department:department,
            faculty_specialization:specialization,
            oldstudent_workname:workName,
            oldstudent_workplace:workPlace
        }
        axios
        .patch('http://localhost:3003/updateprofileinfo',data,{headers:{'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('jwt')}})
        .then(res=>{
                if(res.data.error){
                    toast.error(res.data.error);
                }else{
                    toast.success(res.data.message);
                    setTimeout(()=>{
                        history.push('/profile')
                    },2000)
                    
                }
        })
    }

    const typo=()=>{
        if(userType === 'student'){
            return(
                <>
                <div className="userinfo">
                    <label>Collge Id :</label><br />
                    <input type="text" value={collegeId} onChange={(e)=>setCollegeId(e.target.value)} />
                </div>
                <div className="userinfo">
                    <label>Department :</label><br /><input type="text" value={department} /><br/>
                    <select onChange={(e)=>setDepartment(e.target.value)} style={{height:'30px'}}>
                    <option>change department</option>
                    <option value='PUC-1'>PUC-1</option>
                    <option value='PUC-2'>PUC-2</option>
                    <option value='CSE'>CSE</option>
                    <option value='Civil'>Civil</option>
                    <option value='Mechanical'>Mechanical</option>
                    <option value='MME'>MME</option>
                    <option value='ECE'>ECE</option>
                    <option value='Chemical'>Chemical</option>
                 </select>
                </div>
                <div className="userinfo">
                    <label>Aim :</label><br />
                    <input type="text" value={aim} onChange={(e)=>setAim(e.target.value)} />
                </div>
                </>
            )
        }
        else if(userType==='faculty'){
            return(
                <>
                <div className="userinfo">
                    <label>Position :</label><br />
                    <input type="text" value={position} onChange={(e)=>setPosition(e.target.value)} />
                </div>
                <div className="userinfo">
                    <label>Department :</label><br />
                    <input type="text" value={department} onChange={(e)=>setDepartment(e.target.value)} />
                </div>
                <div className="userinfo">
                    <label>Specialization :</label><br />
                    <input type="text" value={specialization} onChange={(e)=>setSpecialization(e.target.value)} />
                </div>
                </>
            )
        }else if(userType==='oldstudent'){
            return(
                <>
                <div className="userinfo">
                    <label>Work Name :</label><br />
                    <input type="text" value={workName} onChange={(e)=>setWorkName(e.target.value)} />
                </div>
                <div className="userinfo">
                    <label>Work Place :</label><br />
                    <input type="text" value={workPlace} onChange={(e)=>setWorkPlace(e.target.value)} />
                </div>
                </>
            )
        }
    }

    const navigateBack=(e)=>{
        e.preventDefault();
        history.goBack();
    }


    return (
        <>
            <div className="updateinfo">
                <h1>Edit Your Profile</h1>
                <form>
                <div className="userinfo">
                    <label>Name :</label><br />
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className="userinfo">
                    <label>Email :</label><br />
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}  />
                </div>
                {typo()}

                <div style={{textAlign:"center"}} className="submit-buttons">
                    <button onClick={navigateBack}>Go Back</button>
                    <button onClick={submitInfo}>Update</button>
                    <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                </div>
                </form>
            </div>
        </>
    )
}
