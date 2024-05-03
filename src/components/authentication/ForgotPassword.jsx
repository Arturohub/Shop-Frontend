import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
   

    const forgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:4000/api/users/forgotpassword', {
                email,
            }, { withCredentials: true });
            toast.success(response.data.message);
            setIsLoading(false);
            navigate("/login")
        } catch (error) {
            toast.error(error.response.data.message);

            setIsLoading(false);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Forgotten Password</h2>
                    <form onSubmit={forgotPassword}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Email</label>
                            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none hover:border-blue-600" required />
                        </div>
                        {!isLoading && (<button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-600">
                            {isLoading ? "Sending..." : "Send Reset Email"}
                        </button>
                        )}
                    </form>
            </div>
        </div>
    )
}
