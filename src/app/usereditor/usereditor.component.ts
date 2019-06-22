import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { Role } from '../role';
import { roleslist } from '../roleslist';
import { userlist } from '../userlist';
import { User } from '../user';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-usereditor',
  templateUrl: './usereditor.component.html',
  styleUrls: ['./usereditor.component.css']
})
export class UsereditorComponent implements OnInit {

  currentuser:User=userlist[0];//needs to be changed to observable
  newuserslist:Array<User>=userlist;
  constructor() { }

  ngOnInit() {
  }
  changeuser(user){
    this.currentuser=user;
  }

}
