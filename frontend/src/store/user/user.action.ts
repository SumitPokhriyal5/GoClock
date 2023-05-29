import { IUserData } from "../../types/user.types";
import { GET_USER_DATA, LOADING_USER_DATA } from "./user.type";

export const getUserData = (payload: IUserData) => ({ type: GET_USER_DATA , payload})
export const loadingUserData = () => ({ type: LOADING_USER_DATA })
export const errorUserData = (payload: string) => ({ type: LOADING_USER_DATA , payload })