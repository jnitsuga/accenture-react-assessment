import { useEffect } from 'react'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'

const CategoryTabsAndSearch = () => {
  const { searchTerm, setSearchTerm, setProductsList } = useUserContext('')

  useEffect(() => {
    Axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`).then((res) => {
      console.log(res.data.products)
      setProductsList(res.data.products)
    })
  },[searchTerm, setProductsList])

  const getAllProducts = () => {
    Axios.get('https://dummyjson.com/products').then((res) => {
      console.log(res.data.products)
      setProductsList(res.data.products)
    })
  }

  const getProductsByCategory = (category) => {
    Axios.get(`https://dummyjson.com/products/category/${category}`).then((res) => {
      console.log(res.data.products)
      setProductsList(res.data.products)
    })
  }

  return (
    <>
      <div className='m-4 flex justify-end'>
        <div className='w-full'>
          <nav className="flex border-b border-gray-100 text-sm font-medium mr-10">
            
            {/* <p className="mb-px border-b border-transparent p-4 text-slate-500">
              CATEGORIES
            </p> */}

            <button onClick={() => getAllProducts()} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              All
            </button>

            <button onClick={() => getProductsByCategory('smartphones')} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Smartphones
            </button>

            <button onClick={() => getProductsByCategory('laptops')} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Laptops
            </button>

            <button onClick={() => getProductsByCategory('fragrances')} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Fragrances
            </button>

            <button onClick={() => getProductsByCategory('skincare')} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Skin Care
            </button>

            <button onClick={() => getProductsByCategory('home-decoration')} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Home Decoration
            </button>

            <button onClick={() => getProductsByCategory('groceries')} className="mb-px border-b border-transparent p-4 hover:text-cyan-500">
              Groceries
            </button>

          </nav>
        </div>

        <input className="placeholder:italic placeholder:text-slate-400 bg-white w-1/4 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder="Search for a product..." type="text" name="search" onChange={(e) => {setSearchTerm(e.target.value)}} />

      </div>
    </>
  )
}

export default CategoryTabsAndSearch