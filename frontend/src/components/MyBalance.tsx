import { useRecoilState } from "recoil"
import { balanceState } from "../store"
import { useEffect } from "react";
import axios from "axios";

export default function MyBalance(){

    const [balance, setBalance] = useRecoilState(balanceState);

    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("myToken")}`
    };

    useEffect(() => {
        axios.get("https://type-script-paytm.vercel.app/api/v1/account/balance", {
            headers: headers
        })
        .then(res => res.data)
        .then(data => {
            if(data.status > 200){
                alert(data.msg)
            }else{
                setBalance(data.msg.balance);
            }
        })
    }, [])

    return(
        <>
            <h1 className="text-bold text-xl m-5">Your Balance: {balance}</h1>
            <hr />
        </>
    )
}