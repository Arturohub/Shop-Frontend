import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { UserContext } from '../context/UserContext';

export default function Blog() {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useContext(UserContext)

    const getBlogs = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:4000/api/blog");
            setBlogs(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching blog entries:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getBlogs();
    }, []);

    const getTime = (createdAt) => {
        const createdDate = new Date(createdAt)
        const currentDate = new Date()
        const dateDifference = currentDate - createdDate
        const minutes = Math.floor(dateDifference / (1000 * 60));
        if (minutes < 60) {
            return `${minutes} minute/s ago`;
        } else {
            const hours = Math.floor(minutes / 60);
            if (hours < 24) {
                return `Posted ${hours} hour/s ago`;
            } else {
                const days = Math.floor(hours / 24);
                return `Posted ${days} day/s ago`;
            }
        }
    };

    return (
        <div>
            {user && user.email === 'arturochicavilla@hotmail.com' && (
                <div className="flex justify-end">
                    <Link to="/newpost" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                        Create a New Post
                    </Link>
                </div>
            )}
     
            <div className="container mx-auto px-4">
                <h1 className="text-4xl my-8 underline text-gray-200 font-sigmar text-center">Most Recent Post</h1>
                {blogs.length > 0 && (
                    <div key={blogs[blogs.length - 1]._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                       <Link to={`/blog/${blogs[blogs.length - 1]._id}`}><h2 className="text-3xl font-bold">{blogs[blogs.length - 1].title}</h2></Link>
                        <p className="text-gray-600 mt-2">#{blogs[blogs.length - 1].category}</p>
                        <p className="text-gray-600 mt-2 font-semibold leading-loose">{getTime(blogs[blogs.length - 1].createdAt)}</p>
                        <div className="text-gray-800 mt-4 text-justify leading-loose font-serif" dangerouslySetInnerHTML={{ __html: blogs[blogs.length - 1].post }}/>
                        <div className="flex justify-center">
                            {blogs[blogs.length - 1].image && <img src={blogs[blogs.length - 1].image} alt="Blog" className="mt-4 rounded-lg max-w-full h-auto lg:max-w-md " />}
                        </div>
                    </div>
                )}
                <h1 className="text-4xl my-8 underline text-gray-100 font-sigmar text-center">Older posts that might interest you</h1>
                {blogs.slice(0, -1).slice(-5).reverse().map(blog => (
                    <div key={blog._id} className="bg-white shadow-md rounded-lg p-3 pl-6 mb-4">
                        <h2 className="text-black font-extrabold text-xl hover:underline leading-loose">
                            <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
                        </h2>
                    </div>
                ))}
            </div>
        </div>
    );
}
