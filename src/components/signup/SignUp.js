import React,{useState} from 'react';
import Student from "./Student";
import Faculty from "./Faculty";
import OldStudent from "./OldStudent";
import Header from "../HeaderFile/Header";
import "./Signup.css";
import {Link,useHistory} from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Signup(props) {
    const history=useHistory();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [userType,setUserType]=useState('');
    const [password,setPassword]=useState('');
    const [collegeId,setCollegeId]=useState('');
    const [department,setDepartment]=useState('');
    const [aim,setAim]=useState('');
    const [position,setPosition]=useState('');
    const [specialization,setSpecialization]=useState('');
    const [workName,setWorkName]=useState('');
    const [workPlace,setWorkPlace]=useState('');
    const [file,setFile]=useState('');
    const [error,setError] = useState('');

    const [user,setUser]=useState(<h1>please select your category?</h1>);
         function handleChange(e) {
            let type=e.target.value;
            setUserType(type);
            if(type === "student")
            {
               setUser(<Student set_id={setCollegeId} set_sDepartment={setDepartment} set_aim={setAim} />);
            }
            else if(type === "faculty")
            {
                setUser(<Faculty set_position={setPosition} set_fDepartment={setDepartment} set_specialization={setSpecialization} />);
            }
            else if(type === "old_student")
            {
                setUser(<OldStudent set_workname={setWorkName} set_workplace={setWorkPlace} />);
            }
            
            
        }
        const handleSubmit=async (e)=>{
            e.preventDefault();
            const valid = validation();
            const formData=new FormData();
            
            if(valid){
                setError("");
                formData.append('name',name);
                formData.append('email',email);
                formData.append('user_type',userType);
                formData.append('file',file);
                // formData.append('username',userName);
                formData.append('password',password);
                if(userType === "student"){
                    formData.append('student_id',collegeId);
                    formData.append('student_department',department);
                    formData.append('student_aim',aim);
                }
                else if(userType === "faculty"){
                    formData.append('faculty_position',position);
                    formData.append('faculty_specialization',specialization);
                    formData.append('faculty_department',department);
                }
                else if(userType === "old_student"){
                    formData.append('oldstudent_workname',workName);
                    formData.append('oldstudent_workplace',workPlace);
                }
            //     for(let pair of formData.entries())
            // {
            //     console.log(pair[0] + "->" +pair[1]+"\n");
            // }

            ///
           

                await axios
                .post('https://asktoclearbackend.herokuapp.com/signup',formData)
                .then((res) => {
                    if(res.data.error){
                        toast.error(res.data.error);
                    }else if(res.data.message){
                        toast.success(res.data.message);
                        setTimeout(() => {
                          history.push('/signin');
                       }, 2000);
                     
                    }
                })
                
               
            }
            


            
        }

        const  validation=()=>{
           
                let valid = true;
                if(!name.match(/^[A-Za-z]+$/)){
                    valid = false;
                    setError('Name should contain only letters');
                    return valid;
                }
               
                //  else if(!userName.match(/^[A-za-z0-9_]+$/)){
                //     valid=false;
                //     setError('username should contain only numbers letters and underscore');
                //     return valid;
                //  }
                else if(!file){
                    valid=false;
                    setError('upload a photo');
                    return valid;
                }
                else if(!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/))
                {
                    valid = false;
                    setError('password should contain atleast one uppercase ,lowercase letter,one digit and special characet');
                    return valid;
                }
                return valid;

        }
        
       
    

    return (
        <div style={{display:"flex"}}>
            <Header />
            <div className="signup-form">
                <form>
                    
                    <h2>Sign Up</h2>
                    <div className="signup_field">
                        <label><span className="label-name">Email</span></label>
                        <input type="email" id="email" name="email" placeholder="r161579@rguktrkv.ac.in" required onChange={(e)=>setEmail(e.target.value)} />
                        
                    </div>
                    <div className="signup_field">
                        <label><span className="label-name">Name</span></label>
                        <input type="text" required onChange={(e)=>setName(e.target.value)} />
                        
                        
                    </div>
                    
                    
                    <div className="radio_buttons" onChange={handleChange} >
                        <input type="radio" id="student" name="user_type" value="student" />
                        <label htmlFor="student">Student</label>
                        <input type="radio" id="Faculty" name="user_type" value="faculty" />
                        <label htmlFor="Faculty">Faculty</label>
                        <input type="radio" id="old_student" name="user_type" value="old_student" />
                        <label htmlFor="old_student">Old Student</label>
                    </div> 
                    <div>
                    {user}
                    </div>
                    
                    
                    <div className="input-file" style={{bordeBottom:"none"}}>
                        <label>Upload Pic :</label>
                        <input type="file" onChange={e => setFile(e.target.files[0])} required />
                    </div>
                   
                    <div className="signup_field">
                        <label><span className="label-name">Password</span></label>
                        <input type="password" required onChange={(e)=>setPassword(e.target.value)} />
                        
                    </div>
                   <div className="signup_field">
                    <p>{error}</p>
                   </div>

                    <div className="input">
                        <button type='submit' onClick={handleSubmit}>Sign Up</button>
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
                    <div className="login">
                        <p>Already have an account?<Link to="/signin">Log In</Link></p>
                    </div>,
                    
                    
                
                </form>
            </div>
        </div>
       
    )
}
