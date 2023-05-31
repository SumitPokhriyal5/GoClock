
export interface IUserState {
    loading: boolean;
    error: boolean | string;
    isAuth: boolean;
    token: string;
}

export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserRegister {
    username: string;
    password: string;
    address: string;
    role: "Manufacturer" | "Transporter";
}
