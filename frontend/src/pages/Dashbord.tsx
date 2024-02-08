import FindUser from "../components/FindUser";
import MyBalance from "../components/MyBalance";
import Navbar from "../components/Navbar";

export default function Dashboard(){
    return (
        <>
            <Navbar></Navbar>
            <MyBalance></MyBalance>
            <FindUser></FindUser>
        </>
    )
}