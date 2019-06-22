import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { userlist } from './userlist';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentuser : User={id:0,username:"",picture:"../assets/dummyimages/architect.jpg",password:"",role:""}
  usersource = new BehaviorSubject<User>(this.currentuser);
  constructor(private http:HttpClient) { }

  getUserDetails(): Observable<User>{
    return this.usersource.asObservable();
  }
  
  login(username: string, password: string){
    for (let i = 0; i < userlist.length; i++) {
      if (userlist[i].username==username && userlist[i].password==password) {
        this.changeuser(userlist[i]);
        this.currentuser=userlist[i];
        break;
      } else {
        continue;
      }
    }
    console.log(this.currentuser)
  }
  changeuser(usercurrent: User){
    this.usersource.next(usercurrent);
  }
  
}
