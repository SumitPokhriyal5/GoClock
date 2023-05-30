
export interface IUserState {
    loading: boolean;
    error: boolean | string;
    isAuth: boolean;
    token: string;
    serverMessage: string;
}

export interface IUserRegister {
    username: string;
    password: string;
    address: string;
    role: "Manufacturer" | "Transporter";
}
