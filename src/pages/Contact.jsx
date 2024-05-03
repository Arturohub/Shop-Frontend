import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Contact() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const sendMessage = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if ( !message || !name || !email) {
            toast.error("Name, Email, or Message are still empty. Please, fill them all and click Submit again.");
            return;
        }

        try {
            await axios.post("https://shopbackend-ikrx.onrender.com/api/contact/send", {name: name, email: email, message: message }, { withCredentials: true });
            toast.success("Message sent. Thanks for contacting us!");
            setIsLoading(false);
            navigate("/shop");
        } catch (error) {
            toast.error("Failed to send message! Please, try again!");
            setIsLoading(false);
        }
    };

    return (
        <div className="container justify-center h-screen pr-4 pl-4">
            <h1 className="flex justify-center text-4xl my-10 mt-10 underline text-gray-100 font-sigmar text-center">CONTACT US</h1>
            <form onSubmit={sendMessage} className="max-w-lg mx-auto p-8 bg-white shadow-md rounded">
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 font-extrabold underline text-lg tracking-wider">Name:</label>
                    <input type="text" name="name" value={name} onChange={(e)=> setName(e.target.value)} className="w-full px-3 py-2 shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block mb-2 font-extrabold underline text-lg tracking-wider">Email:</label>
                    <input type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} className="w-full px-3 py-2 shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>

                <div className="mb-6">
                    <label htmlFor="message" className="block mb-2 font-extrabold underline text-lg tracking-wider">Message:</label>
                    <textarea name="message" value={message} onChange={(e)=> setMessage(e.target.value)} rows="6" className="w-full px-3 py-2  shadow appearance-none border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" required />
                </div>
                {!isLoading && (<button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-4" disabled={isLoading}>{isLoading ? 'Sending...' : 'Submit'}</button>)}
            </form>
        </div>
    );
}
