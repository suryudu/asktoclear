import React from 'react';
import CommentReply from "./CommentReply";

export default function CommentCard(props) {
    

    return (
        <>
        <div className="comment">
            <div>
                <h5>#suridu</h5>
            </div>
            <div className="comment-message">
                <p><span>- </span><span> Hi,there whats app</span></p>
            </div>
            <div className="comment-reply">
                <h5 style={{color:"black"}}>Replies</h5>
                <CommentReply />
            </div>
        </div>
        <div className="comment">
            <div>
                <h5>#suridu</h5>
            </div>
            <div className="comment-message">
                <p><span>- </span><span> Hi,there whats app</span></p>
            </div>
           </div>
        </>
        
    )
}
