import { ERROR_USER_DATA, LOADING_USER_DATA, LOGIN_USER, LOGOUT_USER } from "./user.type";

export const loadingUserData = () => ({ type: LOADING_USER_DATA })
export const errorUserData = (payload: string) => ({ type: ERROR_USER_DATA , payload })
export const loginUser = (payload: string) => ({ type: LOGIN_USER , payload })
export const logoutUser = () => ({ type: LOGOUT_USER })