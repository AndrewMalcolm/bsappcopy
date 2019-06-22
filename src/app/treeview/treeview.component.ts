import { Component, Input, OnInit } from '@angular/core';
import { Pregnantnode } from '../pregnantnode';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tree-view',
  templateUrl: './treeview.component.html',
  styleUrls: ['./treeview.component.css']
})
export class TreeviewComponent {
  @Input() nodes: Array<Node>;
  id:string;
  
  constructor(private _route:ActivatedRoute){
    
  }
  ngOnInit() {
    this._route.params.subscribe(params => {
        this.id = params['nodes'];
    });
 }
}
