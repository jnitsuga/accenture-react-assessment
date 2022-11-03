import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'
import { HiOutlineViewList } from 'react-icons/hi'
import { HiOutlineSquares2X2 } from 'react-icons/hi2'

import CategoryTabsAndSearch from '../components/CategoryTabsAndSearch'
import TopBar from '../components/TopBar'
import Banner01 from '../components/Banner01'
import { toast } from 'react-toastify'

const Products = () => {
  const { setUser } = useUserContext();
  const { productsList, setProductsList } = useUserContext([]);
  const [listView, setListView ] = useState(false)

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
    
  // const addToCart = (productId) => {
  //   console.log(productsList)
  //   Axios.post(`https://dummyjson.com/carts/add`, {
  //     userId: userId,
  //     products: [
  //       {
  //         id: productId,
  //         quantity: 1,
  //       }
  //     ]
  //   })
  //   .then((res) => {
  //     console.log(res.data.products[0].title)
  //     toast(`${res.data.products[0].title} added to cart`)
  //   })
  // }

  const addToCart = (productId) => {
    Axios.get(`https://dummyjson.com/carts/user/${userId}`).then((res) => {
      console.log(res.data.carts[0].id)
      const cartId = res.data.carts[0].id
      Axios.put(`https://dummyjson.com/carts/${cartId}`, {
        products: [
          {
            id: productId,
            quantity: 1,
          }
        ]
      })
      .then((res) => {
        console.log(res.data.products)
        toast(`${res.data.products[0].title} added to cart`)
      })
    })
  }

  return (
    <>
      <TopBar />
      <Banner01 />
      <CategoryTabsAndSearch />

      {/* View Toggle */}
      <div className='flex justify-end mr-4'>
      <span className="inline-flex divide-x overflow-hidden rounded-md border bg-white shadow-sm">
        <button
          className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
          title="Edit Product"
          onClick={() => setListView(false)}
        >
          <HiOutlineSquares2X2 />
        </button>

        <button
          className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
          title="Delete Product"
          onClick={() => setListView(true)}
        >
          <HiOutlineViewList />
        </button>
      </span>
      </div>

      {/* Table Style */}
      {listView ?
      <>
      <div className='m-4'>
        <table className='table-fixed w-full bg-slate-800 drop-shadow-xl'>
          <thead className='bg-teal-600 text-gray-100'>
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
      :
      <>
      {/* Cards Style */}
      {/* <p className='text-xl font-bold mt-10'>Products</p> */}
      <div className='p-10 pt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5'>
      {productsList.map((product, key) => {
        return (
          <div key={key} className="relative block border border-gray-200 bg-white w-full rounded-lg drop-shadow-sm">
            <Link to={`/viewproduct/${product.id}`}>
            <img
              alt="thumbnail"
              src={product.thumbnail}
              className="h-56 w-full object-contain lg:h-72"
            />
            </Link>

            <div className="p-6">
              <h3 className="mt-2 text-lg font-bold">{product.title}</h3>

              <p className="mt-2 text-sm text-gray-700">${product.price}</p>
              <p className="mt-2 text-xs text-gray-700">Rating: {product.rating}</p>
              <p className="mt-2 text-xs text-gray-700">Stocks Left: {product.stock}</p>

              <button
                type="button"
                className="mt-2 block w-full rounded-sm bg-orange-200 p-4 text-sm font-medium"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        )
      })}
      </div>
      </>
    }
    </>
  )
}

export default Products