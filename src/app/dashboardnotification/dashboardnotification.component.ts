import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { Role } from '../role';
import { roleslist } from '../roleslist';
import { userlist } from '../userlist';
import { User } from '../user';
import { QueryserviceService } from '../queryservice.service';

@Component({
  selector: 'app-dashboardnotification',
  templateUrl: './dashboardnotification.component.html',
  styleUrls: ['./dashboardnotification.component.css']
})
export class DashboardnotificationComponent implements OnInit {
  newarticleslist:Array<Article>;
  updatearticleslist:Array<Article>;
  newcommentlist:Array<Comment>;

  constructor(qserv:QueryserviceService) {
    this.newarticleslist=qserv.localnewrequestlist;
    this.updatearticleslist=qserv.localupdaterequestlist;
    this.newcommentlist=[];//aanpassen eens comments gebeurt is
  }
  
  ngOnInit() {
  }

}
