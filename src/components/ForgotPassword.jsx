import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const navigate = useNavigate()
   

    const forgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('https://shopbackend-ikrx.onrender.com/api/users/forgotpassword', {
                email,
            }, { withCredentials: true });

            toast.success("A password-recovery email has been sent successfully to your email adress", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setIsLoading(false);
            setButtonClicked(true);
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Forgotten Password</h2>
                {!buttonClicked && ( 
                    <form onSubmit={forgotPassword}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none hover:border-blue-600" required />
                        </div>
                        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Reset Email"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
