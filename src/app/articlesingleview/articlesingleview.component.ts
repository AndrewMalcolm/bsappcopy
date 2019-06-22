import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-articlesingleview',
  templateUrl: './articlesingleview.component.html',
  styleUrls: ['./articlesingleview.component.css']
})
export class ArticlesingleviewComponent{
  @Input() article: Article;

  ngOnInit(){
    console.log(this.article.id);
    console.log(this.article.title);
  }
}
