import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { QueryserviceService } from '../queryservice.service';
import { commentlist } from '../commentlist';
import { Comment } from '../comment';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-articleedit',
  templateUrl: './articleedit.component.html',
  styleUrls: ['./articleedit.component.css']
})
export class ArticleeditComponent implements OnInit {

  id: string;
  bestek: string;
  type: string;
  format: string;
  article:Article;
  localarticle:Article;
  openforum:boolean=false;
  opencommenteditor:boolean=false;
  buttonname:string="V";
  localdescription: string;
  localbestek: string;
  locallanguage: string;
  localbsid: string;
  localcreator: string;
  localtitle: string;
  localtype: string;
  localid: string;
  localsource: string;
  localformat: string;
  localchangelog: string;
  refreshed: boolean;

  articlecomments: Array<Comment>=commentlist; //temporary fix, refreshcommands does not seem to work as intended.
  constructor(private _route:ActivatedRoute,private qserv:QueryserviceService,private auth:AuthService) { }

  ngOnInit() {
    this.refreshed=false;
    this._route.params.subscribe(params => {
    this.id = params['id'];});
    this._route.params.subscribe(params => {
    this.bestek = params['bestek'];});
    this._route.params.subscribe(params => {
    this.type = params['type'];});
    this._route.params.subscribe(params => {
    this.format = params['format'];});
    if (this.id==="" && this.bestek==="" && this.type==="" && this.format==="") {
      this.article={id:"",bestek:"",type:"",title:"",format:"",bsid:"",language:"",description:"",creator:"",source:""};
    } else {
      this._route.params.subscribe(params => {
    this.article = this.getbyid3(params['id'],params['bestek'],params['type'],params['format']);});
    }
    
    this.localchangelog="";
    this.flushlocal();
  }

  async updaterequest(){//method die alle lokale info verzamelt in een updatequery op de qserv-> format= updaterequest (zodat manager vergelijkversie krijgt)
    this.alerter();
    console.log(this.localbsid.replace(".","").replace(".","")+"0000".slice(0,4-this.localbsid.replace(".","").replace(".","").length))
    await this.qserv.updatequery(this.localbestek,this.makeid(this.localbsid),this.localtype,this.localtitle,this.localcreator,this.localdescription,this.locallanguage,"updaterequest");
    await this.qserv.createchangelog(this.localbestek,this.localtype,"updaterequest",this.localid,this.localchangelog);
    console.log("done:"+this.localdescription);
    this.refreshed=true;
  }

  async newrequest(){//zelfde, maar-> format= newrequest (voor nieuwe versies enzo)
    await this.qserv.updatequery(this.localbestek,this.makeid(this.localbsid),this.localtype,this.localtitle,this.localcreator,this.localdescription,this.locallanguage,"newrequest");
    await this.qserv.createchangelog(this.localbestek,this.localtype,"newrequest",this.localid,this.localchangelog);
    console.log("done:"+this.localdescription);
    this.refreshed=true;
  }

  alerter(){
    console.log(this.localbestek);
    console.log(this.localid);
    console.log(this.localtype);
    console.log(this.localtitle);
    console.log(this.localcreator);
    console.log(this.localdescription);
    console.log(this.locallanguage);
  }

  //al deze methods in qserv steken
  
  makeid(id){
    var endid=id.replace(".","").replace(".","")+"0000".slice(0,4-id.replace(".","").replace(".","").length)
    return endid;
  }

  flushlocal(){
    this.localdescription=this.article.description;
    this.localbestek=this.article.bestek;
    this.locallanguage=this.article.language;
    this.localbsid=this.article.bsid;
    this.localcreator=this.auth.currentuser.username;
    this.localtitle=this.article.title,
    this.localtype=this.article.type;
    this.localid=this.article.id;
    this.localsource=this.article.source;
    this.localformat=this.article.format;
  }
  getbyid2(id:string) :Article{
    for(let i=0;i<this.qserv.locallist.length+1;i++){
      if(this.qserv.locallist[i].id==this.id){
        console.log(this.qserv.locallist[i].title+articlelist[i].id)
        return this.qserv.locallist[i];
      }
    }
  }

  getbyid3(id:string,bestek:string,type:string,format:string) :Article{
    if (bestek=="MLB") {
      for(let i=0;i<this.qserv.locallist.length+1;i++){
        if(this.qserv.locallist[i].id==this.id){
          console.log(this.qserv.locallist[i].title+articlelist[i].id)
          return this.qserv.locallist[i];
        }
      }
    } else {
    if (bestek=="PLB"){
      for(let i=0;i<this.qserv.localPLBlist.length+1;i++){
        if(this.qserv.localPLBlist[i].id==this.id){
          console.log(this.qserv.localPLBlist[i].title+articlelist[i].id)
          return this.qserv.localPLBlist[i];
          }
        }
      }
    }
    
  }

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
    console.log(this.localdescription);
  }
  showcommentinput(){
    this.opencommenteditor=!this.opencommenteditor;
  }
}
