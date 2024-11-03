import React, {useState} from 'react';
import {Button, Input} from "./index.js";
import {useForm} from "react-hook-form";
import authService from "../appwrite/authBackend.js";
import {useDispatch} from "react-redux";
import {login} from "../store/authSlice.js";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const {register,handleSubmit}=useForm()
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginHandler = async(formData)=>{
        try{
            setError("")
            const loginSession = await authService.login(formData)
            if(loginSession){
                await authService.getCurrentUser().then((userData)=>{
                    if(userData) {
                        dispatch(login({userData}))
                        navigate("/dashboard")
                    }
                })
            }
        }catch (e) {
            setError(e.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(loginHandler)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email : "
                            placeholder="Enter your email"
                            {...register("email", {
                                required: true,
                                pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
                            })}
                        />
                        <Input
                            label="Password : "
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true
                            })}
                        />
                        <Button className="w-full" type="submit">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;