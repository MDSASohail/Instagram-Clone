import { useEffect, useState } from "react"
import { firestore } from "../../firebase";
import firebase from "firebase/compat/app";
import 'firebase/compat/database';
function Posts({user,postId,username,img,caption})
{
  useEffect(()=>{
    getID();
    // runb();
    return ()=>{
        getID();
        // runb();
    }
 })
  
      const [comments,setComments]=useState(null);
      let iddd=[];
      const [comment,setComment]=useState('');
      let com=[];
      const [hide,setHide]=useState(false);
    // console.log(user);
    
    //  console.log(iddd)
   

  
    
     
  
    
    

       function secoo()
       {
          //  Taking document id from the iddd via postid and getting data
          firestore
          .collection('posts')
          .doc(iddd[postId])
          .collection('comments').orderBy('timestapm','desc')
          .onSnapshot(
            (snapshot) => {
               
              setComments(snapshot.docs.map((doc) => doc.data()));
            },
            (error) => {
              console.error('Error fetching comments:', error);
              // Handle the error here (e.g., display an error message to the user)
            }
          );
        
        
        //  console.log(com);
        //  console.log(comments);
          
         
       }
       
         async function getID()
         {

            // Getting all the id of all posts
             const ids=await firestore.collection('posts').orderBy('timestamp','desc').get();
             ids.forEach((doc)=>{
                
                iddd.push(doc.id);
             })
            
             
             
           }
           
           function postcomment(event)
            {
               event.preventDefault();
                if(comment=='')
                 {
                    console.log("comment empty");
                    return;
                 }
               console.log(iddd[postId]);
               firestore
               .collection('posts')
               .doc(iddd[postId])
               .collection('comments').add({
                        text:comment,
                        username:user,
                        timestapm:firebase.firestore.FieldValue.serverTimestamp()
                    });
              console.log(comment);
              // console.log(user)
              //       console.log("Post comments");
                    setComment('')
            }
         
     
    return(
        <>
          <div className="border-2 mb-2  border-graw-200  mx-3 p-2 rounded-md bg-gray-100 h-">
             <div className=" font-bold text-center py-2 text-2xl " >{username}</div>
             <div className="rounded-md overflow-hidden "><img className="w-full  h-2/3" src={img} alt="" /></div>
             <div className="p-1 text-2xl" ><strong>Caption : </strong><span>{caption}</span></div>
             <div>
             <form action="">
                <div className="border-2 flex justify-between px-1">
                <div className="w-full"><input type="text"  className="text-lg bg-transparent outline-none p-1 w-full" placeholder="Comment here" value={comment} onChange={(e)=>setComment(e.target.value)} /></div>
                <p onClick={postcomment}  className="font-bold bg-gray-200 px-5 rounded-md hover:bg-gray-400 transition-color ml-3 py-2 cursor-pointer">Post</p>
                </div>
             </form>
             
              <p className="text-center rounded-lg font-bold cursor-pointer mt-3 px-2 py-1 bg-slate-400 " onClick={()=>{setHide(!hide);secoo()}}>{hide?"Hide":"See Comments"}</p>
             {hide?<div className="border-2">
             {
                 comments?comments.map((com)=>{
                  return (
                    <p>
                       <strong>{com.username } :</strong> <span>{com.text}</span>
                       
                    </p>
                  )
                }):""
                 
              }
             </div>:""}
            </div>
          </div>
          
          
        </>
    )
}


export default Posts