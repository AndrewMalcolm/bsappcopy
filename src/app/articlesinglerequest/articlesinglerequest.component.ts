import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';

@Component({
  selector: 'app-articlesinglerequest',
  templateUrl: './articlesinglerequest.component.html',
  styleUrls: ['./articlesinglerequest.component.css']
})
export class ArticlesinglerequestComponent implements OnInit {

  @Input() article: Article;
  constructor() { }

  ngOnInit() {
  }

}
