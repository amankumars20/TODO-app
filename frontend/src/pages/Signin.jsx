import { Heading } from "../components/Heading"
import { Buttton } from "../components/Button"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { BottomWarning } from "../components/ButtomWarning"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signin = () => {

  const [username,setusername]=useState("")
  const [password,setpassword]=useState("")
  const [userid,setuserid]=useState("")
  
  const navigate = useNavigate()

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <Subheading label={"Enter your credentials to access your account"} />
        <InputBox onChange={e=>{
                            setusername(e.target.value);
                        }} placeholder={"aman@gmail.com"} label={"User Name"} />

                        <InputBox onChange={e=>{
                            setpassword(e.target.value);
                        }} placeholder={"password"} label={"Password"} />

        <div className="pt-4">
         
        <Buttton onClick={async () => {
                        const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                     username,
                                    password
                                        });
                        localStorage.setItem("token", response.data.token)
                        localStorage.setItem("userid",response.data.user_id)
                        localStorage.setItem("username",username)
                        const user_id=localStorage.getItem("userid")
                        // const firstname = await axios.get("http://localhost:3000/api/v1/user/getfname",
                        // {
                        //  user_id
                        // },{
                        //   headers: {
                        //     'Authorization': 'Bearer ' + localStorage.getItem("token")
                        //   }
                        // })
                        // localStorage.setItem("username",firstname)
                         navigate("/Dashboard")
                            }} label={"Sign in"} />
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}