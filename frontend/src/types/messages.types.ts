
export interface IMessages {
    orderID: string
    to: string;
    from: string;
    quantity: number;
    address: string;
    transporter: string;
    price: number;
    sent: boolean;
}