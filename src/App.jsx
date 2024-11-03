import {Footer, Header} from "./components/index.js";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import authService from "./appwrite/authBackend.js";
import {useDispatch} from "react-redux";
import {login, logout} from "./store/authSlice.js";

function App() {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch()
    useEffect(() => {
        authService.getCurrentUser().then((userData)=>{
            if(userData) {
                dispatch(login({userData}))
            } else {
                dispatch(logout())
            }
        }).finally(()=> setLoading(false))
    },[])
    return !loading ? (
        <div className='min-h-screen flex flex-wrap content-between bg-gradient-to-r from-purple-500 to-pink-500'>
            <div className='w-full block'>
                <Header/>
                <main>
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </div>
    ) : null
}
export default App
