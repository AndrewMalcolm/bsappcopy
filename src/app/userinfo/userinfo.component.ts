import { Component, OnInit, Input } from '@angular/core';
import { User } from '../user';
import { userlist } from '../userlist';
import { AuthService } from '../auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css']
})
export class UserinfoComponent {
  @Input() currentuser:User;
  
  constructor() { 
    this.currentuser=userlist[0];
    
  }

  getuserdata(){
    
  }
}
