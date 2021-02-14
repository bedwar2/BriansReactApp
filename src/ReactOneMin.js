import React, { useState} from "react";
import { LikeButton } from './like-button'

const sampleComments = [
    "This is a first comments",
    "This is a second Comment",
    "This is a third Comment",
    "This is a fourth Comment"
]

const ReactOneMinHeader = () => {

    return (
        <>
             <h2>Add React in One Minute</h2>
            <p>This page is an example of a simple like button.</p>
        </>
    );
}

export default function ReactOneMin()  {
    const [comments, setComments] = useState(sampleComments);

    const clearComments = () => {
        setComments([]);
    }

    return (
        <div className="container">
            <ReactOneMinHeader></ReactOneMinHeader>
            {
                comments.map((comment, idx) => <p key={idx}>{comment}<br /><LikeButton commentID={idx+1}></LikeButton> </p>)
            }
        </div>


    );
 
}
