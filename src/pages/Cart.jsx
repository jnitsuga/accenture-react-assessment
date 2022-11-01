import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'

const Cart = () => {
  const {user, setUser} = useUserContext();
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    Axios.get(`https://dummyjson.com/users/${userId}`).then((res) => {
      setUser(res.data)
    })
  }, [setUser])

  useEffect(() => {
    Axios.get('https://dummyjson.com/products').then((res) => {
      console.log(res.data.products)
      setProductsList(res.data.products)
    })
  }, [setProductsList])
  

  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }

  return (
    <>
      <div className='mb-12'>
        <span>
          <span className='m-2'>Welcome, {user.firstName}</span>
          <span className='m-2'><Link to="/cart">My Cart</Link></span>
          <span className='m-2' onClick={logoutUser}>Logout</span>
        </span>
      </div>

      <div className='m-4'>
        {/* <label htmlFor="product-search" className="block text-xs font-medium text-gray-700">
          Search
        </label> */}

        <input
          type="text"
          id="product-search"
          placeholder="Search"
          className="mt-1 w-1/2 rounded-md h-5 border-gray-200 shadow-sm sm:text-sm"
        />
      </div>

      <div className='m-4'>
        <table className='table-fixed w-full bg-slate-800 drop-shadow-xl'>
          <thead className='bg-slate-600 text-gray-100'>
            <tr>
              <th className='w-1/8 px-4 py-2'>#</th>
              <th className='w-1/2 px-4 py-2'>Product</th>
              <th className='w-1/8 px-4 py-2'>Stock</th>
              <th className='w-1/8 px-4 py-2'>Rating</th>
              <th className='w-1/8 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
          {productsList.map((product, key) => {
            return (
              <tr key={key} className='text-center text-gray-300'>
                <td className='px-4 py-2'>{product.id}</td>
                <td className='px-4 py-2'>{product.title}</td>
                <td className='px-4 py-2'>{product.stock}</td>
                <td className='px-4 py-2'>{product.rating}</td>
                <td className='px-4 py-2 space-x-6'>
                    <span className='text-xs space-x-4'>
                      <Link to={`/viewproduct/${product.id}`}>
                        <button>View</button>
                      </Link>
                      <Link to={`/edit/${product.id}`}>
                        <button>Edit</button>
                      </Link>
                      <Link to={`/delete/${product.id}`}>
                        <button>Delete</button>
                      </Link>
                    </span>

                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Cart