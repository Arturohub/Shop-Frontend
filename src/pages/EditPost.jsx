import { useState, useEffect } from "react"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 


export default function EditPost(){


    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { id } = useParams();
    
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
            console.error('Failed to upload image to Cloudinary:', error);
            setUploading(false);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
          try {
            const response = await axios.get(`https://shopbackend-ikrx.onrender.com/api/blog/${id}`);
            const postData = response.data;
            setTitle(postData.title);
            setPost(postData.post);
            setCategory(postData.category);
            setImage(postData.image);
          } catch (error) {
            console.error("Error fetching blog post:", error);
          }
        };
    
        fetchPost();
      }, [id]);
    
      const updatePost = async (e) => {
        e.preventDefault();
        if (title === "" || post === "" || category === "" || image === "") {
          toast.warn("Please fill out all the input fields!");
          return;
        }
        try {
          setIsLoading(true);
          await axios.put(`https://shopbackend-ikrx.onrender.com/api/blog/${id}`, {
            title: title,
            post: post,
            category: category,
            image: image,
          });
          toast.success("Blog post updated successfully");
          setIsLoading(false);
          navigate("/blog");
        } catch (error) {
          toast.error(error.message);
          setIsLoading(false);
        }
      };


    return (
        <div className="container mx-auto px-4">
        <h1 className="flex justify-center text-3xl font-semibold my-8">Update Post</h1>
        <form onSubmit={updatePost}>
            <div className="mb-4">
                <label htmlFor="title" className="block text-2xl underline italic font-medium text-gray-700 mb-2">Title</label>
                <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="category" className="block text-2xl underline italic font-medium text-gray-700 mb-2">Category</label>
                <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                        <input type="radio" name="category" value="Before/After" checked={category === "Before/After"} onChange={(e) => setCategory(e.target.value)} />
                        <span className="ml-2 text-base lg:text-xl font-bold">#Before/After</span>
                    </label>
                    <label className="inline-flex items-center">
                        <input type="radio" name="category" value="Special offers" checked={category === "Special offers"} onChange={(e) => setCategory(e.target.value)}  />
                        <span className="ml-2 text-base lg:text-xl font-bold">#Special Offers</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="category" value="Art" checked={category === "Art"} onChange={(e) => setCategory(e.target.value)} />
                            <span className="ml-2 text-base lg:text-xl font-bold">#Art</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="category" value="News" checked={category === "News"} onChange={(e) => setCategory(e.target.value)} />
                            <span className="ml-2 text-base lg:text-xl font-bold">#News</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" name="category" value="Friends" checked={category === "Friends"} onChange={(e) => setCategory(e.target.value)} />
                            <span className="ml-2 text-base lg:text-xl font-bold">#Friends</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="post" className="block text-2xl underline italic font-medium text-gray-700 mb-2">Post</label>
                    <ReactQuill
                        theme="snow"
                        value={post}
                        onChange={setPost}
                        className="mt-1 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-2xl underline italic font-medium text-gray-700 mb-2">Image</label>
                    <input type="file" id="image" name="image" onChange={uploadImg} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                    {uploading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
                    {image && <img src={image} alt="Uploaded" className="mt-2 max-w-full h-auto" />}
                </div>
                <button type="submit" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer" disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Post'}
                </button>
            </form>
        </div>
    );
    }