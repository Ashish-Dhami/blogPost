import React from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {Button} from "./index.js";
import {useDispatch, useSelector} from "react-redux";
import authService from "../appwrite/authBackend.js";
import {logout} from "../store/authSlice.js";

function Header() {
    const username = useSelector((state)=> state.auth.userData?.name)
    const isLoggedIn = useSelector((state)=> state.auth.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler = ()=>{
        authService.logout().then(()=>dispatch(logout()))
                            /*.then(()=>navigate("/"))*/
    }
    const btnList = [
        {
            name:"Sign In",
            url:"/login",
            isActive: !isLoggedIn
        },
        {
            name:"Sign Up",
            url:"/signup",
            isActive: !isLoggedIn
        }
    ]
    const navLinkList = [
        {
            name:"My Posts",
            url:"/myposts",
            isActive: !isLoggedIn
        },
        {
            name:"All Posts",
            url:"/posts",
            isActive: !isLoggedIn
        },
        {
            name:"Add Post",
            url:"/add-post",
            isActive: !isLoggedIn
        }
    ]
    return (
        <header className="p-4 bg-gray-100 text-coolGray-800 w-full">
            <div className="container flex justify-between h-16 mx-auto">
                <Link to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img className="w-11 h-11" src="programming.png" alt="Logo"/>
                </Link>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                    {isLoggedIn &&
                        navLinkList.map((nav)=>(
                            <li key={nav.name} className="flex">
                                <NavLink to={nav.url} className={({isActive})=> `${isActive ? "text-red-600" : ""} flex items-center px-4 -mb-1 border-b-2 border-transparent`}>
                                    {nav.name}
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
                <ul className="items-stretch hidden space-x-3 lg:flex">
                {btnList.map((btn) =>
                    (<li key={btn.name} className="items-center flex-shrink-0 hidden lg:flex">
                        <Button hidden={!btn.isActive} onClick={() => navigate(btn.url)}>
                            {btn.name}
                        </Button>
                    </li>))}
                {isLoggedIn &&
                    <li className="items-center flex-shrink-0 hidden lg:flex">
                        <Button onClick={logoutHandler}>Log Out</Button>
                        <span
                            className="flex w-full h-full ml-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-green-900 justify-center items-center">{username}</span>
                    </li>
                }
            </ul>
            </div>
        </header>
    );
}

export default Header;