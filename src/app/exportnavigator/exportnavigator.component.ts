import { Component, OnInit } from '@angular/core';
import { articlelist } from '../articlelist';

@Component({
  selector: 'app-exportnavigator',
  templateUrl: './exportnavigator.component.html',
  styleUrls: ['./exportnavigator.component.css']
})
export class ExportnavigatorComponent implements OnInit {
plblength: number;
mlblength: number;
  constructor() {
    this.mlblength=articlelist.length;
    this.plblength=0;
  }

  ngOnInit() {
  }

}
