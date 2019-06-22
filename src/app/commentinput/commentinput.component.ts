import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';
import { userlist } from '../userlist';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { stringify } from 'querystring';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-commentinput',
  templateUrl: './commentinput.component.html',
  styleUrls: ['./commentinput.component.css']
})
export class CommentinputComponent implements OnInit {
  @Input() article: Article;
  newcomment:Comment;
  newcommentcontent: string;
  usercurrent:User;
  constructor(private auth:AuthService) {}

  ngOnInit() {
    this.auth.getUserDetails().subscribe(usercurrent => this.usercurrent = usercurrent)
  }

  sendcomment(event){
    console.log(this.newcommentcontent);
    this.newcomment={user:this.usercurrent,content:this.newcommentcontent,time:"15/02/2019",article:this.article};
    commentlist.push(this.newcomment);
    //create new comment here
  }
}
