import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Article } from './article';


//belangrijk, de input van lijsten worden bepaald door flat values, dus die moet ik nog veranderen voor de jury!!!!

























@Injectable({
  providedIn: 'root'
})
export class QueryserviceService {

  locallist:Array<Article>; //deze zal articlelist.ts vervangen
  localPLBlist: Array<Article>; //deze zal articlelist.ts vervangen wanneer op de PLB pagina
  localalternatelist:Array<Article>; //dit is een lokale lijst die alle nodes bevat met prov:alternateOf relaties (die eenzelfde BSID hebben)
  localupdaterequestlist:Array<Article>;//lokale lijst voor alle article requests voor artikels die al bestaan
  localnewrequestlist:Array<Article>;//lokale lijst voor article requests die niet bestaan
  //localCommentlist: Array<ArticleComment>; //dit is een lokale lijst van alle 'comment' nodes, de ArticleComment class moet nog worden gemaakt
  localchangeloglist: Array<String>;
  temparticle:Article;
  temparticle2:Article;
  propertylist=["identifier", "title", "type", "creator", "description", "language"]; //source toevoegen->identifier van source
  
  constructor(private http:HttpClient) {
    this.localupdaterequestlist=[];
    this.localnewrequestlist=[];
  }
  async describequery(uri){
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> prefix prov: <http://www.w3.org/ns/prov#> describe "+uri+" ");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    var url = "http://128.199.58.129:7200/repositories/repo";
    var word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    return word.toString();
  }

  provgiver(bestek,type,format,identifier,bestekoud,typeoud,formatoud,identifieroud){ //geeft een provalt relatie aan oude artikel (of andere versie) naar de officiele versie
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const qbody="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestekoud+"%2F"+typeoud+"%2F"+formatoud+"%2F"+identifieroud+"%3E+prov%3Aalternateof+%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E%7D%0A";
    const body= qprefixes+qbody;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
  }

  async createchangelog(bestek, type, format, identifier, changelog){
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const qbody = "insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%2Fchangelog%3E+dc%3Adescription+%22"+changelog+"%22%7D%3B%0A";;
    const body= qprefixes+qbody;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
  }

  async deletechangelog(bestek, type, format, identifier){
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const delidentifier="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%2Fchangelog%3E+dc%3Adescription+%3Fo%3B+dc%3Adescription+%3Fo%7D%3B%0A";
    const body= qprefixes+delidentifier;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
  }

  async returnchangelog(bestek,type,format,identifier){
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe <http://example/"+bestek+"/"+type+"/"+format+"/"+identifier+"/changelog>");
    
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    var url = "http://128.199.58.129:7200/repositories/repo";
    var word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    var changelogtext=await this.filterfor(word,"dc:description");
    return changelogtext;
  }

  async createnewlist(){
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe \* where {?s dc:format \"newrequest\"} limit 100");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    var url = "http://128.199.58.129:7200/repositories/repo";
    var word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    this.trial(word,this.localnewrequestlist);
    return word;
  }

  async createupdatelist(){
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe \* where {?s dc:format \"updaterequest\"} limit 100");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    var url = "http://128.199.58.129:7200/repositories/repo";
    var word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    this.trial(word,this.localupdaterequestlist);
    return word;
  }

  trial(response:string, list:Array<Article>){ //moet in qserv komen en opgeroepen aan start (ook versie maken voor newrequestlist)
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
      this.temparticle2={id: tempid,bestek:tempbestek,description:tempdescription,format:tempformat,language:templanguage,title:temptitle,type:temptype,creator:tempcreator,bsid:tempbsid,source:"0"}
      console.log(this.temparticle2.bestek);
      list.push(this.temparticle2);
    }
  }

  filterfor2(stringy,property){
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

  filterfor(stringy,property){
    if(stringy.includes("http://www.w3.org/ns/prov#alternateof")){
      for(let i=0;i<10;i++){
        stringy=this.provkiller(stringy);
      }
      console.log("HEY");
      console.log(stringy);
    }
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
    if (endresult.includes("http://example")){
      if (endresult.includes("\" .")) {
        var lastchars=temp.search("\" .");
        var endresult=temp.substring(0,lastchars);
      } else {
        var lastchars=temp.search("prov:alternateof");
        var endresult=temp.substring(0,lastchars-3);
      }
      
    }
    return endresult
  }

  provkiller(stringy):String{
    if(stringy.includes("http://www.w3.org/ns/prov#alternateof")){
    for(let i = 12; i < 120; i++){
      if(stringy.slice(stringy.search("http://www.w3.org/ns/prov#alternateof")-i,stringy.search("http://www.w3.org/ns/prov#alternateof")).includes("<http://example")){
        var firstchar=stringy.search("http://www.w3.org/ns/prov#alternateof")-i;
        for(let i= 12; i < 400; i++){
          if(stringy.slice(stringy.search("http://www.w3.org/ns/prov#alternateof"),stringy.search("http://www.w3.org/ns/prov#alternateof")+i).includes("/accepted/")){
            var lastchar=stringy.search("http://www.w3.org/ns/prov#alternateof")+i+7;
            break;}}
        stringy= stringy.replace(stringy.slice(firstchar,lastchar),"");
        break;}}
        return stringy;
      } else {
        if(stringy.includes("prov:alternateof")){
        for(let i = 12; i < 120; i++){
         if(stringy.slice(stringy.search("prov:alternateof")-i,stringy.search("prov:alternateof")).includes("<http://example")){
          var firstchar=stringy.search("prov:alternateof")-i;
          for(let i= 12; i < 400; i++){
            if(stringy.slice(stringy.search("prov:alternateof"),stringy.search("prov:alternateof")+i).includes("/accepted/")){
            var lastchar=stringy.search("prov:alternateof")+i+7;
            break;}}
        stringy= stringy.replace(stringy.slice(firstchar,lastchar),"");
        break;}}
        return stringy;
      } else {return stringy;}
        }
  }
  
  

  async getlist(){
    //method bij opstarten om lokale MLB lijst aan te maken
    await this.localarticlelist("MLB","official","accepted");//aanvullen met lokale lijsten voor PLB en andere versies
  }

  flushlist(){
    //ledigt lokale lijst
    this.locallist=[];
  }

  async localarticlelist(bestek,type,format){ //listtofill is the initial locallist
    this.locallist=[];
    for (let i = 0; i < 120; i++){
      var tempid="0".repeat(4-i.toString().length)+i.toString(); //change to 6-... later //door de dc:properties van de RDF node gaan en de waarden invullen in lokale parameters
      console.log(tempid);
      if (await this.existcheck(bestek,type,tempid,format)) {//vinden van de RDF node met i als dc:identifier in het bepaalde type en bestek
        console.log("yes");
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
        var temptitle = await this.filterproperty(bestek,type,tempid,"dc:title",format);
        var templanguage= await this.filterproperty(bestek,type,tempid,"dc:language",format);
        var tempdescription= await this.filterproperty(bestek,type,tempid,"dc:description",format);
        var tempbestek = bestek;
        var temptype = type;
        var tempcreator= await this.filterproperty(bestek,type,tempid,"dc:creator",format);
        var tempsource: "0"; //dc:source->dc:identifier van source
        var tempformat = await this.filterproperty(bestek,type,tempid,"dc:format",format);
        console.log(tempid);
        this.temparticle={id:tempid,bsid:tempbsid,title:temptitle,language:templanguage,description:tempdescription,bestek:tempbestek,type:temptype,creator:tempcreator,source:tempsource,format:tempformat}
        //lokale parameters invullen in een nieuwe lokale 'Article'-klasse
        this.locallist.push(this.temparticle);
        //nieuwe lokale 'Article'-klasse invoeren in lokale artikellijst dmv push
        //herbeginnen van de cyclus tot 999999
        }
        if(i==120){
          return true;
        }
      }
    }

    async localarticlePLBlist(bestek,type,format){ //listtofill is the initial locallist
      this.localPLBlist=[];
      for (let i = 0; i < 20; i++){
        var tempid="0".repeat(4-i.toString().length)+i.toString(); //change to 6-... later //door de dc:properties van de RDF node gaan en de waarden invullen in lokale parameters
        console.log(tempid);
        if (await this.existcheck(bestek,type,tempid,format)) {//vinden van de RDF node met i als dc:identifier in het bepaalde type en bestek
          console.log("yes");
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
          var temptitle = await this.filterproperty(bestek,type,tempid,"dc:title",format);
          var templanguage= await this.filterproperty(bestek,type,tempid,"dc:language",format);
          var tempdescription= await this.filterproperty(bestek,type,tempid,"dc:description",format);
          var tempbestek = bestek;
          var temptype = type;
          var tempcreator= await this.filterproperty(bestek,type,tempid,"dc:creator",format);
          var tempsource: "0"; //dc:source->dc:identifier van source
          var tempformat = await this.filterproperty(bestek,type,tempid,"dc:format",format);
          console.log(tempformat);
          this.temparticle={id:tempid,bsid:tempbsid,title:temptitle,language:templanguage,description:tempdescription,bestek:tempbestek,type:temptype,creator:tempcreator,source:tempsource,format:tempformat}
          //lokale parameters invullen in een nieuwe lokale 'Article'-klasse
          this.localPLBlist.push(this.temparticle);
          //nieuwe lokale 'Article'-klasse invoeren in lokale artikellijst dmv push
          //herbeginnen van de cyclus tot 999999
          }
          if(i==20){
            return true;
          }
        }
      }
      async localarticlealternatelist(bestek,type,format){ //listtofill is the initial locallist
        this.localalternatelist=[];
        for (let i = 0; i < 20; i++){
          var tempid="0".repeat(4-i.toString().length)+i.toString(); //change to 6-... later //door de dc:properties van de RDF node gaan en de waarden invullen in lokale parameters
          console.log(tempid);
          if (await this.existcheck(bestek,type,tempid,format)) {//vinden van de RDF node met i als dc:identifier in het bepaalde type en bestek
            console.log("yes");
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
            var temptitle = await this.filterproperty(bestek,type,tempid,"dc:title",format);
            var templanguage= await this.filterproperty(bestek,type,tempid,"dc:language",format);
            var tempdescription= await this.filterproperty(bestek,type,tempid,"dc:description",format);
            var tempbestek = bestek;
            var temptype = type;
            var tempcreator= await this.filterproperty(bestek,type,tempid,"dc:creator",format);
            var tempsource: "0"; //dc:source->dc:identifier van source
            var tempformat = await this.filterproperty(bestek,type,tempid,"dc:format",format);
            console.log(tempid);
            this.temparticle={id:tempid,bsid:tempbsid,title:temptitle,language:templanguage,description:tempdescription,bestek:tempbestek,type:temptype,creator:tempcreator,source:tempsource,format:tempformat}
            //lokale parameters invullen in een nieuwe lokale 'Article'-klasse
            this.localalternatelist.push(this.temparticle);
            //nieuwe lokale 'Article'-klasse invoeren in lokale artikellijst dmv push
            //herbeginnen van de cyclus tot 999999
            }
            if(i==20){
              return true;
            }
          }
        }
        async localarticlenewrequestlist(bestek,type,format){ //listtofill is the initial locallist
          this.localnewrequestlist=[];
    for (let i = 0; i < 120; i++){
      var tempid="0".repeat(4-i.toString().length)+i.toString(); //change to 6-... later //door de dc:properties van de RDF node gaan en de waarden invullen in lokale parameters
      console.log(tempid);
      if (await this.existcheck(bestek,type,tempid,format)) {//vinden van de RDF node met i als dc:identifier in het bepaalde type en bestek
        console.log("yes");
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
        var temptitle = await this.filterproperty(bestek,type,tempid,"dc:title",format);
        var templanguage= await this.filterproperty(bestek,type,tempid,"dc:language",format);
        var tempdescription= await this.filterproperty(bestek,type,tempid,"dc:description",format);
        var tempbestek = bestek;
        var temptype = type;
        var tempcreator= await this.filterproperty(bestek,type,tempid,"dc:creator",format);
        var tempsource: "0"; //dc:source->dc:identifier van source
        var tempformat = await this.filterproperty(bestek,type,tempid,"dc:format",format);
        console.log(tempid);
        this.temparticle={id:tempid,bsid:tempbsid,title:temptitle,language:templanguage,description:tempdescription,bestek:tempbestek,type:temptype,creator:tempcreator,source:tempsource,format:tempformat}
        //lokale parameters invullen in een nieuwe lokale 'Article'-klasse
        this.localnewrequestlist.push(this.temparticle);
        //nieuwe lokale 'Article'-klasse invoeren in lokale artikellijst dmv push
        //herbeginnen van de cyclus tot 999999
        }
        if(i==120){
          return true;
        }
      }
    }
    async localarticleupdaterequestlist(bestek,type,format){ //listtofill is the initial locallist
      this.localupdaterequestlist=[];
      for (let i = 0; i < 120; i++){
        var tempid="0".repeat(4-i.toString().length)+i.toString(); //change to 6-... later //door de dc:properties van de RDF node gaan en de waarden invullen in lokale parameters
        console.log(tempid);
        if (await this.existcheck(bestek,type,tempid,format)) {//vinden van de RDF node met i als dc:identifier in het bepaalde type en bestek
          console.log("yes");
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
          var temptitle = await this.filterproperty(bestek,type,tempid,"dc:title",format);
          var templanguage= await this.filterproperty(bestek,type,tempid,"dc:language",format);
          var tempdescription= await this.filterproperty(bestek,type,tempid,"dc:description",format);
          var tempbestek = bestek;
          var temptype = type;
          var tempcreator= await this.filterproperty(bestek,type,tempid,"dc:creator",format);
          var tempsource: "0"; //dc:source->dc:identifier van source
          var tempformat = await this.filterproperty(bestek,type,tempid,"dc:format",format);
          this.temparticle={id:tempid,bsid:tempbsid,title:temptitle,language:templanguage,description:tempdescription,bestek:tempbestek,type:temptype,creator:tempcreator,source:tempsource,format:tempformat}
          //lokale parameters invullen in een nieuwe lokale 'Article'-klasse
          this.localupdaterequestlist.push(this.temparticle);
          //nieuwe lokale 'Article'-klasse invoeren in lokale artikellijst dmv push
          //herbeginnen van de cyclus tot 999999
          }
          if(i==120){
            return true;
          }
        }
      }

  async existcheck(bestek,type,identifier,format){ //returns a true if the node exists
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> prefix prov: <http://www.w3.org/ns/prov#> describe <http://example/"+bestek+"/"+type+"/"+format+"/"+identifier+">");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    let options = { headers:headers, responseType:'text'};
    var url = "http://128.199.58.129:7200/repositories/repo";
    var word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    if (word.length>424) {//was 380 zonder prefix prov
      return true;
    } else {
      return false;
    }
  }

  async filterproperty(bestek, type, identifier, property,format){
    let body = new URLSearchParams()
    body.set("query","PREFIX dc: <http://purl.org/dc/elements/1.1/> describe <http://example/"+bestek+"/"+type+"/"+format+"/"+identifier+"> where {?s dc:identifier \""+identifier+"\"} limit 20");
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set("Content-Type",'application/x-www-form-urlencoded');
    let options = { headers:headers, responseType:'text'};
    var url = "http://128.199.58.129:7200/repositories/repo";
    var word= await this.http.post(url,body.toString(),{headers:headers,responseType:'text'}).toPromise().then(function(response){
      return response.toString();
    });
    return this.filterfor(word,property.toString());
    
  }

  updatequery(bestek,identifier,type,title,creator,description,language,format){
    //inserts new RDF node with appropriate properties (meant for official nodes, use alternateof for other versions)
    //QSOURCEARTICLE needs work!!!!
    //prefix prov: <http://www.w3.org/ns/prov#>
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const qidentifier="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Aidentifier+%22"+identifier+"%22%7D%3B%0A";
    const qtitle="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Atitle+%22"+title+"%22%7D%3B%0A";
    const qtype="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Atype+%22"+type+"%22%7D%3B%0A";
    const qcreator="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Acreator+%22"+creator+"%22%7D%3B%0A";
    const qdescription="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Adescription+%22"+description+"%22%7D%3B%0A";
    const qlanguage="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Alanguage+%22"+language+"%22%7D%3B%0A";
    const qformat="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Aformat+%22"+format+"%22%7D%3B%0A";
    const qdummy="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Adate+%22dummyproperty%22%7D%3B%0A";
    //const qsourcearticle="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+identifier+"%2F"+type+"%3E+dc%3Asource+%22"+"%22%7D%3B%0A";//edit
    const body = qprefixes+qidentifier+qtitle+qtype+qcreator+qdescription+qlanguage+qformat+qdummy;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
    //const qalternateof="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+identifier+"%2F"+type+"%3E+prov%3AalternateOf+%22"+alternateof+"%22%7D%3B%0A";
  }  

  flush(bestek,identifier,type,format){
    //flushes everything from properties (SOURCE ARTICLE ISNT FLUSHED!!!)
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const delidentifier="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Aidentifier+%3Fo%3B+dc%3Aidentifier+%3Fo%7D%3B%0A";
    const deltitle="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Atitle+%3Fo%3B+dc%3Atitle+%3Fo%7D%3B%0A";
    const deltype="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Atype+%3Fo%3B+dc%3Atype+%3Fo%7D%3B%0A";
    const delcreator="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Acreator+%3Fo%3B+dc%3Acreator+%3Fo%7D%3B%0A";
    const deldescription="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Adescription+%3Fo%3B+dc%3Adescription+%3Fo%7D%3B%0A";
    const dellanguage="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Alanguage+%3Fo%3B+dc%3Alanguage+%3Fo%7D%3B%0A";
    const delformat="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Aformat+%3Fo%3B+dc%3Aformat+%3Fo%7D%3B%0A";
    const deldummy="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Adate+%3Fo%3B+dc%3Adate+%3Fo%7D%3B%0A";
    //const delsourcearticle="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+identifier+"%2F"+type+"%3E+dc%3Aidentifier+%3Fo%3B+dc%3Aidentifier+%3Fo%7D%0A";
    const body = qprefixes+delidentifier+deltitle+deltype+delcreator+deldescription+dellanguage+delformat+deldummy;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
  }

  royalflush(bestek,identifier,type,format){
    //flushes everything from properties AND RELATIONSHIP TO SOURCE ARTICLE!!!
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const delidentifier="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Aidentifier+%3Fo%3B+dc%3Aidentifier+%3Fo%7D%3B%0A";
    const deltitle="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Atitle+%3Fo%3B+dc%3Atitle+%3Fo%7D%3B%0A";
    const deltype="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Atype+%3Fo%3B+dc%3Atype+%3Fo%7D%3B%0A";
    const delcreator="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Acreator+%3Fo%3B+dc%3Acreator+%3Fo%7D%3B%0A";
    const deldescription="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Adescription+%3Fo%3B+dc%3Adescription+%3Fo%7D%3B%0A";
    const dellanguage="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Alanguage+%3Fo%3B+dc%3Alanguage+%3Fo%7D%3B%0A";
    const delsourcearticle="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Asource+%3Fo%3B+dc%3Asource+%3Fo%7D%0A";
    const delformat="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Aformat+%3Fo%3B+dc%3Aformat+%3Fo%7D%3B%0A";
    const deldummy="delete+where+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+format+"%2F"+identifier+"%3E+dc%3Adate+%3Fo%3B+dc%3Adate+%3Fo%7D%3B%0A";
    const body = qprefixes+delidentifier+deltitle+deltype+delcreator+deldescription+dellanguage+delsourcearticle+delformat+deldummy;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
  }

  alternateversionquery(bestek,identifier,type,title,creator,description,language,alternateof){
    //needs to be completed after article infrastructure is present
    //prefix prov: <http://www.w3.org/ns/prov#>
    const qprefixes="update=PREFIX+dc%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0Aprefix+prov%3A+%3Chttp%3A%2F%2Fwww.w3.org%2Fns%2Fprov%23%3E%0A";
    const qidentifier="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Aidentifier+%22"+identifier+"%22%7D%3B%0A";
    const qtitle="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Atitle+%22"+title+"%22%7D%3B%0A";
    const qtype="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Atype+%22"+type+"%22%7D%3B%0A";
    const qcreator="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Acreator+%22"+creator+"%22%7D%3B%0A";
    const qdescription="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Adescription+%22"+description+"%22%7D%3B%0A";
    const qlanguage="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Alanguage+%22"+language+"%22%7D%3B%0A";
    const qalternateof="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+prov%3AalternateOf+%22"+alternateof+"%22%7D%3B%0A";
    const qdummy="insert+data+%7B%3Chttp%3A%2F%2Fexample%2F"+bestek+"%2F"+type+"%2F"+identifier+"%3E+dc%3Adate+%22dummyproperty%22%7D%3B%0A";
    //qdummy needs to be last!
    const body = qprefixes+qidentifier+qtitle+qtype;
    const headers = new HttpHeaders().set('Accept', 'application/x-trig').set('Content-Type','application/x-www-form-urlencoded');
    let options = { headers:HttpHeaders};
    var url = "http://128.199.58.129:7200/repositories/repo/statements";
    this.http.post(url,body,{headers:headers}).toPromise().then(function(response) { });
    }}

