import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';

@Injectable()
export class UserService{
     _url = "http://jsonplaceholder.typicode.com/users/";

    constructor( private _http: Http){}

    
    getUsers(){
        return this._http.get(this._url)
                            .map(users => users.json());
    }
    createUser(user){
       return this._http.post(this._url, JSON.stringify(user)) 
                 .map(response => response.json());
    }
    getUser(id){
        return this._http.get(this._url+id)
                            .map(users => users.json());
    }
    updateUser(user){
        console.log(user);
       return this._http.put(this._url+user.id, JSON.stringify(user)) 
                 .map(response => response.json());
    }
    deleteUser(user){
        console.log(user);
        return this._http.delete(this._url+user.id) 
                 .map(response => response.json());
    }

}