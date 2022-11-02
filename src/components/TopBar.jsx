import { Link } from 'react-router-dom'
import { useUserContext } from '../contexts/ContextProvider';
import mainLogo from '../assets/storebo-logo.png'

const TopBar = () => {
  const { user } = useUserContext();

  const userId = localStorage.getItem('userId');

  const logoutUser = () => {
    localStorage.clear()
    window.location='/'
  }

  return (
    <>
    {/* <div className='mb-12 p-2.5 bg-yellow-200 flex justify-center'>
      <span>
        <span className='m-2 font-bold'>Welcome, {user.firstName}</span>
        <span className='m-2'><Link to='/products'>Shop</Link></span>
        <span className='m-2'><Link to={`/carts/user/${userId}`}>My Cart</Link></span>
        <span className='m-2' onClick={logoutUser}>Logout</span>
      </span>
    </div> */}

    <header aria-label="Site Header" class="bg-white">
  <div class="mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="md:flex md:items-center md:gap-12">
        <Link class="block text-teal-600" to="/products">
          <span class="sr-only">Home</span>
          <img className='h-10' alt='storebo' src={mainLogo} />
        </Link>
      </div>

      <div class="hidden md:block">
        <nav aria-label="Site Nav">
          <ul class="flex items-center gap-6 text-sm">
            <li>
              <Link to='/products' className="text-gray-500 transition hover:text-gray-500/75">
                Shop
              </Link>
            </li>

            {/* <li>
              <Link to={`/carts/user/${userId}`} className="text-gray-500 transition hover:text-gray-500/75">
                My Cart
              </Link>
            </li> */}

            <li>
              <Link to={``} className="text-gray-500 transition hover:text-gray-500/75">
                Support
              </Link>
            </li>

            <li>
              <Link to={``} className="text-gray-500 transition hover:text-gray-500/75">
                FAQs
              </Link>
            </li>

          </ul>
        </nav>
      </div>

      <div class="flex items-center gap-2">
        <div class="sm:flex sm:gap-2">
          {/* <a
            class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
            href="/"
          >
            Login
          </a> */}

          <div class="sm:flex">
            <a
              class="rounded-md px-5 py-2.5 text-sm font-medium text-teal-600"
              href="/products"
            >
              Welcome, {user.firstName}
            </a>
          </div>

          <div class="sm-flex">
            <Link to={`/carts/user/${userId}`}>
            <button
              class="rounded-md bg-rose-400 px-5 py-2 text-sm font-medium text-white"
            >
              My Cart
            </button>
            </Link>
          </div>
          
          <div class="sm-flex">
            <button
              class="rounded-md bg-gray-100 px-5 py-2 text-sm font-medium text-gray-500 ml-2"
              onClick={logoutUser}
            >
              Log Out
            </button>
          </div>
        </div>

        <div class="block md:hidden">
          <button
            class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</header>


    </>
  )
}

export default TopBar