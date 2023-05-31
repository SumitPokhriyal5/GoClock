

/* user api */

import axios from "axios"
import { AppDispatch } from "../store/store"
import { errorUserData, loadingUserData, loginUser } from "../store/user/user.action"
import { IUserLogin } from "../types/user.types"



// login user api
export const loginUserApi = (data: IUserLogin) => async( dispatch : AppDispatch ) => {
    dispatch(loadingUserData())
    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_URL}/user/login` , {
            ...data
        })
        console.log(res)
        dispatch(loginUser(res.data))
    }
    catch(error: any){
        dispatch(errorUserData(error.message))
    }
}


/* messages api */