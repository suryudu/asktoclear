import React from 'react';
import "./Comments.css";
import CommentCard from "./CommentCard";

export default function Comments(props) {
    

    return (
        <div className="comments">
                <h4>Comments - </h4>
                <CommentCard />
        </div>
        
    )
}
