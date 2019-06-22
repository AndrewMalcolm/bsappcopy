import { Component, OnInit } from '@angular/core';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { userlist } from '../userlist';
import { dummyarticlelist } from '../dummyarticlelist';
import { Comment } from '../comment';
import { commentlist } from '../commentlist';
import { QueryserviceService } from '../queryservice.service';
import { getDefaultService } from 'selenium-webdriver/edge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articlerequest',
  templateUrl: './articlerequest.component.html',
  styleUrls: ['./articlerequest.component.css']
})
export class ArticlerequestComponent implements OnInit {

  id: string;
  bestek: string;
  type: string;
  format: string;
  article:Article;
  officialarticle:Article;
  user: User;
  comment:Comment=commentlist[2];
  changelogtext: string;
  exist: boolean;
  newtype: string;
  constructor(private router: Router, private _route:ActivatedRoute, private qserv:QueryserviceService) { }

  ngOnInit() {
    this._route.params.subscribe(params => {
    this.id = params['id'];});
    this._route.params.subscribe(params => {
    this.bestek = params['bestek'];});
    this._route.params.subscribe(params => {
    this.type = params['type'];});
    this._route.params.subscribe(params => {
    this.format = params['format'];});
    this._route.params.subscribe(params => {
    this.article = this.getbyid3(params['id'],params['bestek'],params['type'],params['format']);});
    this.getchangelog(this.bestek,this.type,this.format,this.id);
    this.getuser();
    this.exist=true;
    this.getofficial(this.id,this.bestek,this.type);
    
  }

  async approve(){
    console.log(this.article.bestek);
    console.log(this.article.id);
    console.log(this.article.type);
    console.log(this.article.format);
    console.log(this.officialarticle.bestek);
    console.log(this.officialarticle.id);
    console.log(this.officialarticle.type);
    console.log(this.officialarticle.format);
    //we have this.officialarticle, we have this.article
    if (this.article.format==="newrequest") { //als volledig nieuw artikel
      this.qserv.updatequery(this.article.bestek,this.article.id,this.article.type,this.article.title,this.article.creator,this.article.description,this.article.language,"accepted");
      //flush this.officialarticle and update with properties of this.article
      this.qserv.flush(this.article.bestek,this.article.id,this.article.type,this.article.format);
      //flush this.article
    } else {


      //nog onderscheid maken tussen nieuwe versie en andere versie!!! eg. als een vertaling w opgeladen moet de officiele niet oldversion worden
      if (this.article.type===this.officialarticle.type) {//dus vernieuwing of update

      for(let i=0;i<20;i++){ //checken of oudere versies bestaan van dit artikel
        const temptype=this.officialarticle.type.toString()+"_oldversion_"+i.toString();
        console.log(temptype);
        const bool=await this.qserv.existcheck(this.officialarticle.bestek, temptype,this.officialarticle.id,this.officialarticle.format);
        console.log(bool);
        if (bool) {
          console.log("if");
          continue
        } else {
          console.log("else");
          this.newtype=this.officialarticle.type.toString()+"_oldversion_"+i.toString();
          break
        }
      }
      console.log(this.newtype);
      this.qserv.updatequery(this.officialarticle.bestek,this.officialarticle.id,this.newtype,this.officialarticle.title,this.officialarticle.creator,this.officialarticle.description,this.officialarticle.language,this.officialarticle.format);
      //create version "old" of this.officialarticle (oldversion+i) with i being the number from 0 to 10, doing existchecks for every old
      this.qserv.flush(this.officialarticle.bestek,this.officialarticle.id,this.officialarticle.type,this.officialarticle.format);
      this.qserv.updatequery(this.article.bestek,this.article.id,this.article.type,this.article.title,this.article.creator,this.article.description,this.article.language,"accepted");
      //flush this.officialarticle and update with properties of this.article
      this.qserv.flush(this.article.bestek,this.article.id,this.article.type,this.article.format);
      //flush this.article
      this.qserv.provgiver(this.article.bestek,this.article.type,"accepted",this.article.id,this.officialarticle.bestek,this.newtype,this.officialarticle.format,this.officialarticle.id);
      } else {
      this.qserv.updatequery(this.article.bestek,this.article.id,this.article.type,this.article.title,this.article.creator,this.article.description,this.article.language,"accepted");
      //flush this.officialarticle and update with properties of this.article
      this.qserv.flush(this.article.bestek,this.article.id,this.article.type,this.article.format);
      this.qserv.provgiver(this.article.bestek,this.article.type,"accepted",this.article.id,this.officialarticle.bestek,this.officialarticle.type,this.officialarticle.format,this.officialarticle.id);
      }
    }
    
  }
  disapprove(){
    this.qserv.flush(this.article.bestek,this.article.id,this.article.type,this.article.format);
    this.router.navigateByUrl('/manager');
    console.log("disapprove succeed");
  }
  keepcurrent(){

  }

  async getofficial(id,bestek,type){ //gives the CURRENT official article
    if (await this.qserv.existcheck(bestek,"official",id,"accepted")) {
      this.officialarticle=this.getbyid3(id,bestek,"official","accepted");
    } else {
      this.officialarticle={bestek:"",id:"",description:"",bsid:"",source:"",language:"",title:"",type:"",creator:"",format:""}
      this.exist=false;
    }
    console.log(this.officialarticle.description);
  }


  getbyid(id:number) :Article{ //OLD!!!!!!! is not in code
    for(let i=0;i<articlelist.length;i++){
      if(Number(articlelist[i].id)==Number(this.id)){
        console.log(articlelist[i].title+articlelist[i].id)
        return articlelist[i];
      }
    }
  }

  getuser(){
    for(let i=0;i<userlist.length;i++){
      if(userlist[i].username==this.article.creator){
        this.user=userlist[i];
      }
    }
  }

  async getchangelog(bestek,type,format,id){
    this.changelogtext=await this.qserv.returnchangelog(bestek,type,format,id);
  }
  getbyid3(id:string,bestek:string,type:string,format:string) :Article{ //gives the request version of the article (code copied from elsewhere, hence the MLB and PLB checks)
    if (format=="accepted") {
      if (bestek=="MLB") {
        for(let i=0;i<this.qserv.locallist.length+1;i++){
          if(this.qserv.locallist[i].id==this.id){
            return this.qserv.locallist[i];
          }}} else {
      if (bestek=="PLB"){
        for(let i=0;i<this.qserv.localPLBlist.length+1;i++){
          if(this.qserv.localPLBlist[i].id==this.id){
            return this.qserv.localPLBlist[i];
          }}}
      }
    } else {
      if (format=="updaterequest") {
        for(let i=0;i<this.qserv.localupdaterequestlist.length+1;i++){
          if(this.qserv.localupdaterequestlist[i].id==this.id && this.qserv.localupdaterequestlist[i].bestek==bestek && this.qserv.localupdaterequestlist[i].type==type){
            return this.qserv.localupdaterequestlist[i];}}}
      if (format=="newrequest") {
        for(let i=0;i<this.qserv.localnewrequestlist.length+1;i++){
          if(this.qserv.localnewrequestlist[i].id==this.id && this.qserv.localnewrequestlist[i].bestek==bestek && this.qserv.localnewrequestlist[i].type==type){
            return this.qserv.localnewrequestlist[i];}}}
          }
    
  }
}
