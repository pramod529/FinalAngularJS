import {Component, OnInit} from 'angular2/core';
import {PostService} from './postService';
import {UserService} from './userService';

@Component({
    
    providers : [PostService, UserService],
    templateUrl: 'app/posts.component.html',
    styles:[`

        .posts li{ 
            cursor: default; 
        }
        .posts li:hover{ 
            background: #ecf0f1; 
        } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus{ 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
        .media-object{
            border-radius: 100%
        }

    `]
})
export class PostsComponent implements OnInit {
    users = [];
    posts = [];
    comments = [];
    postsLoading ;
    commentsLoading;
    currentPost;
    sourceUrl = "http://lorempixel.com/100/100/people?";

    constructor(private _postService : PostService, 
                private _userService : UserService){}

    ngOnInit(){
        this.loadUsers();
        this.loadPosts();
    }
    private loadPosts(filter?){
        this.postsLoading = true;
        this._postService
            .getPosts(filter)
            .subscribe(posts => 
                this.posts = posts, 
                null,
                () => { this.postsLoading = false; }  
        );
    }
    private loadUsers(){
        this._userService
            .getUsers()
            .subscribe(users => 
                this.users = users
        );
    }
    reloadPosts(filter){
        this.currentPost = null;
        this.loadPosts(filter);
    }

    select(post){
        this.commentsLoading = true;
        this.currentPost=post;
        this._postService
            .getComments(this.currentPost.id)
            .subscribe(comments => 
                {
                    this.comments = comments;
                    this.commentsLoading = false;
                   // this.sourceUrl = this.sourceUrl;
                    console.log(comments[0].name);
                    
                }
        );
    }
}