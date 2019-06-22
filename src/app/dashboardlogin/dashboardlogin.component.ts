import { Component, OnInit } from '@angular/core';
import { User } from '../user'
import { AuthService } from '../auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboardlogin',
  templateUrl: './dashboardlogin.component.html',
  styleUrls: ['./dashboardlogin.component.css']
})
export class DashboardloginComponent implements OnInit {
  
  constructor(public auth: AuthService) { }
  usercurrent: User;
  subscription: Subscription
  ngOnInit() {
    this.auth.getUserDetails().subscribe(usercurrent => this.usercurrent = usercurrent)
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
  //
  ngOnChanges(){
    console.log(this.usercurrent)
  }
}
