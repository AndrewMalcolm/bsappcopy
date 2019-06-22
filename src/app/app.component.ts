import { Component } from '@angular/core';
import { AuthService } from './auth.service'
import { QueryserviceService } from './queryservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BSapp';
  startapp=false;
  constructor(private qserv:QueryserviceService){
    
  }
  async ngOnInit() {
    await this.qserv.getlist();
    await this.qserv.localarticlePLBlist("PLB","official","accepted");
    await this.qserv.createupdatelist();
    await this.qserv.createnewlist();
    this.startapp=true;
  }
}
