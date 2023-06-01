

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
        console.log(res)
        dispatch(loginUser(res.data))
    }
    catch(error: any){
        dispatch(errorUserData(error.message))
    }
}


/* messages api */

const token = localStorage.getItem("token");
const parsedToken = token ? JSON.parse(token) : "";

const axiosConfig: AxiosRequestConfig = {
    headers: {
      Authorization: parsedToken, 
      "Content-Type": "application/json",
    },
  };

export const getMessageApi = () =>async (dispatch : AppDispatch) => {
    dispatch(loadingMessages());
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_URL}/message` , axiosConfig)
        console.log(res.data.messages);
        dispatch(getMessages(res.data.messages))
    } catch (error : any) {
        dispatch(errorMessages(error.message))
    }
}

export const postMessageApi = (data : IMessages) =>async (dispatch : AppDispatch) => {
    dispatch(loadingMessages());
    try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_URL}/message` , {
            ...data
        } , axiosConfig)
        console.log(res);
        dispatch<any>(getMessageApi())
    } catch (error : any) {
        dispatch(errorMessages(error.message))
    }
}
