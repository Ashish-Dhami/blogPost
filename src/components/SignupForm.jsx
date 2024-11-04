import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Input} from "./index.js";
import authService from "../appwrite/authBackend.js";
import {useDispatch} from "react-redux";
import {login} from "../store/authSlice.js";
import {useNavigate} from "react-router-dom";

function SignupForm() {
    const {register,handleSubmit,formState:{errors}} = useForm()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signupHandler = async (formData) => {
        try{
            setError("")
            const loginSession = await authService.createAccount(formData)
            if(loginSession){
                await authService.getCurrentUser().then((userData)=>{
                    if(userData) {
                        dispatch(login({userData}))
                        navigate("/dashboard")
                    }
                })
            }
        }catch (e){
            setError(e.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                {error && <span className="text-red-600 text-center">{error}</span>}
                <form onSubmit={handleSubmit(signupHandler)}>
                    <div className='space-y-5'>
                        <Input
                            label="Name : "
                            placeholder="Enter your name"
                            {...register("name",{
                                required : "Name is required"
                            })}
                        />
                        {errors.name && (<span className="text-red-600 mt-8 ml-2 text-center">{errors.name.message}</span>)}
                        <Input
                            label="Email : "
                            placeholder="Enter your email"
                            {...register("email",{
                                required : "Email is required",
                                pattern: {value : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "Invalid email"}
                            })}
                        />
                        {errors.email && (<span className="text-red-600 mt-8 ml-2 text-center">{errors.email.message}</span>)}
                        <Input
                            label="Password : "
                            placeholder="Enter new password"
                            {...register("password",{
                                required: "Password cannot be empty",
                                minLength: {value : 8, message: "Password should exceed 8 characters"}
                            })}
                        />
                        {errors.password && (<span className="text-red-600 mt-8 ml-2 text-center">{errors.password.message}</span>)}
                        <Button className="w-full" type="submit">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupForm;