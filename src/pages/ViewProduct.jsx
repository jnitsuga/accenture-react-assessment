import { useEffect } from "react"
import Axios from 'axios'
import { Link, useParams } from 'react-router-dom' 
import { useUserContext } from "../contexts/ContextProvider"

const ViewProduct = () => {
  const {product, setProduct, user, setUser} = useUserContext()
  const { productId } = useParams();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    Axios.get(`https://dummyjson.com/products/${productId}`).then((res) => {
      console.log(res.data)
      setProduct(res.data)
    })
  }, [productId, setProduct])

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    Axios.get(`https://dummyjson.com/users/${userId}`).then((res) => {
      setUser(res.data)
    })
  }, [setUser])

  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }

  return (
    <>
      <section>
        <div className="relative mx-auto max-w-screen-xl px-4 py-8">
          <div>
            <span>
              <span className='m-2'>Welcome, {user.firstName}</span>
              <span className='m-2'><Link to={`/carts/user/${userId}`}>My Cart</Link></span>
              <span className='m-2' onClick={logoutUser}>Logout</span>
            </span>
          </div>

          <div className="m-6">
            <a
              className="inline-flex items-center rounded border border-indigo-600 px-8 py-3 text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
              href="/products"
            >
              <span class="text-sm font-medium"> Back </span>
            </a>
          </div>

          <div className="grid gap-8 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-3">
              <div className="relative mt-4">
                <img
                  alt="Tee"
                  // src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  src={product.thumbnail}
                  className="h-72 w-full rounded-xl object-cover lg:h-[540px]"
                />

                <div
                  className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full bg-black/75 px-3 py-1.5 text-white"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>

                  <span className="ml-1.5 text-xs"> Hover to zoom </span>
                </div>
              </div>

              
            </div>

            <div className="lg:sticky lg:top-0">
              <form className="space-y-2 lg:pt-8">
                <h1 className="text-2xl font-bold lg:text-3xl">{product.title}</h1>

                <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                <p className="text-xs text-gray-500">Category: {product.category}</p>

                <div>
                  <s className="text-l font-bold mr-2 text-gray-500">${product.price}</s>
                  <span className="text-xl font-bold text-rose-500">${ Math.round(product.price * (100 - product.discountPercentage)) / 100 }</span>
                  <p className="text-l font-bold text-gray-700">Stocks Left: {product.stock}</p>
                  <p className="text-l font-bold text-gray-700">Rating: {product.rating}</p>
                </div>

                <div className="rounded border bg-gray-100 p-4"> 
                  <p className="text-sm">
                    <span className="block"> Pay as low as $3/mo with 0% APR. </span>

                    <a href="" className="mt-1 inline-block underline"> Find out more </a>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white"
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="w-full rounded border border-gray-300 bg-gray-100 px-6 py-3 text-sm font-bold uppercase tracking-wide"
                >
                  Notify when on sale
                </button>
                
              </form>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}


export default ViewProduct