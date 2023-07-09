import { SaleDetail } from "./sale-detail"

export interface Sale {
    idSale?: number,
    documentNumber?: string,
    paymentMethod: string,
    totalText: string,
    registrationDate?: string
    saleDetails: SaleDetail[]  //an array that will contain product list
}
