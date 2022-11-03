import { Link } from 'react-router-dom'
import mainLogo from '../assets/storebo-logo.png'

const Checkout = () => {
  return (
    <>
      <div className='mt-24'>
        <img src={mainLogo} alt="logo" className='h-32 mx-auto m-5' />
        <p className='text-md mt-6'>Payment successfully completed.</p>
        <p className='text-xl mt-2'>Thank you for shopping at Storebo!</p>
        <button className='mt-6 rounded-md bg-gray-100 text-gray-600 px-5 py-2 text-sm font-medium mb-6'><Link to='/products'>Return to Homepage</Link></button>
      </div>
    </>
  )
}

export default Checkout