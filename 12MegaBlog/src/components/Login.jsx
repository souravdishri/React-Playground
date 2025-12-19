import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice.js'
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from "react-redux"
import authService from "../appwrite/auth.js"
import { useForm } from "react-hook-form"

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        console.log("Data:", data);
        setError("")
        try {
            const session = await authService.login(data) //creating a session, it returns a promise
            if (session) {  //if session is created successfully
                const userData = await authService.getCurrentUser() // getting current user data through appwrite
                if (userData) dispatch(authLogin(userData)); // dispatching the user data to the store
                //By the use of navigate we programmatically send the user to root, but in `<Link>` user need to click it
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div
            className='flex items-center justify-center w-full'
        >
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>

                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>

                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>

                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                {/* Here we use react-hook-form for form handling */}
                {/* `handleSubmit` is a function provided by react-hook-form and inside that we pass `login` function which is the function we defined above */}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        
                        {/* here we use input component which we made */}
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            //register function from react-hook-form, we must have to use spread operator like `{...register()}` otherwise if we are using this 'register' in any another input it will replace the entire value
                            //it takes ('two arguments') can take more as well, first is the ('name of the input field') & second is the ('validation rules')
                            //name of the input & it should be unique, (it contains key, options), (because the final object which will be spread, the `data` like in `.login(data)` will be based on this)
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        {/* here we use input component which we made */}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full"
                        >Sign in</Button>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login