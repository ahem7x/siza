import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { IntegrateComponent } from './home/integrate/integrate.component';
import { OrchestrateComponent } from './home/orchestrate/orchestrate.component';
import { OrgadminComponent } from './home/orgadmin/orgadmin.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login/:type', component: LoginComponent },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'integrate', component: IntegrateComponent },
      { path: 'orchestrate', component: OrchestrateComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: OrgadminComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
