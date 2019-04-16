import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AppliedFreeLancerComponent } from './company/applied-free-lancer/applied-free-lancer.component';
import { AddProjectComponent } from './company/add-project/add-project.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './landing-page/log-in/log-in.component';
import { SignUpComponent } from './landing-page/sign-up/sign-up.component';
import { DetailProjectComponent } from './company/detail-project/detail-project.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent,
    children: [
        {
        path: 'dashboard',
        component: DashboardComponent
       },
       {
       path: 'AppliedFrelancers',
       component: AppliedFreeLancerComponent
       },
       {
       path: 'addProject',
       component: AddProjectComponent
       },
       {
       path: 'detail-project/:id',
       component: DetailProjectComponent
     },
    ]
  },
  {
    path: 'landing-page',
    component: LandingPageComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent
        },
        {
        path: 'sign-up',
        component: SignUpComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
