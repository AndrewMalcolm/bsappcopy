import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';

@Component({
  selector: 'app-singlecomment',
  templateUrl: './singlecomment.component.html',
  styleUrls: ['./singlecomment.component.css']
})
export class SinglecommentComponent {
  @Input() comment:Comment;
}
