import React, { useState } from 'react'
import { storage } from '../../firebase';
import { firestore } from '../../firebase';
import firebase from 'firebase/compat/app';
export default function UploadImage2({username,setupload}) {

    const [img,setimg]=useState(" ");
    const [caption,setcaption]=useState('');
    let idd=1;
    function handlechange(e)
    {
        if(e.target.files[0])
         {
            setimg(e.target.files[0]);
         }
    }
    const upload = () => {
        const uploadTask = storage.ref(`images/${img.name}`).put(img);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Progress function
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // setProgress(progress/);
          },
          (err) => {
            // Error function
            console.log(err.message);
          },
          () => {
            // Completion function
            storage.ref("images").child(img.name).getDownloadURL().then((url) => {
                firestore
                  .collection("posts")
                  .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: caption,
                    img: url,
                    username: username,
                  })
                  .catch((err) => {
                    alert(err.message);
                  });

                  setcaption("");
                  setimg("");
                  setupload(false);
              });
          }
        );
      };
      
      

  return (
    <div className='absolute    w-screen h-screen flex justify-center items-center'>
        
        <div className='border-2 rounded-md bg-slate-300 border-slate-300'>
            <div className='m-2  '><input type="file" className="w-full text-xl p-2  outline-none rounded-md" onChange={handlechange}/></div>
            <div className='m-2 border-2 bg '><input type="text" placeholder='Enter caption' className="w-full text-xl p-2  outline-none rounded-md" onChange={(e)=>{setcaption(e.target.value)}}/></div>
            
            <div className='m-2'><button className=" text-center text-2xl font-bold hover:bg-slate-600 hover:text-white transition-colors p-2 bg-slate-300 rounded-2xl cursor-pointer w-full" onClick={upload}>Upload</button></div>
        </div>
        
    </div>

    
  )
}


