import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Article } from '../article';
import { articlelist } from '../articlelist';
import { QueryserviceService } from '../queryservice.service';

@Component({
  selector: 'app-articleviewer',
  templateUrl: './articleviewer.component.html',
  styleUrls: ['./articleviewer.component.css']
})
export class ArticleviewerComponent implements OnInit {
  id:string;
  bestek:string;
  type:string;
  format:string;
  article:Article;
  temparticle: Article;
  startapp=false;
  constructor(private _route:ActivatedRoute, private qserv:QueryserviceService) {
    
   }

  async ngOnInit() {
    this._route.params.subscribe(params => {
    this.id = params['id'];});
    this._route.params.subscribe(params => {
    this.bestek = params['bestek'];});
    this._route.params.subscribe(params => {
    this.type = params['type'];});
    this._route.params.subscribe(params => {
    this.format = params['format'];});
    if (this.type=="official") {
      this._route.params.subscribe(params => {
      this.article = this.getbyid3(params['id'],params['bestek'],params['type'],params['format']);});
    } else {
      this.article = await this.getbyidalternate(this.id,this.bestek,this.type,this.format);
      
    }this.startapp=true;}
    
  
  async refresh(){
    this.qserv.flushlist();
    await this.qserv.localarticlelist("MLB","official","accepted");
  }

  getbyid(id:string) :Article{
    for(let i=0;i<articlelist.length;i++){
      if(articlelist[i].id==this.id){
        console.log(articlelist[i].id);
        console.log(articlelist[i].title);
        return articlelist[i];
      }
    }
  }
  getbyid2(id:string) :Article{
    for(let i=0;i<this.qserv.locallist.length+1;i++){
      if(this.qserv.locallist[i].id==this.id){
        console.log(this.qserv.locallist[i].title+articlelist[i].id)
        return this.qserv.locallist[i];
      }
    }
  }

  async getbyidalternate(id:string,bestek:string,type:string,format:string){
    var uri ="<http://example/"+bestek+"/"+type+"/"+format+"/"+id+">";
    var stringy = await this.qserv.describequery(uri)
    console.log(stringy);
    var tempid=this.qserv.filterfor(stringy,"dc:identifier");
    console.log(tempid);
    var tempbestek=bestek;console.log(tempbestek);
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


  getbyid3(id:string,bestek:string,type:string,format:string){
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
          }}

}
