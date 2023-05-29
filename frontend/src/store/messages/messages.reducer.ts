import { Reducer } from "@reduxjs/toolkit";
import { IMessages } from "../../types/messages.types";
import { ERROR_MESSAGES, GET_MESSAGES, LOADING_MESSAGES } from "./messages.type";

interface IMessageState {
    loading: boolean;
    error: boolean | string;
    messages: IMessages[];
}

const initialState : IMessageState = {
    loading: false,
    error: false,
    messages: []
}

export const messagesReducer: Reducer<IMessageState> = ( state = initialState , { type , payload } ) => {
    switch( type ){
        case GET_MESSAGES: {
            return {
                ...state,
                loading: false,
                userData: payload
            }
        }

        case LOADING_MESSAGES: {
            return {
                ...state,
                loading: true
            }
        }

        case ERROR_MESSAGES: {
            return {
                ...state,
                loading: false,
                error: payload || true
            }
        }
        default: return state
    }
}