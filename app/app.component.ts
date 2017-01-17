import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {NavBarComponent} from './navbar.component';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users.component';
import {PostsComponent} from './posts.component';
import {UserService} from './userService';
import {NewUserComponent} from './newUser.component';
import {NotFoundComponent} from './notFound.component';

@RouteConfig([
	{ path: '/', name: 'Home', component: HomeComponent },
	{ path: '/users', name: 'Users', component: UsersComponent },
    { path: '/users/:id', name: 'EditUser', component: NewUserComponent },
	{ path: '/users/new', name: 'NewUsers', component: NewUserComponent },
	{ path: '/posts', name: 'Posts', component: PostsComponent },
    { path: '/notFound', name: 'NotFound', component: NotFoundComponent },
	{ path: '/*other', name: 'Other', redirectTo: ['Home'] }
])
@Component({
    selector: 'my-app',
    providers: [UserService],
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
        
    `,
    directives: [NavBarComponent, NewUserComponent, ROUTER_DIRECTIVES]
})
export class AppComponent { 
    
}