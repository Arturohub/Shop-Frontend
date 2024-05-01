import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import axios from "axios"
import { UserContext } from "../context/UserContext"

axios.defaults.withCredentials = true; 

export default function Login(){
    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const { setUser } = useContext(UserContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data
        try {
            const { data } = await axios.post("http://localhost:4000/api/users/login", {
                email,
                password
            });
                setUser(data.user);
                setData({});
                navigate("/blog");
                toast.success("You succesfully logged in!", {                
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    return (
        <div className="container justify-center h-screen pr-4 pl-4">
            <h1 className="text-4xl my-8 underline text-gray-200 font-sigmar text-center">Log In</h1>
            <form onSubmit={loginUser} className='max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <div className="mb-4">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline hover:border-blue-600" 
                           id="email" 
                           type="email" 
                           name="email" 
                           value={data.email} 
                           onChange={handleChange} 
                           required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  hover:border-blue-600" 
                           id="password" 
                           type="password" 
                           name="password" 
                           value={data.password} 
                           onChange={handleChange} 
                           required />
                </div>
                <div className="flex flex-col justify-center border-b-4 pb-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                            type="submit">
                        Sign In
                    </button>
                </div>
                <div className="flex flex-col items-center justify-between">
                    
                    <p className="pt-4 pb-2 mt-4 font-bold">Don't have an account?</p>
                    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          to="/register">
                        Register here!
                    </Link>
                    <p className="pt-4 pb-2 mt-4 font-bold">Forgotten password?</p>
                    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          to="/forgotpassword">
                        Reset Password!
                    </Link>
                </div>
            </form>
        </div>
    );
};