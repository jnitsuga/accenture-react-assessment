import { useEffect } from 'react';
import Axios from 'axios'
import { toast } from 'react-toastify';
import { useUserContext } from '../contexts/ContextProvider'

const LoginForm = () => {
  const { inputUsername, setInputUsername, inputPassword, setInputPassword } = useUserContext();

  useEffect(() => {
    
  }, [])
  

  const login = async (e) => {
    e.preventDefault()

    try {
      await Axios.post('https://dummyjson.com/auth/login', {
        username: inputUsername,
        password: inputPassword,
      })
      .then(res => {
        if(typeof res.data !== 'undefined') {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('userId', res.data.id)
          toast('Successfully logged in')
          // window.setTimeout(function() {
            window.location='/products'
          // }, 1500)
        }
      })
    } catch (error) {
      toast('Invalid credentials. Please try again.')
    }

  }

  return (
    <> 
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero nulla
              eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>

              <div className="relative">
                <input
                  type="text"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter username"
                  onChange={(e) => {setInputUsername(e.target.value)}}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                  placeholder="Enter password"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                No account?
                <span className="underline">Sign up</span>
              </p>

              <button
                onClick={login}
                type="submit"
                className="ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt="Welcome"
            src="https://images.unsplash.com/photo-1581067721837-e4809b29692d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

    </>
  )
}

export default LoginForm