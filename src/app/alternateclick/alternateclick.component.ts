import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../article';
import { QueryserviceService } from '../queryservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alternateclick',
  templateUrl: './alternateclick.component.html',
  styleUrls: ['./alternateclick.component.css']
})
export class AlternateclickComponent implements OnInit {
  @Input() article: Article;
  temparticle:Article;
  hrefy:string;
  constructor(private qserv:QueryserviceService, private router:Router) { }

  ngOnInit() {
    this.article=this.article;
  }

  hrefget(){//probeersel om automatisch te herladen
    this.router.navigateByUrl("/view/PLB/official_oldversion_2/accepted/0010");
    this.router.navigateByUrl("/view/PLB/official_oldversion_2/accepted/0010");
  }


  
}
