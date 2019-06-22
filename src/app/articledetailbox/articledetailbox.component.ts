import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { commentlist } from '../commentlist';
import { Comment } from '../comment';
import { QueryserviceService } from '../queryservice.service';

@Component({
  selector: 'app-articledetailbox',
  templateUrl: './articledetailbox.component.html',
  styleUrls: ['./articledetailbox.component.css']
})
export class ArticledetailboxComponent {
  @Input() article: Article;
  openforum:boolean=false;
  opencommenteditor:boolean=false;
  buttonname:string="V";
  temparticle: Article;
  altarticles: Array<Article>;
  articlecomments: Array<Comment>=commentlist; //temporary fix, refreshcommands does not seem to work as intended.
  constructor(private qserv:QueryserviceService) { }

  refreshcomments(){
    for(let i=0;i<commentlist.length;i++){
      if(commentlist[i].article.id==this.article.id){
        this.articlecomments.push(commentlist[i]);
      }
    }
  }

  getthisid(){
    return this.article.id.toString();
  }
  getthisbestek(){
    return this.article.bestek.toString();
  }
  getthistype(){
    return this.article.type.toString();
  }
  getthisformat(){
    return this.article.format.toString();
  }

  async ohnoes(){
    await this.qserv.flush(this.getthisbestek(),this.getthisid(),this.getthistype(),this.getthisformat());
    console.log("ohnoes");
  }
  
  async showcomments(){
    if (this.openforum==true) { //simply closes the alternateversions
      this.openforum=!this.openforum;
    } else { //first an await for a describequery and its results, then open alternateversions
      var thisuri="<http://example/"+this.getthisbestek()+"/"+this.getthistype()+"/"+this.getthisformat()+"/"+this.getthisid()+">"
      await this.dingske(thisuri);

      //here altarticles gets created as well as an array of the alternate articles
      this.openforum=!this.openforum;
    }
    if (this.openforum){
      this.buttonname="V";
    } else{
      this.buttonname="^"
    }
  }
  showcommentinput(){
    this.opencommenteditor=!this.opencommenteditor;
  }

  async dingske(tempuri){ //functie die uit een URI van een officieel artikel de verschillende alternatieve versies geeft in een article array
    this.altarticles=[];
    var tempresult=await this.qserv.describequery(tempuri);
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
          this.altarticles.push(firstarticle); //segment van provs weghalen uit stringy en loop opnieuw
          var endchar=tempresult.slice(firstchar+lastchar+23).search("<http://example");
          var lengthy=firstchar+lastchar+23+endchar;
          console.log(tempresult.slice(firstchar,lengthy));
          tempresult=tempresult.slice(0,firstchar)+tempresult.slice(lengthy);
          break;}}
      
    }
    this.altarticles.splice(1,1);
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
}
