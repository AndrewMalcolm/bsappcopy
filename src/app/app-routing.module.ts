import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PlbComponent } from './plb/plb.component';
import { MlbComponent } from './mlb/mlb.component';
import { ManagerComponent } from './manager/manager.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
import { ArticleeditComponent } from './articleedit/articleedit.component';
import { UsereditorComponent } from './usereditor/usereditor.component';
import { TreeviewComponent } from './treeview/treeview.component';
import { ArticleviewerComponent } from './articleviewer/articleviewer.component';
import { ArticlerequestComponent } from './articlerequest/articlerequest.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'moederlastenboek', component: MlbComponent },
  { path: 'projectlastenboek', component: PlbComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'userinfo', component: UserinfoComponent },
  { path: 'testartikel', component: ArticleeditComponent},
  { path: 'usereditor', component: UsereditorComponent},
  { path: 'view/:bestek/:type/:format/:id', component: ArticleviewerComponent},
  { path: 'edit/:bestek/:type/:format/:id', component: ArticleeditComponent},
  { path: 'request/:bestek/:type/:format/:id', component: ArticlerequestComponent},
  { path: 'usereditor', component: UsereditorComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class appRoutingModule { }
