import React from 'react'

export default function Oldstudent(props) {
    

    return (
        
        <div>
            <div className="signup_field">
                <label><span className="label-name">Work Name</span></label>
                <input type="text" required onChange={e=>props.set_workname(e.target.value)} />
                
            </div>
            <div className="signup_field">
                <label><span className="label-name">Work Place</span></label>
                <input type="tetx" required onChange={e=>props.set_workplace(e.target.value)} />
                
            </div>
        </div>
        
    )
}
