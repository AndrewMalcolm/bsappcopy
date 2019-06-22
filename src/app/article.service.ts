import { Injectable } from '@angular/core';
import { Article } from './article';
import { articlelist } from './articlelist';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Pregnantnode } from './pregnantnode';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private currentlist : Article[];
  private usersource = new BehaviorSubject<Article[]>(this.currentlist)
  currentshowlist = this.usersource.asObservable();

  constructor() { }

  getArticleList(): Observable<Article[]>{
    return this.currentshowlist;
  }

  organiseTable(){
    for (let i = 0; i < articlelist.length; i++){

    }
  }

  loadTable(){
    
  }
}
