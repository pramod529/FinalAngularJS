import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map';
import {Http} from 'angular2/http';

@Injectable()
export class PostService{
     _url = "http://jsonplaceholder.typicode.com/posts";

    constructor( private _http: Http){}

    
    getPosts(filter?){
        var url = this._url;

        if (filter && filter.userId)
            url = url + "?userId=" + filter.userId;

        return this._http.get(url)
                 .map(posts => posts.json());
    }
    createPost(post){
       return this._http.post(this._url, JSON.stringify(post)) 
                 .map(response => response.json());
    }
    getPost(id){
        return this._http.get(this._url+id)
                            .map(posts => posts.json());
    }
    getComments(id){
        return this._http.get(this._url+"/"+id+"/comments")
                            .map(posts => posts.json());
    }
    updatePost(post){
        console.log(post);
       return this._http.put(this._url+post.id, JSON.stringify(post)) 
                 .map(response => response.json());
    }
    deletePost(post){
        console.log(post);
        return this._http.delete(this._url+post.id) 
                 .map(response => response.json());
    }





    
    

}