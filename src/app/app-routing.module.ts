import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AppliedFreeLancerComponent } from './company/applied-free-lancer/applied-free-lancer.component';
import { AddProjectComponent } from './company/add-project/add-project.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './landing-page/log-in/log-in.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { SignUpCompanyComponent } from './landing-page/sign-up-company/sign-up-company.component';
import { SignUpFreelancerComponent } from './landing-page/sign-up-freelancer/sign-up-freelancer.component';
import { EditeProfilComponent } from './company/edite-profil/edite-profil.component';

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
        path: 'edite-profil',
        component: EditeProfilComponent
        }
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
        path: 'sign-up-company',
        component: SignUpCompanyComponent
        },
        {
          path: 'sign-up-freelancer',
          component: SignUpFreelancerComponent
          },
        {
          path: 'about-us',
          component: AboutUsComponent
          }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
