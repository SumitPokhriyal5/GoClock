import { Reducer } from "@reduxjs/toolkit";

import { ERROR_USER_DATA, LOADING_USER_DATA, LOGIN_USER, LOGOUT_USER } from "./user.type"
import { IUserState } from "../../types/user.types";

const initialState : IUserState = {
    loading: false,
    error: false,
    isAuth: false,
    token: "",
}

export const userReducer: Reducer<IUserState> = ( state = initialState , { type , payload } ) => {
    switch( type ){
        case LOGIN_USER: {
            return {
                ...state,
                loading: false,
                isAuth:true,
                error:false,
                token: payload
            }
        }

        case LOGOUT_USER: {
            return {
                ...initialState
            }
        }

        case LOADING_USER_DATA: {
            return {
                ...state,
                loading: true
            }
        }

        case ERROR_USER_DATA: {
            return {
                ...state,
                loading: false,
                error: payload || true,
            }
        }
        default: return state
    }
}