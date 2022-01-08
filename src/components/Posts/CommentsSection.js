import React, { PureComponent, useState } from 'react'
import data from "./data.json"
import { CommentSection } from '../../../node_modules/react-comments-section'
// import 'react-comments/dist/index.css'
// import "./App.css"



 const CommentsSection = () => {
   const [comment, setComment] = useState(data)
   const userId = "01a"
   const avatarUrl = "https://ui-avatars.com/api/name=Riya&background=random"
   const name = "xyz"
   const signinUrl = "/signin"
   const signupUrl = "/signup"
   let count = 0
   comment.map(i => {count+=1; i.replies && i.replies.map(i=> count+=1)} )

   return <div className="commentSection">
 <div className="header">{count} Comments</div>

 <CommentSection currentUser={userId && { userId: userId, avatarUrl: avatarUrl, name: name }} commentsArray={comment}
 setComment={setComment} signinUrl={signinUrl} signupUrl={signupUrl}/>
     </div>
 }
 
 export default CommentsSection