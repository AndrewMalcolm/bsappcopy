import { Component, OnInit } from '@angular/core';
import { articlelist } from '../articlelist';
import { Article } from '../article';
import { TreeviewComponent } from '../treeview/treeview.component';
import { Pregnantnode } from '../pregnantnode';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-plb',
  templateUrl: './plb.component.html',
  styleUrls: ['./plb.component.css']
})
export class PlbComponent implements OnInit {
  newlist: Array<Article>;
  checkednodes: Array<Pregnantnode>;
  constructor(nodeservice: NodeService) { 
    this.checkednodes = nodeservice.getcheckednodes();
    this.newlist=[];
    for (let i = 0;i<this.checkednodes.length;i++){
      this.newlist.push(this.checkednodes[i].getarticle());
      this.newlist.sort((a,b)=>Number(a.id)-Number(b.id));
      
    }
  }
  ngOnInit() {
  }

}
