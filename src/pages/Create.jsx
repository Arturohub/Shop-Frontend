import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Create() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
    const cloudinaryUrl = import.meta.env.VITE_CLOUDINARY_URL;
    try {
      setIsLoading(true);
      const response = await axios.post(cloudinaryUrl, formData, {
        withCredentials: false,
      });
      setImage(response.data.secure_url);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to upload image to Cloudinary:", error);
      setIsLoading(false);
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    if (name === "" || quantity === "" || price === "" || image === "") {
      toast.warn("Please, fill out all the input fields!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    try {
      setIsLoading(true);
      await axios.post("https://shopbackend-ikrx.onrender.com/api/products", {
        name: name,
        quantity: quantity,
        price: price,
        image: image,
      });
      toast.success("New product created and saved successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false);
      navigate("/shop");
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Create a Product
      </h2>
      <form onSubmit={createProduct}>
        <div className="space-y-2">
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Quantity"
            />
          </div>
          <div>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
              placeholder="Enter Price"
            />
          </div>
          <div>
            <label>Upload Image</label>
            <input
              type="file"
              onChange={uploadImg}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            />
            {isLoading && <p className="text-sm text-gray-500 mt-2">Uploading image...</p>}
            {image && <img src={image} alt="Uploaded" className="mt-2 max-w-full h-auto" />}
          </div>
          <div>
            {!isLoading && (
              <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                Save
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
