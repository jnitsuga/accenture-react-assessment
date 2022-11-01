import React from 'react'

const Products = () => {
  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }

  return (
    <>
      <div className='mb-12'>
        <span>
          <span className='m-2'>Account</span>
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
          className="mt-1 w-1/2 rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      </div>

      <div className='m-4'>
        <table className='table-fixed w-full bg-slate-800 drop-shadow-xl'>
          <thead className='bg-slate-600 text-gray-100'>
            <tr>
              <th className='w-1/8 px-4 py-2'>#</th>
              <th className='w-1/8 px-4 py-2'>Product</th>
              <th className='w-1/6 px-4 py-2'>Stock</th>
              <th className='w-1/2 px-4 py-2'>Rating</th>
              <th className='w-1/8 px-4 py-2'>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className='text-gray-300'>
              <td>1</td>
              <td>Blackpink Shirt</td>
              <td>100</td>
              <td>*****</td>
              <td>
                <span className='text-xs'><button>View</button></span>
                <span className='text-xs'><button>Add to Cart</button></span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Products