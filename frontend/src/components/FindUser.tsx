import axios from "axios"
import { useEffect, useState } from "react"
import UserCard from "./UserCard";
import Loader from "./Loaders";


function useDebounce(value: string, delay: number) {
    
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function FindUser(){
   
    interface User {
        id: number;
        username: string;
        firstName: string;
        lastName: string;
    }

    const [filter, setFilter] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const debounceFilter = useDebounce(filter, 200);

    const [isLoading, setIsLoading] = useState(true);
    const [userNotFound, setUserNotFound] = useState(false);

    useEffect(() => {
        const loaderTimeout = setTimeout(() => {
            setIsLoading(false); 
            setUserNotFound(true);
        }, 20000); 

        return () => {
            clearTimeout(loaderTimeout);
        };
        
    }, [debounceFilter]);

    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem("myToken")}`
    };

    useEffect(() => {
        setIsLoading(true);

        axios.get(`http://localhost:3000/api/v1/user/?filter=${filter}`,{
        headers: headers
        })
        .then(res => res.data)
        .then(data => {
            if(data){
                setUsers(data);
                
            }else {
                setUsers([]);
            }
            setIsLoading(false);
            setUserNotFound(false);
        })
        .catch(err => {
            console.log(`Error fetching data: ${err}`)
            setUsers([]);
            setUserNotFound(true);
            setIsLoading(false);
        }
        )
    }, [debounceFilter])

    return(
        <div className="flex flex-col items-center">
            <h3 className="text-bold text-xl m-6 self-start">Users -</h3>
            <form className="w-11/12 m-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input value={filter} onChange={e => setFilter(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Find Users..." required />
                    
                    <button type="button" className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-teal-500 rounded-3xl text-sm px-4 py-2 dark:bg-teal-500 dark:hover:bg-teal-700 dark:focus:ring-teal-700">Search</button>
                </div>
            </form>
            {!isLoading ? users.map((user, idx) => <UserCard key={idx} fullName={`${user.firstName} ${user.lastName}`} username={user.username}/>)
            : <div className="mt-4"><Loader /></div> }
            {userNotFound && <p className="mt-4">No such user exist</p>}
        </div>
    )
}