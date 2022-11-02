import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'
// import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai'

const Cart = () => {
  const {user, setUser} = useUserContext();
  const {productsList, setProductsList} = useUserContext([]);
  const [ priceTotal, setPriceTotal ] = useState('')
  const [ discountedTotal, setDiscountedTotal ] = useState('')

  const { userId } = useParams();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    Axios.get(`https://dummyjson.com/users/${userId}`).then((res) => {
      setUser(res.data)
    })
  }, [setUser])

  useEffect(() => {
    Axios.get(`https://dummyjson.com/carts/user/${userId}`).then((res) => {
      for (let i = 0; i < res.data.carts.length; i++) {
        const detes = res.data.carts[i]
        console.log(
          detes
        )
        
        setPriceTotal(res.data.carts[i].total)
        setDiscountedTotal(res.data.carts[i].discountedTotal)
        setProductsList(res.data.carts[i].products)
      }
    })
  }, [userId, setProductsList])


  
  const deleteItem = (productId) => {
    Axios.delete(`https://dummyjson.com/products/${productId}`).then((res) => {
      console.log(res)
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
          <span className='m-2'><Link to="/products">Back to Products</Link></span>
          <span className='m-2' onClick={logoutUser}>Logout</span>
        </span>
      </div>

      <div>Shopping Cart</div>

      <div className='m-4'>
        <table className='table-fixed w-full bg-slate-800 drop-shadow-xl'>
          <thead className='bg-slate-600 text-gray-100'>
            <tr>
              <th className='w-1/8 px-4 py-2'>#</th>
              <th className='w-1/2 px-4 py-2'>Product</th>
              <th className='w-1/8 px-4 py-2'>Quantity</th>
              <th className='w-1/8 px-4 py-2'>Price</th>
              <th className='w-1/8 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
          {productsList.map((product, key) => {
            return (
              <tr key={key} className='text-center text-gray-300'>
                <td className='px-4 py-2'>{product.id}</td>
                <td className='px-4 py-2'>{product.title}</td>
                <td className='px-4 py-2'>{product.quantity}</td>
                <td className='px-4 py-2'>{product.price}</td>
                <td className='px-4 py-2 space-x-6'>
                    <span className='text-xs space-x-4'>
                      <Link to={`/viewproduct/${product.id}`}>
                        <button>View</button>
                      </Link>
                      <button>Edit</button>
                      <button onClick={() => deleteItem(product.id)}>Delete</button>
                    </span>

                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>

      <div>
        <p className="text-xl font-bold m-4">Total: <s className='text-sm'>${priceTotal}</s> <span className='text-green-500'>${discountedTotal}</span></p>
        <Link to={``}>
          <button type="submit" className="w-1/6 rounded bg-red-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
            Checkout
          </button>
        </Link>
      </div>
    </>
  )
}

export default Cart