import { useState } from "react";
import { useRecoilValue } from "recoil";
import { tranferToUserState } from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loaders";

export default function SendMoney() {

    const [amount, setAmount] = useState("");
    const toUser = useRecoilValue(tranferToUserState);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("myToken")}`
    };
    
    const body = {
        toUsername: toUser, 
        amount: Number(amount),
    }

    function handleTransaction(){
        setLoading(true);
        axios.post("http://localhost:3000/api/v1/account/transfer", body, {
            headers: headers
        })        
        .then(res => res.data)
        .then(data => {
            setLoading(false);
            alert(data.msg);
            navigate("/dashboard")
        })
    }

    return (
        <div className="flex justify-center h-screen items-center bg-gray-200">
            <div className="p-8 flex flex-col border shadow-lg md:w-2/5 max-w-96 bg-white rounded-3xl">
                <h2 className="text-bold mb-3 text-2xl md:text-3xl md:mb-5 m-auto drop-shadow-xl p-1">Send Money</h2>
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="border-black w-7 h-7 mr-2 border-2 rounded-full p-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <p className="text-lg md:text-xl text-bold">{toUser}</p>
                </div>
                <p className="text-xs font-medium mt-2 mb-2">Amount (in Rs)</p>
                <input required={true} value={amount} onChange={e => setAmount(e.target.value)} className="border border-inherit mb-3 p-2" type="number" placeholder="Enter Amount" />
                <button onClick={handleTransaction} className="bg-teal-500 rounded-md drop-shadow p-2 hover:bg-teal-600">Initiate Transfer</button>
            </div>
            {loading && <div className="absolute w-full h-full flex flex-col items-center justify-center bg-gray-200 opacity-75">
            <Loader></Loader>
            <p className="mt-2 font-medium">Processing transaction</p></div>}
        </div>
    )
}