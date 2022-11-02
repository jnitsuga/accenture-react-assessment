import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useUserContext } from '../contexts/ContextProvider'
import { Link, useParams } from 'react-router-dom'
import mainLogo from '../assets/storebo-logo.png'
import { toast } from 'react-toastify';

const Checkout = () => {
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

  return (
    <>
<section>
  <h1 class="sr-only">Checkout</h1>

  <div class="relative mx-auto max-w-screen-2xl">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div class="bg-gray-50 py-12 md:py-24 h-screen">
        <div class="mx-auto max-w-lg px-4 lg:px-8">
          <div class="items-center">
          <button className='rounded-md bg-rose-100 text-gray-600 px-5 py-2 text-sm font-medium mb-6'><Link to='/products'>Back</Link></button>
            <img src={mainLogo} alt="logo" className='h-16 mx-auto m-5' />
            {/* <span class="h-10 w-10 rounded-full bg-blue-900"></span> */}

            <h2 class="font-medium">{user.firstName} {user.lastName}</h2>
          </div>

          <div class="mt-8">
            <p class="text-2xl font-medium tracking-tight">${discountedTotal}</p>
            <p class="mt-1 text-sm text-gray-500">For the purchase of</p>
          </div>

          <div class="mt-12">
            <div class="flow-root">
              <ul class="-my-4 divide-y divide-gray-200">

          {productsList.map((product, key) => {
            return (
            <>
                <li key={key} class="flex items-center justify-between py-4">
                  <div class="flex items-start">

                    <div class="ml-4">
                      <p class="text-sm">{product.title}</p>
                    </div>
                  </div>

                  <div>
                    <p class="text-sm">
                      ${product.price}
                      <small class="text-gray-500"> x{product.quantity}</small>
                    </p>
                  </div>
                </li>

          </>
        )
        })}
         </ul>
            </div>
          </div>
        </div>
        
      </div>

      <div class="bg-white py-12 md:py-24">
        <div class="mx-auto max-w-lg px-4 lg:px-8">
          <form class="grid grid-cols-6 gap-4">

            <fieldset class="col-span-6">
              <legend class="mb-1 block text-sm text-gray-600">
                Card Details
              </legend>

              <div class="-space-y-px rounded-lg bg-white shadow-sm">
                <div>
                  <label class="sr-only" for="card-number">Card Number</label>

                  <input
                    class="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                    type="text"
                    name="card-number"
                    id="card-number"
                    placeholder="Card number"
                  />
                </div>

                <div class="flex -space-x-px">
                  <div class="flex-1">
                    <label class="sr-only" for="card-expiration-date">
                      Expiration Date
                    </label>

                    <input
                      class="relative w-full rounded-bl-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                      type="text"
                      name="card-expiration-date"
                      id="card-expiration-date"
                      placeholder="MM / YY"
                    />
                  </div>

                  <div class="flex-1">
                    <label class="sr-only" for="card-cvc">CVC</label>

                    <input
                      class="relative w-full rounded-br-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                      type="text"
                      name="card-cvc"
                      id="card-cvc"
                      placeholder="CVC"
                    />
                  </div>
                </div>
              </div>
            </fieldset>

            <fieldset class="col-span-6">
              <legend class="mb-1 block text-sm text-gray-600">
                Billing Address
              </legend>

              <div class="-space-y-px rounded-lg bg-white shadow-sm">
                <div>
                  <label class="sr-only" for="country">Country</label>

                  <select
                    class="relative w-full rounded-t-lg border-gray-200 p-2.5 text-sm focus:z-10"
                    id="country"
                    name="country"
                    autocomplete="country-name"
                  >
                    <option>England</option>
                    <option>Wales</option>
                    <option>Scotland</option>
                    <option>France</option>
                    <option>Belgium</option>
                    <option>Japan</option>
                  </select>
                </div>

                <div>
                  <label class="sr-only" for="postal-code">
                    ZIP/Post Code
                  </label>

                  <input
                    class="relative w-full rounded-b-lg border-gray-200 p-2.5 text-sm placeholder-gray-400 focus:z-10"
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    placeholder="ZIP/Post Code"
                  />
                </div>
              </div>
            </fieldset>

            <div class="col-span-6">
              <Link
                to='/products'
                onClick={() => (toast(`Purchase amounting to $${discountedTotal} completed successfully!`))}
                class="block w-full rounded-lg bg-black p-2.5 text-sm text-white"
                type="submit"
              >
                Pay Now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  )
}

export default Checkout