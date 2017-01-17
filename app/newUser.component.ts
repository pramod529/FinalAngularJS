import {Component,OnInit} from 'angular2/core';
import  {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {CanDeactivate, RouteParams,Router} from 'angular2/router';
import  {NewUserValidators} from './newUserValidator';

import {UserService} from './userService';
import {User} from './user';


@Component({
    selector:'new-user',
    templateUrl: 'app/newUser.component.html',
    providers: [UserService]
})
export class NewUserComponent implements CanDeactivate, OnInit { 
    form: ControlGroup;
    user = new User();
    title: string;

    constructor(fb: FormBuilder, 
                private _router : Router, 
                private _routeParams: RouteParams,
                private _userService: UserService)
    {  
        this.form = fb.group({ 
            name: ['', Validators.required],  
            email: ['', NewUserValidators.validateEmail], 
            phone: [],
            address: fb.group({ 
            street: [], 
            suite: [],
            city: [],
            zipcode: []
          }) 
        });   
    }

    ngOnInit(){
        var id = this._routeParams.get("id");
        this.title = id? "Edit User" : "New User";
        if(!id)
            return;
        this._userService.getUser(id)
            .subscribe(
                user => this.user= user,
                response =>{
                    if(response.status == 404){
                        this._router.navigate(['NotFound']);
                    }
                }
            )
    }
    onSave(userform){
        var result;

        if(this.user.id){
          result=  this._userService
            .updateUser(this.user);     
        }else{
           result= this._userService
            .createUser(this.user);
        }
        result.subscribe(res => {
                 this.user = res;
                 this.form.markAsDirty("false");
                 this._router.navigate(['Users']);
            });
        
    }

    routerCanDeactivate(next, prev){
        if(this.form.dirty){
            return confirm("are you sure?");
        }

    }
    

}