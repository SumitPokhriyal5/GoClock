
export interface IMessages {
    userID?: string;
    _id?: string;
    orderID?: string;
    to: string;
    from: string;
    quantity: number;
    address?: string;
    transporter: string;
    price?: number;
    sent?: boolean;
}