import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-articleview',
  templateUrl: './articleview.component.html',
  styleUrls: ['./articleview.component.css']
})
export class ArticleviewComponent {
  @Input() articlesarray: Array<Article>;
}
