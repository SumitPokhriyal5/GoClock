

/* user api */

import axios from "axios"
import { AppDispatch } from "../store/store"
import { errorUserData, loadingUserData, loginUser } from "../store/user/user.action"


// login user api
export const loginUserApi = (data: {email:string, password: string}) => async( dispatch : AppDispatch ) => {
    dispatch(loadingUserData())
    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_URL}/login` , {
            data
        })
        dispatch(loginUser(res.data))
    }
    catch(error: any){
        dispatch(errorUserData(error.message))
    }
}


/* messages api */