import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { firstNameState, lastNameState, passwordState, usernameState } from "../store";

export default function UserDropdown(){

    const setUserName = useSetRecoilState(usernameState);
    const setPassword = useSetRecoilState(passwordState);
    const setFirstName = useSetRecoilState(firstNameState);
    const setLastName = useSetRecoilState(lastNameState);
    

    const navigate = useNavigate();

    function handleDelete() {
        // make delete req first
        alert("Feature under construnction! 🏗️")
    }

    function handleInvite() {
      navigator.clipboard.writeText("https://type-script-paytm.vercel.app/");
      alert("Link for Paytm-Typescript copied to clipboard")
    }

    function handleSignout() {
      setUserName("");
      setPassword("");
      setFirstName("");
      setLastName("");
      localStorage.removeItem("myToken");
      navigate("/");
    }

    return(
        <div id="dropdownHover" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 cursor-pointer dark:bg-gray-700">
    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
      <li>
        <a onClick={() => navigate("/edit")} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Update Profile</a>
      </li>
      <li>
        <a onClick={handleDelete} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete Account</a>
      </li>
      <li>
        <a onClick={handleInvite} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Invite Friends</a>
      </li>
      <li>
        <a onClick={handleSignout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
      </li>
    </ul>
</div>
    )
}