import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { UserContext } from "../context/UserContext";

export default function SinglePost(){

    
    const [blog, setBlog] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [postRecommendation, setPostRecommendation] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()

    const {user} = useContext(UserContext)

    const getBlogPost = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:4000/api/blog/${id}`);
            setBlog(response.data);
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response.data.message)
            setIsLoading(false);
        }
    };

    
    useEffect(() => {
        getBlogPost();
     }, []);

    const getRecommendations = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get("http://localhost:4000/api/blog");
            const filteredPosts = response.data.filter(post => post.category === blog.category);
            setPostRecommendation(filteredPosts);
            setIsLoading(false);
        } catch (error) {
            toast.error('Error fetching blog entries:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (blog.category) {
            getRecommendations();
        }
    }, [blog.category]);

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

    const updateBlog = () => {
        navigate(`/edit/${id}`);
    }

    const deleteBlog = async () => {
        const result = await Swal.fire({
            title: 'Delete blog post',
            text: 'Do you really want to delete this post?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it',
            confirmButtonColor: 'green',
            cancelButtonColor: 'red',
            iconColor: 'blue',
            background: 'gray'

        })
        if(result.isConfirmed){
            try{
                await axios.delete(`http://localhost:4000/api/blog/${id}`)
                toast.success("You succesfully deleted the post!")
                navigate("/blog")
            } catch(error) {
                toast.error(error.message)
            }
        }
    }


    return (
        <div>
            {user && user.email==="arturochicavilla@hotmail.com" && ( 
            <div className="flex justify-end mb-4">
                <Link to={`/editpost/${id}`} className="inline-block mt-4 mr-4 shadow-md bg-blue-700 text-white rounded px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"><FontAwesomeIcon onClick={updateBlog} icon={faEdit} /></Link>
                <button className="inline-block mt-4 shadow-md bg-red-700 text-white rounded px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"><FontAwesomeIcon onClick={deleteBlog} icon={faTrash} /></button>
            </div>
            )}
            <div className="container mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
                <h1 className="text-3xl font-bold">{blog.title}</h1>
                <p className="text-gray-600 mt-2">#{blog.category}</p>
                <p className="text-gray-600 mt-2 font-semibold leading-loose">{getTime(blog.createdAt)}</p>
                <p className="mt-4 mb-4 text-justify text-gray-800 leading-loose font-serif " dangerouslySetInnerHTML={{ __html: blog.post }}></p>
                <div className="flex justify-center">
                    <img src={blog.image} alt="Blog" className="mt-4 rounded-lg max-w-full h-auto lg:max-w-6xl lg:max-h-96 " />
                </div>
            </div>
         <div className="container mx-auto mt-8">
                <h2 className="text-4xl underline text-gray-100 font-sigmar text-center mt-14 mb-8">Similar Posts</h2>
                <ul className="">
                    {postRecommendation.map((blog) => (
                        <li key={blog._id} className="mb-4 bg-white shadow-md rounded-lg p-3 pl-6">
                            <Link to={`/blog/${blog._id}`} className="text-black font-extrabold text-xl hover:underline mt-8 leading-loose">{blog.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}