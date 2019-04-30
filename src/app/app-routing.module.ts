import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AppliedFreeLancerComponent } from './company/applied-free-lancer/applied-free-lancer.component';
import { AddProjectComponent } from './company/add-project/add-project.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './landing-page/log-in/log-in.component';
import { DetailProjectComponent } from './company/detail-project/detail-project.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { SignUpCompanyComponent } from './landing-page/sign-up-company/sign-up-company.component';
import { SignUpFreelancerComponent } from './landing-page/sign-up-freelancer/sign-up-freelancer.component';
import { EditeProfilComponent } from './company/edite-profil/edite-profil.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { DashboardFreeComponent } from './freelancer/dashboard-free/dashboard-free.component';
import { EditeProfilFreeComponent } from './freelancer/edite-profil-free/edite-profil-free.component';
import { ProjectListComponent } from './freelancer/project-list/project-list.component';
import { DetailsProjectComponent } from './freelancer/details-project/details-project.component';
import { ProfilComponent } from './company/profil/profil.component';
import { AuthguardGuard } from './authguard.guard';
import { EditProjectComponent } from './company/edit-project/edit-project.component';
import { HomeComponent } from './landing-page/home/home.component';
import { ChatComponent } from './company/chat/chat.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyComponent, canActivate: [AuthguardGuard],
    children: [
      {
        path: '',
        component: DashboardComponent
      },
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
     {
       path: 'edit-project',
       component: EditeProfilComponent
     },
        {path: 'edite-profil',
        component: EditeProfilComponent
        },
        {
          path: 'profil',
          component: ProfilComponent
        },
      {
        path: 'edit-project/:id',
        component: EditProjectComponent
      },
      {
        path: 'chatting',
        component: ChatComponent
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
        },
        {
          path: 'home',
          component: HomeComponent
        },
        {
          path: '',
          component: HomeComponent
        }
    ]
  } ,
  {
    path: 'freelancer',
    component: FreelancerComponent, canActivate: [AuthguardGuard],
    children: [
      {
        path: 'dashboard-free',
        component: DashboardFreeComponent
        },
        {
          path: '',
          component: DashboardFreeComponent
        },
        {
        path: 'edite-profil-free',
        component: EditeProfilFreeComponent
        },
        {
          path: 'project-list',
          component: ProjectListComponent
        },
        {
          path: ':id',
          component: DetailsProjectComponent
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
