import { Component, OnInit } from '@angular/core';
import { RecordsService } from '../records.service';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { rdf,rdflib } from 'rdflib';
import { newEngine } from '@comunica/actor-init-sparql';
import {LoggerPretty} from "@comunica/logger-pretty";
import { text, bind } from '@angular/core/src/render3';
import { QueryserviceService } from '../queryservice.service';
import { Article } from '../article';
import { stringify } from '@angular/core/src/util';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  records: any;
  word: any;
  word2: string;
  firstchar: string;
  lastchar:number;
  temp:string;
  templist: Array<Article>;
  article: Article;

  temparticle: Article;

  async filterinfo(event){//filters info for a certain property
    this.word=await this.qserv.filterproperty("MLB","official","0101","dc:language","accepted")
  }

  async listcreator(event){
    if (await this.qserv.existcheck("MLB","official","0001","accepted")) {
      this.word="success";
      await this.qserv.getlist();
    } else{
      this.word="fail";
    }
    
  }

  async cando(event){ //this one is working: describe (giving info)
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe \* where {?s dc:title \"testfilter\"} limit 10");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    let options = { headers:headers, responseType:'text'};
    var url = "http://128.199.58.129:7200/repositories/repo";
    this.word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      console.log(response.toString());
      return response.toString();
    });
  }
  
  async comunica(event){ //this one is working: describe (giving info)
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe \* where {?s dc:title ?o}");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    let options = { headers:headers, responseType:'text'};
    var url = "http://128.199.58.129:7200/repositories/repo";
    this.word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      console.log(response.toString());
      return response.toString();
    });
  }
  
  constructor(private recordservice: RecordsService, private http:HttpClient, private qserv:QueryserviceService) {
   }
   
  insert(event){ //this one is working: Insert/update (changing info)
    const body = "update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Ainsert+data+%7B%3Chttp%3A%2F%2Fexample%2Ftestartikel2%3E+dc%3Atitle+%220011+testartikel%22%7D%3B%0A";
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    return this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { console.log(response.toString())});//here is no response, it is null, so this is giving the error, but not lethal at least :p
  }

  shower(event){ //this one is working: describe (giving info)
    this.qserv.updatequery("PLB","0006","official","testfilterPLB0006","creator","eeooeeoeooo","English","accepted");
  }

  rdtest(event){
    this.qserv.flush("PLB","0007.000","official","updaterequest");
  }

  async dingske(){
    var tempuri="<http://example/PLB/official/accepted/0010>"
    var tempresult=await this.qserv.describequery(tempuri);
    var altarticles=[];
    //uit tempresult alle uris krijgen die provalt hebben
    var count = (tempresult.match(/prov:alternateof/g) || []).length;
    for(let i=0;i<count;i++){
      console.log(i);
      console.log(tempresult);
      for(let j=0; j<120;j++){
        if(tempresult.slice(tempresult.search("prov:alternateof")-j,tempresult.search("prov:alternateof")).includes("<http://example")){
          var firstchar=tempresult.search("prov:alternateof")-j;
          var lastchar=tempresult.slice(firstchar).search("prov:alternateof")-1;
          var firsturi=tempresult.slice(firstchar,firstchar+lastchar);
          console.log(firsturi);
          var firstarticle=await this.getbyuri(firsturi); //eerste uri vinden en getbyidalt doen en uitkomend artikel toevoegen aan lokale artikellijst
          altarticles.push(firstarticle); //segment van provs weghalen uit stringy en loop opnieuw
          var endchar=tempresult.slice(firstchar+lastchar+23).search("<http://example");
          var lengthy=firstchar+lastchar+23+endchar;
          console.log(tempresult.slice(firstchar,lengthy));
          tempresult=tempresult.slice(0,firstchar)+tempresult.slice(lengthy);
          break;}}
      
    }
    console.log(altarticles[0].type);
    console.log(altarticles[1].type);
    console.log(altarticles[2].type);
  }

  async getbyuri(uri:string){ //takes elements of the uri and returns a local article with properties
    var stringy = await this.qserv.describequery(uri)
    var tempid=this.qserv.filterfor(stringy,"dc:identifier");
    console.log(tempid);
    if(uri.includes("PLB")){
      var tempbestek="PLB";
    }else{var tempbestek="MLB"}
    console.log(tempbestek);
    var tempdescription=this.qserv.filterfor(stringy,"dc:description");console.log(tempdescription);
    var tempformat=this.qserv.filterfor(stringy,"dc:format");console.log(tempformat);
    var templanguage=this.qserv.filterfor(stringy,"dc:language");console.log(templanguage);
    var temptitle=this.qserv.filterfor(stringy,"dc:title");console.log(temptitle);
    var temptype=this.qserv.filterfor(stringy,"dc:type");console.log(temptype);
    var tempcreator=this.qserv.filterfor(stringy,"dc:creator");console.log(tempcreator);
    var tempbsid1=tempid.toString().slice(0,2)+".";
          if(tempid.toString().slice(2,4) !="00" && tempid.toString().slice(2,4) !=""){
            var tempbsid2=tempid.toString().slice(2,4)+".";
            if(tempid.toString().slice(4,6) !="00" && tempid.toString().slice(4,6) !=""){
              var tempbsid3=tempid.toString().slice(4,6)+".";
            }else{ var tempbsid3="";}
          }else{
            var tempbsid2="";
            var tempbsid3="";
          }
          var tempbsid =tempbsid1+tempbsid2+tempbsid3;console.log(tempbsid);
    this.temparticle={id: tempid,bestek:tempbestek,description:tempdescription,format:tempformat,language:templanguage,title:temptitle,type:temptype,creator:tempcreator,bsid:tempbsid,source:"0"}
    return this.temparticle;
  }

  
  ngOnInit() {
    this.records = this.recordservice.getData();
    this.article={id:"0010",bestek:"PLB",bsid:"00.10.",language:"English",description:"allUYGeyEBEBHBEHJEH JEJVHVHJEEHJV",format:"accepted",title:"testfilterPLB0010NIEUW",creator:"Sam Vanhee",type:"official_oldversion_2",source:"0"};
  }

  async filterinfoalternate(){
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe <http://example/PLB/official/accepted/0010>");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    var url = "http://128.199.58.129:7200/repositories/repo";
    this.word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    console.log(this.word.toString());
    this.trial(this.word);
    return this.word;

  }

  trial(response:string){ //moet in qserv komen en opgeroepen aan start (ook versie maken voor newrequestlist)
    var localito=response.split("http://example");
    console.log(localito[1]);
    for(let i = 1; i < localito.length; i++){
      var tempid=this.filterfor(localito[i],"dc:identifier");
      var tempbestek=localito[i].slice(1,localito[i].substr(1,localito[i].length-1).indexOf("/")+1);
      var tempdescription=this.filterfor(localito[i],"dc:description");
      var tempformat=this.filterfor(localito[i],"dc:format");
      var templanguage=this.filterfor(localito[i],"dc:language");
      var temptitle=this.filterfor(localito[i],"dc:title");
      var temptype=this.filterfor(localito[i],"dc:type");
      var tempcreator=this.filterfor(localito[i],"dc:creator");
          var tempbsid1=tempid.toString().slice(0,2)+".";
          if(tempid.toString().slice(2,4) !="00" && tempid.toString().slice(2,4) !=""){
            var tempbsid2=tempid.toString().slice(2,4)+".";
            if(tempid.toString().slice(4,6) !="00" && tempid.toString().slice(4,6) !=""){
              var tempbsid3=tempid.toString().slice(4,6)+".";
            }else{ var tempbsid3="";}
          }else{
            var tempbsid2="";
            var tempbsid3="";
          }
      var tempbsid =tempbsid1+tempbsid2+tempbsid3;
      this.temparticle={id: tempid,bestek:tempbestek,description:tempdescription,format:tempformat,language:templanguage,title:temptitle,type:temptype,creator:tempcreator,bsid:tempbsid,source:"0"}
      console.log(this.temparticle.bestek);
      this.qserv.localupdaterequestlist.push(this.temparticle);
    }
  }

  filterfor(stringy,property){
    var firstchar=stringy.search(property.toString());
    firstchar=firstchar + property.toString().length + 2;
    var temp=stringy.slice(firstchar);
    var lastchar=temp.search("dc:")-7;
    var endresult=temp.substring(0,lastchar);
    if (endresult=="") {
      var lastchars=temp.search("\" .");
      var endresult=temp.substring(0,lastchars);
      console.log(endresult);
    }
    return endresult
  }
  
  
}

