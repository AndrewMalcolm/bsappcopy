import { Component, OnInit } from '@angular/core';
import { TreeviewComponent } from '../treeview/treeview.component';
import { Pregnantnode } from '../pregnantnode';
import { NodeService } from '../node.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recursivebrowser',
  templateUrl: './recursivebrowser.component.html',
  styleUrls: ['./recursivebrowser.component.css']
})
export class RecursivebrowserComponent implements OnInit {
  nodes:Array<Pregnantnode>
  url:string
  constructor(router:Router,nodeservice:NodeService,_route:ActivatedRoute) { 
    this.url=router.url.toString();
    //here you call your nodes (root articles)
    if (this.url=="/projectlastenboek") {
      this.nodes = nodeservice.getnodesPLB();
    } else {
      this.nodes = nodeservice.getnodes();
    }
    
  }

  ngOnInit() {
  }

}
