import {Component, OnInit} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES,RouteConfig} from 'angular2/router';
import {UserService} from './userService';
import {User} from './user';

import {NewUserComponent} from './newUser.component';


@Component({
    template: `
    
    <h1>Users</h1>
    <p>
        <a class="btn btn-primary" 
            href="/users/new">
            Add User 
        </a>
    </p>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor = "#user of gitHubUsers">
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>
                    <a [routerLink]="['EditUser', { id: user.id }]">
                        <i class="glyphicon glyphicon-edit"></i>
                    </a>
                </td>
                <td>
                    <i (click)="deleteUser(user)" 
                        class="glyphicon glyphicon-remove clickable"></i>
                
                </td>
            </tr>
        </tbody>
    </table>
    
    `,
    styles: [`
        .clickable{
            cursor : pointer;
        }
    `],
    providers : [UserService],
    directives : [ROUTER_DIRECTIVES]
})
export class UsersComponent implements OnInit { 
    gitHubUsers : User[];

    constructor(private _userService : UserService){}

    ngOnInit(){
        this._userService
            .getUsers()
            .subscribe(users => {
                this.gitHubUsers = users;
        });
    }

    deleteUser(user){
            if(confirm("are you sure you want to delete user "+user.name+"?")){
                var index= this.gitHubUsers.indexOf(user);
                this.gitHubUsers.splice(index,1);
                this._userService.deleteUser(user)
                                   .subscribe(null,
                                   err => {
                                       alert('couldnot delete user'); 
                                       this.gitHubUsers.splice(index,0,user) ;
                                   });
            }
        }

}