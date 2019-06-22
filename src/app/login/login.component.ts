import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RecordsService } from '../records.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private rec: RecordsService) { }
  records={}
  ngOnInit() {
  }

  lifecycle(){
    //gets data from recordsservice and puts them as records variable
    
  }

  loginUser(event){
    const target = event.target
    const username = target.querySelector('#username').value
    const password = target.querySelector('#password').value
    this.Auth.login(username,password)
  }
}
