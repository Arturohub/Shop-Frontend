import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


export default function NewPost(){
    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const uploadImg = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
        try {
            setUploading(true)
            const response = await axios.post(cloudinaryUrl, formData, { withCredentials: false });
            setImage(response.data.secure_url)
            setUploading(false);
        } catch (error) {
            toast.error('Failed to upload image to Cloudinary:', error);
            setUploading(false);
        }
    };

    const createPost = async(e) => {
        e.preventDefault();
        setIsLoading(true);

        if(title === "" || post === "" || category === "" || image === ""){
            toast.warn("Please, fill out all the input fields!")
            return
        }

        try{
  
            const response = await axios.post("https://shopbackend-ikrx.onrender.com/api/blog", {title: title, post: post, category: category, image: image})
            toast.success(response.data.message)
            setIsLoading(false)
            navigate("/blog")

        } catch (error){
            toast.error(error.response.data.message)
            setIsLoading(false)
        }
    }
    return (
        <div className="container justify-center h-screen pr-4 pl-4">
        <h1 className="text-4xl my-8 underline text-gray-200 font-sigmar text-center">Create a New Post</h1>
        <form onSubmit={createPost} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Category</label>
                <div className="flex space-x-4">
                    <label className="block md:inline-flex items-center">
                        <input type="radio" name="category" value="Before/After" checked={category === "Before/After"} onChange={(e) => setCategory(e.target.value)} />
                        <span className="text-sm lg:text-xl md:ml-2  font-bold">#Before/After</span>
                    </label>
                    <label className="block md:inline-flex items-center">
                        <input type="radio" name="category" value="Special offers" checked={category === "Special offers"} onChange={(e) => setCategory(e.target.value)}  />
                        <span className="text-sm lg:text-xl md:ml-2  font-bold">#Special Offers</span>
                    </label>
                    <label className="block md:inline-flex items-center">
                        <input type="radio" name="category" value="Art" checked={category === "Art"} onChange={(e) => setCategory(e.target.value)} />
                        <span className="text-sm lg:text-xl md:ml-2  font-bold">#Art</span>
                    </label>
                    <label className="block md:inline-flex items-center">
                        <input type="radio" name="category" value="News" checked={category === "News"} onChange={(e) => setCategory(e.target.value)} />
                        <span className="text-sm lg:text-xl md:ml-2  font-bold">#News</span>
                    </label>
                    <label className="block md:inline-flex items-center">
                        <input type="radio" name="category" value="Friends" checked={category === "Friends"} onChange={(e) => setCategory(e.target.value)} />
                        <span className="text-sm lg:text-xl md:ml-2  font-bold">#Friends</span>
                    </label>
                </div>
            </div>
            <div className="mb-4">
                <label htmlFor="post" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Post</label>
                <ReactQuill
                    theme="snow"
                    value={post}
                    onChange={setPost}
                    className="mt-1 border border-gray-300 rounded-md"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 font-extrabold underline text-lg tracking-wider mb-2">Image</label>
                <input type="file" id="image" name="image" onChange={uploadImg} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
                {image && <img src={image} alt="Uploaded" className="mt-2 lg:max-w-full lg:max-h-40" />}
            </div>
            {!isLoading && (<button type="submit" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer" >
                {isLoading ? 'Creating...' : 'Create Post'}
            </button>
            )}
        </form>
    </div>
);
}