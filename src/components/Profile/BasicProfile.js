import React from 'react';
import "./BasicProfile.css";

export default function BasicProfile(props) {
    
    const user=props.data;
    return (
        <div className="basic-profile">
            <div className="profile-pic">
                <img src={`https://asktoclearbackend.herokuapp.com/${user.file_path}`}  alt={user.name} />
            </div>
            <div className="basic-info">
                <table>
                    <tbody>
                        <tr>
                            <td className="label">Name</td>
                            <td>:</td>
                            <td className="value">{user.name}</td>
                        </tr>
                        <tr>
                            <td className="label">Email</td>
                            <td>:</td>
                            <td className="value"><p></p>{user.email}<p></p></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
