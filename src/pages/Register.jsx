import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import { toast } from 'react-toastify';
import mainLogo from '../assets/storebo-logo.png'

const Register = () => {
  const [ inputEmail, setInputEmail ] = useState('')
  const [ inputFirstName, setInputFirstName ] = useState('')
  const [ inputLastName, setInputLastName ] = useState('')
  const [ inputUsername, setInputUsername ] = useState('')
  const [ inputPassword, setInputPassword ] = useState('')
  const [ inputPassword2, setInputPassword2 ] = useState('')

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault()

    if(inputPassword !== inputPassword2) {
      toast('Passwords do not match!')
    } else {
      await Axios.post('https://dummyjson.com/users/add', {
        email: inputEmail,
        firstName: inputFirstName,
        lastName: inputLastName,
        username: inputUsername,
        password: inputPassword,
      })
      .then(res => {
        navigate('/')
        toast(`User ${inputUsername} successfully registered!`)
      })
    }
  }


  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <img src={mainLogo} alt="logo" className='h-24 mx-auto mb-12' />

          <form action="" className="mt-6 mb-0 space-y-4 rounded-lg p-8 shadow-2xl">
            <p className="text-lg font-medium">Create your account</p>

            <div>
              <label for="email" className="text-sm font-medium flex ml-2">Email</label>

              <div className="relative mt-1">
                <input
                  type="email"
                  id="email"
                  className="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm"
                  placeholder=""
                  onChange={(e) => {setInputEmail(e.target.value)}} 
                  required
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label for="firstName" className="text-sm font-medium flex ml-2">First Name</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="firstName"
                  className="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm"
                  placeholder=""
                  onChange={(e) => {setInputFirstName(e.target.value)}} 
                  required
                />
              </div>
            </div>

            <div>
              <label for="lastName" className="text-sm font-medium flex ml-2">Last Name</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="lastName"
                  className="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm"
                  placeholder=""
                  onChange={(e) => {setInputLastName(e.target.value)}} 
                  required
                />
              </div>
            </div>

            <div>
              <label for="username" className="text-sm font-medium flex ml-2">Username</label>

              <div className="relative mt-1">
                <input
                  type="text"
                  id="username"
                  className="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm"
                  placeholder=""
                  onChange={(e) => {setInputUsername(e.target.value)}} 
                  required 
                />
              </div>
            </div>

            <div>
              <label for="password" className="text-sm font-medium flex ml-2">Password</label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  className="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm"
                  placeholder=""
                  onChange={(e) => {setInputPassword(e.target.value)}} 
                  required 
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label for="password2" className="text-sm font-medium flex ml-2">Confirm Password</label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password2"
                  className="w-full rounded-lg border-gray-200 p-2 pr-12 text-sm shadow-sm"
                  placeholder=""
                  onChange={(e) => {setInputPassword2(e.target.value)}} 
                  required 
                />

                <span className="absolute inset-y-0 right-4 inline-flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-teal-500 px-5 py-3 text-sm font-medium text-white"
              onClick={registerUser}
            >
              Sign in
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?
              <Link className="underline" to='/'> Log in</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register