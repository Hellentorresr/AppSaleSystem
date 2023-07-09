//This interface is to save the user who has logged in

export interface Session {
    idUser: number,
    fullName: string,
    email: string,
    rolDescription: string
}
