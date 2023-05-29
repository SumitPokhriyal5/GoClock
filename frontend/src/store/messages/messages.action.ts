import { IMessages } from "../../types/messages.types"
import { ERROR_MESSAGES, GET_MESSAGES, LOADING_MESSAGES } from "./messages.type"

export const getMessages = (payload: IMessages[]) => ({ type: GET_MESSAGES , payload})
export const loadingMessages = () => ({ type: LOADING_MESSAGES })
export const errorMessages = (payload: string) => ({ type: ERROR_MESSAGES , payload })