import React from 'react';

export default function Student(props) {
    function handleSelect(e){
        props.set_sDepartment(e.target.value);
    }
    

    return (
        <div>
            <div className="signup_field">
                <label><span className="label-name">College Id</span></label>
                <input type="text" required onChange={(e)=>props.set_id(e.target.value)} />
                
            </div>
                    
            <div className="input" >
                <p>Department</p>
                <select onChange={handleSelect}>
                    <option>select department</option>
                    <option>PUC-1</option>
                    <option>PUC-2</option>
                    <option>CSE</option>
                    <option>Civil</option>
                    <option>Mechanical</option>
                    <option>MME</option>
                    <option>ECE</option>
                    <option>Chemical</option>
                 </select>
            </div>
            <div className="signup_field">
                <label><span className="label-name">Aim(optional)</span></label>
                <input type="text" required onChange={(e)=>props.set_aim(e.target.value)} />
                
            </div>
        </div>
    )
}
