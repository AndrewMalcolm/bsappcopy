export class Article {
  id: string; //dc:identifier
  bsid: string; //dc:identifier transformed
  title: string; //dc:title
  language: string; //dc:language
  description: string; //dc:description
  bestek: string;
  type: string; //dc:type (official, frenchtranslation, bouwheer,...)
  creator: string; //dc:creator
  source: string; //dc:source->dc:identifier van source
  format: string; //dc:format (accepted, updatereq, newreq)
  constructor(id,bsid,title,language,description,bestek,type,creator,source,format){
    this.id=id;
    this.bsid=bsid;//this.id.toString().slice(0,2)+"."+this.id.toString().slice(2,4)+"."+this.id.toString().slice(4,6)+".";
    this.title=title;
    this.language=language;
    this.description=description;
    this.bestek=bestek;
    this.type=type;
    this.creator=creator;
    this.source=source;
    this.format=format;
  }
}
