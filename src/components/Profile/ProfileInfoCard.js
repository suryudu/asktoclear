import React from 'react';
import "./ProfileInfoCard.css";

export default function ProfileInfoCard(props) {
    // console.log(props.data.user)
    // const {student_id,student_department,student_aim}=props.data.user;
    // const {faculty_position,faculty_department,faculty_specialization}=props.data.user;
    // const {oldstudent_workname,oldstudent_workplace}=props.data.user;
    const user=props.data;
    
    const typo=()=>{
        const a=user.user_type;
        if(a === "student"){
            return(
                <>
                <table>
                <tbody style={{display:"flex"}}>
                    
                    <tr>
                        <td>CollegeId</td>
                        <td>:</td>
                        <td className="value">{user.student_id}</td>
                    </tr>
                    
                    <tr className="info-2">
                        <td>Department</td>
                        <td>:</td>
                        <td className="value">{user.student_department}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table-2">
                <tbody>
                    <tr>
                        <td>Aim</td>
                        <td>:</td>
                        <td className="value">{user.student_aim}</td>
                    </tr>
                </tbody>
            </table>
                </>
            )
        }
        else if(a === "faculty"){
            return (
                <>
                <table>
                <tbody style={{display:"flex"}}>
                    
                    <tr>
                        <td>Position</td>
                        <td>:</td>
                        <td className="value">{user.faculty_position}</td>
                    </tr>
                    
                    <tr className="info-2">
                        <td>Department</td>
                        <td>:</td>
                        <td className="value">{user.faculty_department}</td>
                    </tr>
                </tbody>
            </table>
            <table className="table-2">
                <tbody>
                    <tr>
                        <td>Specialization</td>
                        <td>:</td>
                        <td className="value">{user.faculty_specialization}</td>
                    </tr>
                </tbody>
            </table>
                </>
            )
        }
        else if(a==="old_student"){
            return (
                <>
                <table>
                <tbody style={{display:"flex"}}>
                    
                    <tr>
                        <td>WorkName</td>
                        <td>:</td>
                        <td className="value">{user.oldstudent_workname}</td>
                    </tr>
                    
                    <tr className="info-2">
                        <td>WorkPlace</td>
                        <td>:</td>
                        <td className="value">{user.oldstudent_workplace}</td>
                    </tr>
                </tbody>
            </table>
                </>
            )
        }
    }

    return (
        <div className="profile-card">
            {typo()}
        </div>
    )
}
