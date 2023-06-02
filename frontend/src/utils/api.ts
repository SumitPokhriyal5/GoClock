

/* user api */

import axios, { AxiosRequestConfig } from "axios"
import { AppDispatch } from "../store/store"
import { errorUserData, loadingUserData, loginUser } from "../store/user/user.action"
import { IUserLogin } from "../types/user.types"
import { IMessages } from "../types/messages.types"
import { errorMessages, getMessages, loadingMessages } from "../store/messages/messages.action"



// login user api
export const loginUserApi = (data: IUserLogin) => async( dispatch : AppDispatch ) => {
    dispatch(loadingUserData())
    try{
        const res = await axios.post(`${import.meta.env.VITE_REACT_URL}/user/login` , {
            ...data
        })
        dispatch(loginUser(res.data))
    }
    catch(error: any){
        dispatch(errorUserData(error.message))
    }
}


/* messages api */



//   get message api
export const getMessageApi = (token:string) =>async (dispatch : AppDispatch) => {
    dispatch(loadingMessages());
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_URL}/message` , {
            headers: {
              Authorization: token, 
              "Content-Type": "application/json",
            }
          })
        dispatch(getMessages(res.data.messages))
    } catch (error : any) {
        dispatch(errorMessages(error.message))
    }
}


//  post message api
export const postMessageApi = (data : IMessages , token: string) =>async (dispatch : AppDispatch) => {
    dispatch(loadingMessages());
    try {
        await axios.post(`${import.meta.env.VITE_REACT_URL}/message` , {
            ...data
        } , {
            headers: {
              Authorization: token, 
              "Content-Type": "application/json",
            }
          })
        dispatch<any>(getMessageApi(token))
    } catch (error : any) {
        dispatch(errorMessages(error.message))
    }
}

// send payment api
export const paymentMessageApi = (amount:number , id:string , token : string) => async (dispatch:AppDispatch) => {
    try {
        await axios.post(`${import.meta.env.VITE_REACT_URL}/message/send/${id}` , {
            price: amount
        },{
            headers: {
              Authorization: token, 
              "Content-Type": "application/json",
            },
          })
        dispatch<any>(getMessageApi(token))
    } catch (error) {
        console.log(error)
    }
}
