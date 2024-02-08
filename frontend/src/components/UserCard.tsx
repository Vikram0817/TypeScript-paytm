import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { tranferToUserState } from "../store";

interface props{
    username: string;
    fullName: string;
    id: number;
}

export default function UserCard({username, fullName, id}: props){

    const navigate = useNavigate();
    const setTransferToUser = useSetRecoilState(tranferToUserState)

    function handleClick() {
        navigate("/send")    
        setTransferToUser(username)
    }

    return (
        <div className="flex justify-between w-11/12 m-auto mt-5">
        <span className="flex items-center">
            <p className="bg-gray-200 rounded-full w-8 p-2 text-center text-sm">{username[0]}</p>
            <p className="text-bold text-md ml-4">{fullName}</p>
        </span>
        <button onClick={handleClick} className="bg-black text-white p-2 rounded-md text-sm hover:bg-teal-500">Send Money</button>
    </div>
    )
}