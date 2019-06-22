import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { Subscription } from 'rxjs';
import { Pregnantnode } from '../pregnantnode';
import { RecursivebrowserComponent } from '../recursivebrowser/recursivebrowser.component';
import { NodeService } from '../node.service';
import { QueryserviceService } from '../queryservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboardbrowser',
  templateUrl: './dashboardbrowser.component.html',
  styleUrls: ['./dashboardbrowser.component.css']
})
export class DashboardbrowserComponent implements OnInit {
  nodes:Array<any>;
  refreshed:boolean;
  constructor(nodeservice:NodeService, private qserv:QueryserviceService) {
    
    
  }

  openall(nodes:Array<any>){
    for (let pregnantnode of nodes){
      pregnantnode.expanded=true;
      this.openall(pregnantnode.nodes);
    }
  }
    
  closeall(nodes:Array<any>){
    for (let pregnantnode of nodes){
      pregnantnode.expanded=false;
      this.closeall(pregnantnode.nodes);
    }
  }

  loadTable(){

  }
  
  ngOnInit() {
    this.loadTable();
    addEvents();
    
  }

  async refresh(){
    this.refreshed=false;
    await this.qserv.getlist();
    this.refreshed=true;
  }

}
function addEvents(){
  var toggler = document.getElementsByClassName("caret");
  var i;
  for (i = 0; i <toggler.length; i++) {
    toggler[i].addEventListener("click",function() {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
}

