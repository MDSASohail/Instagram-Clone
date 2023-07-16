
import UserAuthentication from "./Authentication";
import { useState,useEffect, useContext } from "react";

import { authh } from "../../firebase";
import Posts from "./Posts";

import UploadImage2 from './UploadImage2'

import { createContext } from "react";

// import { firestore } from "./firebase";
import { firestore } from "../../firebase";

const glo=createContext();

function Instagram()
{
   const [user,setuser]=useState(null);
   const [p,setposts]=useState([]);
   const [upload,setupload]=useState(false);
   const data={
          posts:p,
          upload:upload,
          setupload:setupload,
          username:user
   }
      console.log("in App");
   // fatching data from firevase
   useEffect(()=>{
      firestore.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setposts(snapshot.docs.map(doc=>doc.data()))
        
      })
      
},[]);

   //   UseEffect will check is there any change in the user or the username
   useEffect(()=>{
      const unsubscribe= authh.onAuthStateChanged((authUser)=>{
          if(authUser)
           {
              setuser(authUser);  //User log i
            //   console.log(user.multiFactor.user.displayName);
                  
           }
           else
            {
              setuser(null); //User log out
              
            }
       })

       return ()=>{
         //perform the cleanup action
         unsubscribe();
      }
 },[user]);
   return(
    <>
      {/* <button onClick={()=>{authh.signOut()}}>Log off</button> */}
       
       <glo.Provider value={data} >
            {user?<Loginfunction user={user.multiFactor.user.displayName}/>:<UserAuthentication/>}
            
       </glo.Provider>
       
       
       
      
    </>
   )
}



function Loginfunction({user})
{
    const po=useContext(glo);
    
     return(
      <>
       {/* This is for upload image */}
       {po.upload&&<UploadImage2 username={po.username.multiFactor.user.displayName} setupload={po.setupload}/>}
       {po.upload && <div onClick={()=>{po.setupload(false)}} className='absolute top-14 right-10 bg-black px-5 py-2 rounded-md cursor-pointer text-white'>X</div>}
       <div className="mb-10 bg-gray-400 flex justify-between flex-wrap items-center  px-5 py-1">
            <div id="img" >
                  <h1 className="text-2xl font-bold">MDSA</h1>
            </div>
          <p className="font-bold text-lg"> Welcome {user}</p>
          <div className="  flex items-center px-2">
            <h2 className="font-bold text-xl hover:bg-gray-700 hover:text-white rounded-md transition-colors px-3 py-2 ml-3 cursor-pointer" onClick={()=>{po.setupload(!po.upload)}}>Upload</h2>
            <button onClick={()=>{authh.signOut()}} className="font-bold text-xl hover:bg-gray-700 hover:text-white rounded-md transition-colors px-3 py-2 ml-3">Log out</button>
          
          </div>
       </div>
       {/* <ul className="mx-auto   sm:w-2/3 md:w-1/2 lg:w-1/3">{po.posts.map((item,id)=>{
          return <Posts key={id+1} postId={id+1} username={item.username} img={item.img} caption={item.caption}/>
       })}</ul> */}
       { 
          po.posts.map((item,id)=>
           <Posts key={id} user={user} postId={id} username={item.username} img={item.img} caption={item.caption}/>
           )
       }
      </>
     )
}
export default Instagram;