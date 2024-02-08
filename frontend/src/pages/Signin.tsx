import { useRecoilState } from "recoil";
import BottomNavigator from "../components/BottomNavigator";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";
import { passwordState, usernameState } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin(){

    const [username, setUsername] = useRecoilState(usernameState);
    const [password, setPassword] = useRecoilState(passwordState);

    const navigate = useNavigate();

    async function handleSubmit(){
        const res = await axios.post("http://localhost:3000/api/v1/user/signin", {username,  password})
        const data = res.data;

        if(data.token){
            alert(`${data.msg}`);
            localStorage.setItem("myToken", data.token)
            navigate("/dashboard");
        }else{
            alert(data.msg);
        }
    }

    return(
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-xl">
            <div className="text-center">
                <Heading pageHeading="Log-in" className="text-3xl text-bold mb-2"></Heading>
                <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your Credentials to access your account</p>
            </div>

                <Input value={username} onChange={e => setUsername(e.target.value)}className="border-2 p-1 mb-2 mt-1" label="Username"></Input>
                <Input value={password} onChange={e => setPassword(e.target.value)}className="border-2 p-1 mb-2 mt-1" label="Password"></Input>
                
                <Button className="border-black border-2 rounded-xl bg-black text-white mt-2 w-1/2 m-auto hover:bg-teal-400" label="Log-in" onClick={handleSubmit}></Button>
                <BottomNavigator line="don't have an account?" page="/signup" className="underline hover:text-teal-400 cursor-pointer" label="Sign-up"></BottomNavigator>
            </div>
        </div>
    )
}