import { useState } from "react"
import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { useNavigate } from "react-router-dom"
import { Buttton } from "../components/Button";
import axios from "axios"
import { BottomWarning } from "../components/ButtomWarning";



export const Signup =  () => {

    const[firstname,setfirstname]=useState("");
    const[lastname,setlastname]=useState("");
    const[password,setpassword]=useState("");
    const[username,setusername]=useState("");


    const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
        
                <div className="flex flex-col justify-center">
                     <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                        <Heading lebel={"Sign up"}></Heading>
                        <Subheading label={"Enter your infromation to create an account"} />

                        <InputBox onChange={e=>{
                            setfirstname(e.target.value);
                        }} placeholder={"AMAN"} label={"First Name"} />

                        <InputBox onChange={e=>{
                            setlastname(e.target.value);
                        }} placeholder={"kumar"} label={"Last Name"} />

                        <InputBox onChange={e=>{
                            setusername(e.target.value);
                        }} placeholder={"Username"} label={"Username"} />
                        
                        <InputBox onChange={e=>{
                            setpassword(e.target.value);
                        }} placeholder={"Password"} label={"Password"} />

                        <div className="pt-4">
                        <Buttton onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                                     username,
                                    firstname,
                                    lastname,
                                    password
                                        });
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("userid",response.data.user_id)
                        localStorage.setItem("username",firstname)
                         navigate("/Dashboard")
                            }} label={"Sign up"} />
                            
                        </div>
                        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />

                     </div>
                </div>
    </div>


}