import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { appRoutingModule } from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardhomeComponent } from './dashboardhome/dashboardhome.component';
import { DashboardloginComponent } from './dashboardlogin/dashboardlogin.component';
import { HomeComponent } from './home/home.component';
import { DashboardplbComponent } from './dashboardplb/dashboardplb.component';
import { DashboardmlbComponent } from './dashboardmlb/dashboardmlb.component';
import { MlbComponent } from './mlb/mlb.component';
import { PlbComponent } from './plb/plb.component';
import { DashboardmanagerComponent } from './dashboardmanager/dashboardmanager.component';
import { ManagerComponent } from './manager/manager.component';
import { DashboardnotificationComponent } from './dashboardnotification/dashboardnotification.component';
import { DashboarduserComponent } from './dashboarduser/dashboarduser.component';
import { DashboardbrowserComponent } from './dashboardbrowser/dashboardbrowser.component';
import { BrowserfoolComponent } from './browserfool/browserfool.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { RecordsService } from './records.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { TreeviewComponent} from './treeview/treeview.component';
import { RecursivebrowserComponent } from './recursivebrowser/recursivebrowser.component';
import { MaineditComponent } from './mainedit/mainedit.component';
import { ArticleviewComponent } from './articleview/articleview.component';
import { ArticlesingleviewComponent } from './articlesingleview/articlesingleview.component'
import { NgxEditorModule } from 'ngx-editor';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ArticledetailboxComponent } from './articledetailbox/articledetailbox.component';
import { ArticleeditComponent } from './articleedit/articleedit.component';
import { ExportnavigatorComponent } from './exportnavigator/exportnavigator.component';
import { SinglecommentComponent } from './singlecomment/singlecomment.component';
import { CommentinputComponent } from './commentinput/commentinput.component';
import { UsereditorComponent } from './usereditor/usereditor.component';
import { ArticleviewerComponent } from './articleviewer/articleviewer.component';
import { RouterModule } from '@angular/router';
import { ArticledetailboxeditComponent } from './articledetailboxedit/articledetailboxedit.component';
import { ArticlerequestComponent } from './articlerequest/articlerequest.component';
import { ArticlesinglerequestComponent } from './articlesinglerequest/articlesinglerequest.component';
import { DashboardnewarticleComponent } from './dashboardnewarticle/dashboardnewarticle.component';
import { AlternateclickComponent } from './alternateclick/alternateclick.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    DashboardComponent,
    DashboardhomeComponent,
    DashboardloginComponent,
    HomeComponent,
    DashboardplbComponent,
    DashboardmlbComponent,
    MlbComponent,
    PlbComponent,
    DashboardmanagerComponent,
    ManagerComponent,
    DashboardnotificationComponent,
    DashboarduserComponent,
    DashboardbrowserComponent,
    BrowserfoolComponent,
    UserinfoComponent,
    AdminComponent,
    TreeviewComponent,
    RecursivebrowserComponent,
    MaineditComponent,
    ArticleviewComponent,
    ArticlesingleviewComponent,
    ArticledetailboxComponent,
    ArticleeditComponent,
    ExportnavigatorComponent,
    SinglecommentComponent,
    CommentinputComponent,
    UsereditorComponent,
    ArticleviewerComponent,
    ArticledetailboxeditComponent,
    ArticlerequestComponent,
    ArticlesinglerequestComponent,
    DashboardnewarticleComponent,
    AlternateclickComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    appRoutingModule,
    RouterModule,
    TreeModule.forRoot(),
    HttpClientModule,
    NgxEditorModule,
    TooltipModule.forRoot()
  ],
  providers: [RecordsService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
