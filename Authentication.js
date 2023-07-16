import {  useState } from "react";
import Quote from "../Quotes";
import { authh } from "../../firebase";


function UserAuthentication()
{
      const [signup,setSignUp]=useState(false);
      const [signin,setSignIn]=useState(true);
      const [username,setUsername]=useState('');
      const [email,setemail]=useState('');
      // const [user,setuser]=useState(null);
      const [password,setPassword]=useState('');
      
      console.log("Inauthentication");


    

    //   For Sign In authentication
     function SignIn(event)
      {
          event.preventDefault();
          authh.signInWithEmailAndPassword(email,password).catch(()=>{alert("Incorrect Password")});
           
            // console.log(user);
           
            
      }
      

    //   For Sign Up Authentication and making a account with provide email and password

    function SignUp(event)
     {
         authh.createUserWithEmailAndPassword(email,password).then(authUser=>{
             event.target.value="";
             return authUser.user.updateProfile({displayName:username})
         }).catch((error)=>alert(error.message))
        
         // alert("Sorry. Currently this facility is unavailable. Kindly contact Sohail Ansari for username and password");
        
     }
    return(
    <>
     {/* Main div it has cover 100 vh */}
       <div id="main_div" className="w-full h-screen border-2  bg-slate-100">
                {/* Navbar */}
          <div id="navar" className=" flex justify-between align-middle px-3 mb-10 bg-gray-400 py-2 rounded-md">
            <div id="img" >
                  <h1 className="text-2xl font-bold">MDSA</h1>
            </div>
            <div id="login" className=" ">
                <button className="text-xl py-2 px-3 mx-2  rounded-lg hover:bg-black hover:text-white transition-colors" onClick={()=>{setSignUp(true);setSignIn(false)}}>Sign Up</button>
                <button className="text-xl py-2 px-3 mx-2  rounded-lg hover:bg-black hover:text-white transition-colors" onClick={()=>{setSignIn(true);setSignUp(false)}}>Sign In</button>
            </div>
          </div>
          {/*  */}
          <div id="quoteAndLogin" className="flex flex-col   lg:flex-row">
             
             <div id="SingUp" className="   md:w-full lg:w-1/2 lg:mt-20 ">
                {/* Sign Up or Create a new account */}
                
                

                   {/* Login or Sign In */}
                   {signin && <div>
                           <div className="px-10 m-7 mt-14 shadow-black ">
                           
                           <div className="mb-2"><input className="w-full text-xl p-2  outline-none rounded-md" type="email" placeholder="Enter email" onChange={(e)=>{setemail(e.target.value)}} /></div>
                           <div className="mb-2"><input type="password" placeholder="Enter password" name="" id="" className="w-full text-xl p-2  outline-none rounded-md" onChange={(e)=>{setPassword(e.target.value)}}/></div>
                           <h2 className=" text-center text-2xl font-bold hover:bg-slate-600 hover:text-white transition-colors p-2 bg-slate-300 rounded-2xl cursor-pointer" onClick={SignIn}>Sign In</h2>
                           </div>
                           
                    </div>}
                    {signup && <div>
                           <div className="px-10 m-7 mt-1  ">
                           <div className="mb-2"><input className="w-full text-xl p-2  outline-none rounded-md" type="text" placeholder="Enter name" required  onChange={(e)=>{setUsername(e.target.value)}}/></div> 
                           <div className="mb-2"><input className="w-full text-xl p-2  outline-none rounded-md" type="email" placeholder="Enter email" onChange={(e)=>{setemail(e.target.value)}}/></div>
                           <div className="mb-2"><input type="password" placeholder="Enter password" name="" id="" className="w-full text-xl p-2  outline-none rounded-md" onChange={(e)=>{setPassword(e.target.value)}} /></div>
                           <h2 className=" text-center text-2xl font-bold hover:bg-slate-600 hover:text-white transition-colors p-2 bg-slate-300 rounded-2xl cursor-pointer" onClick={SignUp}>Sign Up</h2>
                           </div>
                           
                    </div>}

             </div>
             <div id="quote" className="md:w-full lg:w-1/2">
                <Quote/>
             </div>
          </div>
       </div>
       
    </>
    )
}

export default UserAuthentication;