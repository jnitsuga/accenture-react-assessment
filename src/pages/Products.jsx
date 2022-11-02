import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'
// import { FaCartPlus, FaSearch } from 'react-icons/fa'

import CategoryTabsAndSearch from '../components/CategoryTabsAndSearch'

const Products = () => {
  const { user, setUser } = useUserContext();
  const { productsList, setProductsList } = useUserContext([]);
  const { searchTerm } = useUserContext('')

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    Axios.get(`https://dummyjson.com/users/${userId}`).then((res) => {
      setUser(res.data)
    })
  }, [setUser, userId])

  useEffect(() => {
    Axios.get('https://dummyjson.com/products').then((res) => {
      console.log(res.data.products)
      setProductsList(res.data.products)
    })
  }, [setProductsList])
    
  const addToCart = (productId) => {
    console.log(productsList)
    Axios.post(`https://dummyjson.com/carts/add`, {
      userId: userId,
      products: [
        {
          id: productId,
          quantity: 1,
        }
      ]
    })
    .then((res) => {
      console.log(res.data)
    })
  }

  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }

  return (
    <>
      <div className='mb-12'>
        <span>
          <span className='m-2'>Welcome, {user.firstName}</span>
          <span className='m-2'><Link to={`/carts/user/${userId}`}>My Cart</Link></span>
          <span className='m-2' onClick={logoutUser}>Logout</span>
        </span>
      </div>

      <CategoryTabsAndSearch />

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
                <td className='px-4 py-2'><Link to={`/viewproduct/${product.id}`}>{product.title}</Link></td>
                <td className='px-4 py-2'>{product.stock}</td>
                <td className='px-4 py-2'>{product.rating}</td>
                <td className='px-4 py-2 space-x-6'>
                    <span className='text-xs'>
                      <Link to={`/viewproduct/${product.id}`}>
                        <button>View</button>
                      </Link>
                    </span>

                    <span className='text-xs'>
                      <button onClick={() => addToCart(product.id)}>Add to Cart</button>
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

export default Products