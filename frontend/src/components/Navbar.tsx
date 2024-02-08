
export default function Navbar() {
    return(
        <div className="flex items-center border-2px border-black h-20 justify-between shadow-md">
        <span>
            <h1 className="text-bold text-teal-500 inline text-2xl ml-4 mt-8 drop-shadow">Paytm</h1>
            <h1 className="inline text-bold text-2xl mt-8 drop-shadow">App</h1>
        </span>
        <span className="flex justify-center">
            <p  className="mr-2">Hello, {`${"Vikram"} ${"Chaudary"}`}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-7 mr-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        </span>
        </div>
    )
}