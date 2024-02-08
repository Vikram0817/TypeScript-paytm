import BottomNavigator from "../components/BottomNavigator";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Input from "../components/Input";

export default function Signup(){
    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="w-3/5 max-w-96 rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-lg">
                <div className="text-center">
                <Heading className="font-bold text-3xl m-auto mb-4" pageHeading='Sign-up'/>
                <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your information to create an account</p>
                </div>
                <Input className="border-2 p-1 mb-2 mt-1" label="Username"></Input>
                <Input className="border-2 p-1 mb-2 mt-1" label="First Name"></Input>
                <Input className="border-2 p-1 mb-2 mt-1" label="Last Name"></Input>
                <Input className="border-2 p-1 mb-2 mt-1" label="Password"></Input>
                <Button className="border-black border-2 rounded-xl bg-black text-white w-1/2 m-auto mt-2 hover:bg-teal-400" label="Sign-up"></Button>
                <BottomNavigator line="Already have an account?" page="/signin" className="underline hover:text-teal-400 cursor-pointer" label="Sign-In"></BottomNavigator>
            </div>
        </div>
    )
}