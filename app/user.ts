
 export class Address {
        street: string;
        suite: String;
        city: string;
        zipcode: string;
    }
export class User{
    id : number;
    name: string;
    phone: string;
    email: string;
    address = new Address();
}