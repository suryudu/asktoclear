import React from 'react'

export default function Faculty(props) {
    function handlePosition(e){
        props.set_position(e.target.value);
    }
    function handleDepartment(e){
        props.set_fDepartment(e.target.value)
    }

    return (
        <div>
            <div className="input">
                <p>Position</p>
                <select onChange={handlePosition}>
                    <option>select position</option>
                    <option>Mentor</option>
                    <option>Assistant Faculty</option>
                    <option>Assistant Professor</option>
                </select>
            </div>
            <div className="input">
                <p>Department</p>
                <select onChange={handleDepartment}>
                    <option>select department</option>
                    <option>PUC</option>
                    <option>CSE</option>
                    <option>Civil</option>
                    <option>Mechanical</option>
                    <option>MME</option>
                    <option>ECE</option>
                    <option>Chemical</option>
                </select>
            </div>
            <div className="signup_field">
                <label><span className="label-name">Specialization</span></label>
                <input type="text" required />
                
            </div> 
        </div>
    )
}
