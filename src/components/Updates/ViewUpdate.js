import React from 'react';
import emoji from "../../emoji.jpg";
import "./ViewUpdate.css";
export default function ViewUpdate(props) {
    

    return (
        <>
            <div className="viewupdate">
                <div className="close">
                    #
                </div>
                <div style={{marginTop:"25px"}}>
                <div className="updatedby">
                    <p>Suridu</p>
                    <p className="update-time">jan,5,2021 2:00 PM</p>
                </div>
                <div className="updateposter">
                    <img src={emoji} alt='emoji' />
                </div>
                <div className="postercontent">
                    <div className="poster-info">
                        <h4>Festival Competition</h4>
                        <h4 className="poster-team">Cse team</h4>
                    </div>
                    <div className="poster-description">
                        <p>Explpore coding skills in you.Explpore coding skills in you.Explpore coding skills in you.Explpore coding skills in you.</p>
                    </div>
                </div>
                <div className="poster-contacts">
                    <p>Contact Us : 8247069453</p>
                </div>
                </div>
            </div>
        </>
    )
}
