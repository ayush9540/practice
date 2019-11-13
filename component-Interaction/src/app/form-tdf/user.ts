export class User {
    constructor(
       public userName: string,
       public email: string,
       public phone: number,
       public topics: string,
       public timePreference: string,
       public subscribe: boolean
    ){}
}
