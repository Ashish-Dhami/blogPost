import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function IsLoggedIn({authentication = true,children}) {
    const isLoggedIn = useSelector(state => state.auth.status)
    const [loader, setLoader] = useState(true)
    const navigateTo = useNavigate()
    useEffect(() => {
        if(!authentication && isLoggedIn !== authentication){
            navigateTo("/dashboard")
        }else if(authentication && isLoggedIn !== authentication){
            navigateTo("/login")
        }
        setLoader(false)
    }, [isLoggedIn,navigateTo,authentication]);

    return loader ? <h1>Loading...</h1> : <>{children}</>
}