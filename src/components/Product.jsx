import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { UserContext } from '../context/UserContext';
import { useContext } from "react"

export default function Product( {product, getProducts } ) {

    const {user} = useContext(UserContext)

    const deleteProduct = async (id) => {
        const result = await Swal.fire({
            title: 'Delete product',
            text: 'Do you really want to delete this product?',
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
                await axios.delete(`http://localhost:4000/api/products/${id}`)
                toast.success("You succesfully deleted the product!", {                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            })
                getProducts()
            } catch(error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                })
            }
        }
        

    }


    return (
        <div className="bg-white rounded shadow-lg overflow-hidden">
            <img src={product.image} className="w-full h-58 object-cover" />
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold font-space-grotesk">{product.name}</h2>
                <div className="text-sm font-space-grotesk mt-2 mb-2">Units available: {product.quantity}</div>
                <div className="text-sm font-space-grotesk">Price/unit: {product.price}€</div>
            </div>
            {user && user.email === 'arturochicavilla@hotmail.com' && (
                <div className="mt-2 flex gap-4">
                    <Link to={`/edit/${product._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white round-sm px-4 py-1 font-bold hover:bg-gray-500 hover:cursor-pointer">Edit</Link>
                    <button onClick={()=> deleteProduct(product._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white round-sm px-4 py-1 font-bold hover:bg-red-500 hover:cursor-pointer">Delete</button>
                </div>
             )}
        </div>
    )
}