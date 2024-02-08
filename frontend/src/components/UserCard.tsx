export default function UserCard(){
    return (
        <div className="flex justify-between w-11/12 m-auto mt-5">
        <span className="flex items-center">
            <p className="bg-gray-200 rounded-full w-8 p-2 text-center text-sm">{username[0]}</p>
            <p className="text-bold text-md ml-4">{username}</p>
        </span>
        <button className="bg-black text-white p-2 rounded-md text-sm hover:bg-teal-500">Send Money</button>
    </div>
    )
}