import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'
import TopBar from '../components/TopBar'
import { toast } from 'react-toastify'

const Cart = () => {
  const { setUser, showEditQuantity, setShowEditQuantity, inputQuantity, setInputQuantity } = useUserContext();
  const { productsList, setProductsList } = useUserContext([]);
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
        console.log(detes)
        
        setPriceTotal(res.data.carts[i].total)
        setDiscountedTotal(res.data.carts[i].discountedTotal)
        setProductsList(res.data.carts[i].products)
      }
    })
  }, [userId, setProductsList])
  
  const deleteItem = (productId) => {
    Axios.delete(`https://dummyjson.com/products/${productId}`).then((res) => {
      // console.log(res.data)
      toast(`Deleted ${res.data.title}`)
    })
  }

  const editItem = (productId, productQuantity) => {
    Axios.get(`https://dummyjson.com/carts/user/${userId}`).then((res) => {
      for (let i = 0; i < res.data.carts.length; i++) {
        console.log(res.data.carts[i].id)
        const cartId = res.data.carts[i].id

        Axios.put(`https://dummyjson.com/carts/${cartId}`, {
          products: [
            {
              id: productId,
              quantity: productQuantity,
            }
          ]
        })
        .then((res) => {
          console.log(res.data)
        })
      }
    })
  }

  return (
    <>
      <TopBar />

      <div>
        <button className='rounded-md bg-gray-200 text-gray-600 px-5 py-2 text-sm font-medium mb-6 drop-shadow-sm'><Link to='/products'>Back</Link></button>
        <p className='text-2xl font-bold text-gray-600'>Shopping Cart</p>
      </div>

      <div className='m-4'>
        <table className='table-fixed w-full bg-slate-800 drop-shadow-xl'>
          <thead className='bg-teal-600 text-gray-100'>
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

                {showEditQuantity ? 
                  <td className='px-4 py-2'>
                    <input
                      type="number"
                      id="quantity"
                      placeholder={product.quantity}
                      className="m-1 p-1 w-16 rounded-md border-gray-200 shadow-sm sm:text-sm text-center"
                      onChange={(e) => {setInputQuantity(e.target.value)}}
                    />
                    <button
                      className='rounded-md bg-green-300 text-gray-800 text-sm p-1'
                      onClick={() => {editItem(product.id, inputQuantity); setShowEditQuantity(!showEditQuantity)}}
                    >
                      Save
                    </button> 
                  </td>
                : <td> {product.quantity} </td>}

                <td className='px-4 py-2'>{product.price}</td>
                <td className='px-4 py-2 space-x-6'>
                  <span className='text-xs space-x-4'>
                    <Link to={`/viewproduct/${product.id}`}>
                      <button>View</button>
                    </Link>
                    <button onClick={() => setShowEditQuantity(!showEditQuantity)}>Edit</button>
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
        <p className="text-xl font-bold m-4 text-gray-600">Total: <s className='text-sm'>${priceTotal}</s> <span className='text-green-500'>${discountedTotal}</span></p>
        <Link to={`/carts/user/${userId}/checkout`}>
          <button type="submit" className="w-1/6 rounded bg-rose-600 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white">
            Checkout
          </button>
        </Link>
      </div>
    </>
  )
}

export default Cart