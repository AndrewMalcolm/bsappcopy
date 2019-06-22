import { Component, OnInit } from '@angular/core';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { Role } from '../role';
import { roleslist } from '../roleslist';
import { userlist } from '../userlist';
import { User } from '../user';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { QueryserviceService } from '../queryservice.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  newcommentamount:string;
  newcommentlist:Array<Comment>=commentlist;
  newarticlesamount:string;
  newarticleslist:Array<Article>;
  updatearticlesamount: string;
  updatearticleslist:Array<Article>;
  temporaryfixcomment:Comment=commentlist[2];
  newroleslist:Array<Role>=roleslist;
  newuserslist:Array<User>=userlist;
  constructor(qserv:QueryserviceService) { 
    this.newarticleslist=qserv.localnewrequestlist;
    this.updatearticleslist=qserv.localupdaterequestlist;
    console.log(this.updatearticleslist[1].description);
    this.newcommentamount=commentlist.length.toString();
    //update later with a system that controls last login date with comment date to see if comments are actually new
    this.newarticlesamount=this.newarticleslist.length.toString();
    this.updatearticlesamount=this.updatearticleslist.length.toString();
  }

  ngOnInit() {
    
  }

}
