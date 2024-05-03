import { useState, useEffect, useContext } from "react"
import axios from "axios"
import Product from "../components/product/Product"
import { Link } from "react-router-dom"
import { UserContext } from '../context/UserContext';

export default function Shop (){

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useContext(UserContext)

    const getProducts = async () => {
        setIsLoading(true)
        try{
            const response = await axios.get("http://localhost:4000/api/products")
            setProducts(response.data)
            setIsLoading(false)

        } catch (error){
            toast.error(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])


    return (
        <div>
            {user && user.email ==="arturochicavilla@hotmail.com" && (
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">
                    Create a Product
                </Link>
            </div>
            )}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                {isLoading ? (
                "Loading..."
                ) : products.length > 0 ? (
                <>
                    {products.map((product, index) =>{
                        return (
                            <Product key={index} product={product} getProducts={getProducts}/>
                        )
                    })}
                </>
                ) : (
                <div>There are no products.</div>
                )}
            </div>
        </div>
    )

}