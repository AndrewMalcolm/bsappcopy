import { Injectable } from '@angular/core';
import { Pregnantnode } from './pregnantnode';
import { Article } from './article';
import { articlelist } from './articlelist';
import { QueryserviceService } from './queryservice.service';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  nodes: Array<Pregnantnode>;
  nodesPLB: Array<Pregnantnode>;
  checkednodes: Array<Pregnantnode>;
  prefix: string;
  sortedarticlelist: Array<Article>;
  temporarylist: Array<Pregnantnode>;
  temporarylistPLB: Array<Pregnantnode>;
  constructor(private qserv:QueryserviceService) {
    this.sortedarticlelist=this.getsortedarticlelist2();
    this.temporarylist=[];
    this.temporarylistPLB=[];
    this.nodes=[];
    this.nodes=this.createnodes2([],"");
    this.nodesPLB=[];
    this.nodesPLB=this.createnodesPLB([],"");
    this.checkednodes=[];
    for (let i = 0;i <this.nodes.length;i++){
      if(this.nodes[i].checked){
        this.checkednodes.push(this.nodes[i]);
      }
    }
   }

   getnodes(): Array<Pregnantnode> {
     return this.nodes;
   }
   getnodesPLB(): Array<Pregnantnode> {
    return this.nodesPLB;
  }
   getcheckednodes(): Array<Pregnantnode>{
     return this.checkednodes;
   }
   getsortedarticlelist(): Array<Article> {
     this.sortedarticlelist= articlelist.sort((a,b)=>Number(a.id)-Number(b.id));
     return this.sortedarticlelist;
   }
   getsortedarticlelist2(): Array<Article> {
    this.sortedarticlelist= this.qserv.locallist.sort((a,b)=>Number(a.id)-Number(b.id));
    
    return this.sortedarticlelist;
  }
   
   createnodes(tempnodes,prefix): Array<Pregnantnode>{
     //fills the nodes inside the article class with their respective sub-articles
     for (let i = 0; i < articlelist.length; i++){
       //run through articlelist searching for elements (BSID) starting with prefix, and having an empty string behind the next "."
       if(articlelist[i].bsid.startsWith(prefix) && articlelist[i].bsid.split(".").length-1==prefix.split(".").length){
        this.temporarylist[i]= new Pregnantnode(articlelist[i].id,articlelist[i].title,[],[],articlelist[i].bestek,articlelist[i].type,articlelist[i].type);
        tempnodes.push(this.temporarylist[i]);
        this.createnodes(this.temporarylist[i].nodes,articlelist[i].bsid);
       }
     }
     return tempnodes;
   }

   createnodes2(tempnodes,prefix): Array<Pregnantnode>{
    //fills the nodes inside the article class with their respective sub-articles
    for (let i = 0; i < this.qserv.locallist.length; i++){
      //run through articlelist searching for elements (BSID) starting with prefix, and having an empty string behind the next "."
      if(this.qserv.locallist[i].bsid.startsWith(prefix) && (this.qserv.locallist[i].bsid.split(".").length-1)==prefix.split(".").length){
       this.temporarylist[i]= new Pregnantnode(this.qserv.locallist[i].id,this.qserv.locallist[i].title,[],[],this.qserv.locallist[i].bestek,this.qserv.locallist[i].type,this.qserv.locallist[i].format);
       tempnodes.push(this.temporarylist[i]);
       this.createnodes2(this.temporarylist[i].nodes,this.qserv.locallist[i].bsid);
      }
    }
    return tempnodes;
  }

  createnodesPLB(tempnodes,prefix): Array<Pregnantnode>{
    //fills the nodes inside the article class with their respective sub-articles
    for (let i = 0; i < this.qserv.localPLBlist.length; i++){
      //run through articlelist searching for elements (BSID) starting with prefix, and having an empty string behind the next "."
      if(this.qserv.localPLBlist[i].bsid.startsWith(prefix) && (this.qserv.localPLBlist[i].bsid.split(".").length-1)==prefix.split(".").length){
       this.temporarylistPLB[i]= new Pregnantnode(this.qserv.localPLBlist[i].id,this.qserv.localPLBlist[i].title,[],[],this.qserv.localPLBlist[i].bestek,this.qserv.localPLBlist[i].type,this.qserv.localPLBlist[i].format);
       tempnodes.push(this.temporarylistPLB[i]);
       this.createnodesPLB(this.temporarylistPLB[i].nodes,this.qserv.localPLBlist[i].bsid);
      }
    }
    return tempnodes;
  }
  
}
/*
//here you write your nodes or get them from the server
let Subartikel1_2_4_1 = new Pregnantnode('Subartikel 1.2.4.1',[],[]);
let Midartikel1_2_1 = new Pregnantnode('Midartikel 1.2.1',[],[]);
let Midartikel1_2_2 = new Pregnantnode('Midartikel 1.2.2',[],[]);
let Midartikel1_2_4 = new Pregnantnode('Midartikel 1.2.4',[Subartikel1_2_4_1],[]);
let Midartikel1_2_3 = new Pregnantnode('Midartikel 1.2.3',[],[]);
let Hoofdartikel1_2 = new Pregnantnode('Hoofdartikel 1.2',[Midartikel1_2_1,Midartikel1_2_2,Midartikel1_2_3, Midartikel1_2_4],[]);
let Hoofdartikel2_1 = new Pregnantnode('Hoofdartikel 2.1',[],[]);
let Hoofdartikel1_1 = new Pregnantnode('Hoofdartikel 1.1',[],[]);
let Hoofdartikel2_2 = new Pregnantnode('Hoofdartikel 2.2',[],[]);
let Hoofdstuk1 = new Pregnantnode('Hoofdstuk 1',[Hoofdartikel1_1,Hoofdartikel1_2],[]);
let Hoofdstuk2 = new Pregnantnode('Hoofdstuk 2',[Hoofdartikel2_1,Hoofdartikel2_2],[]);
this.nodes = [Hoofdstuk1,Hoofdstuk2];
*/