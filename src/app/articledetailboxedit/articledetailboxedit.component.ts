import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { commentlist } from '../commentlist';
import { Comment } from '../comment';

@Component({
  selector: 'app-articledetailboxedit',
  templateUrl: './articledetailboxedit.component.html',
  styleUrls: ['./articledetailboxedit.component.css']
})
export class ArticledetailboxeditComponent {

  @Input() article: Article;
  openforum:boolean=false;
  opencommenteditor:boolean=false;
  buttonname:string="V";
  articlecomments: Array<Comment>=commentlist; //temporary fix, refreshcommands does not seem to work as intended.

  refreshcomments(){
    for(let i=0;i<commentlist.length;i++){
      if(commentlist[i].article.id==this.article.id){
        this.articlecomments.push(commentlist[i]);
      }
    }
  }
  
  showcomments(){
    this.openforum=!this.openforum;
    if (this.openforum){
      this.buttonname="V";
    } else{
      this.buttonname="^"
    }
  }
  showcommentinput(){
    this.opencommenteditor=!this.opencommenteditor;
  }
}
