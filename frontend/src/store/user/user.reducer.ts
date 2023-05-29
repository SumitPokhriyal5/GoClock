import { IUserData } from "../../types/user.types";
import { ERROR_USER_DATA, GET_USER_DATA, LOADING_USER_DATA } from "./user.type"
interface IUserState {
    loading: boolean;
    error: boolean | string;
    isAuth: boolean;
    userData: IUserData;
}

const initialState : IUserState = {
    loading: false,
    error: false,
    isAuth: false,
    userData: {
        username: "",
        password: "",
        address: "",
        role: ""
    }
}

export const userReducer = ( state = initialState , { type , payload }) => {
    switch( type ){
        case GET_USER_DATA: {
            return {
                ...state,
                loading: false,
                userData: payload
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
                error: payload || true
            }
        }
        default: return state
    }
}