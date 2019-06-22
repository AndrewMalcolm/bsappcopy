import { Component, OnInit } from '@angular/core';
import { HighlightDelayBarrier } from 'blocking-proxy/built/lib/highlight_delay_barrier';
import { Router } from '@angular/router';
import { QueryserviceService } from '../queryservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public show:boolean = true;
  public buttonName:string = "Hide browser";

  constructor(private router: Router,private qserv:QueryserviceService) {
    if(router.url==='http://localhost:4200/userinfo'){
      this.show=false;
    }
    console.log(router.url)
   }
  ngOnInit() {
    
  }

  hidebrowser(){
    this.show=!this.show;
    if (this.show){
      this.buttonName="Hide browser";
    }
    else{
      this.buttonName="Show browser";
    }
  }
}
