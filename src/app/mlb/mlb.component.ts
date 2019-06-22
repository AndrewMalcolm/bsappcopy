import { Component, OnInit } from '@angular/core';
import { articlelist } from '../articlelist';
import { Article } from '../article';

@Component({
  selector: 'app-mlb',
  templateUrl: './mlb.component.html',
  styleUrls: ['./mlb.component.css']
})
export class MlbComponent implements OnInit {
  newlist: Array<Article>;
  constructor() { 
    this.newlist = articlelist.sort((a,b)=>Number(a.id)-Number(b.id));
  }


  ngOnInit() {
  }

}
