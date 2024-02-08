import BottomNavigator from "../components/BottomNavigator";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";

export default function Signin(){
    return(
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-xl">
            <div className="text-center">
                <Heading pageHeading="Log-in" className="text-3xl text-bold mb-2"></Heading>
                <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your Credentials to access your account</p>
            </div>
                <Input className="border-2 p-1 mb-2 mt-1" label="Username"></Input>
                <Input className="border-2 p-1 mb-2 mt-1" label="Password"></Input>
                <Button className="border-black border-2 rounded-xl bg-black text-white mt-2 w-1/2 m-auto hover:bg-teal-400" label="Log-in"></Button>
                <BottomNavigator line="don't have an account?" page="/signup" className="underline hover:text-teal-400 cursor-pointer" label="Sign-up"></BottomNavigator>
            </div>
        </div>
    )
}