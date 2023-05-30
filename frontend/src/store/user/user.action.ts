import { ERROR_USER_DATA, LOADING_USER_DATA, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "./user.type";

export const loadingUserData = () => ({ type: LOADING_USER_DATA })
export const errorUserData = (payload: string) => ({ type: ERROR_USER_DATA , payload })
export const loginUser = (payload: string) => ({ type: LOGIN_USER , payload })
export const logoutUser = () => ({ type: LOGOUT_USER })
export const registerUser = (payload: string) => ({ type: REGISTER_USER , payload })