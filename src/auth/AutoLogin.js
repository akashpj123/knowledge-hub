import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFromLocalStorage } from "./store/authSlice";
import {   setAdminFromLocalStorage } from "./store/authAdminSlice";
function AutoLogin(props){
    const dispatch = useDispatch();
    useEffect(()=>{dispatch(setUserFromLocalStorage())},[])
    
    useEffect(()=>{dispatch(  setAdminFromLocalStorage())},[])
    return props.children
}

export default AutoLogin;