import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  query ="curl -G -H \"Accept:application/x-trig\" -d query=INSERT+DATA+%7B%3Chttp%3A%2F%2Fexample%2F2aan%3E+dc%3Atitle+%22pullnaam%22%7D+10 http://localhost:7200/repositories/DBtestclean";
  ROOT_URL="http://localhost:7200/repositories/DBtestclean";
  posts:any;
  word: string;
  constructor(private http: HttpClient) { }
  

  getData(){
    this.posts= this.http.get("http://localhost:7200/sparql?name=&infer=true&sameAs=true&query=INSERT+DATA+%7B+%3Chttp%3A%2F%2Fexample%2Fbook1%3E+dc%3Atitle+%22A+new+book%22%7D%0A").subscribe
  }
}
