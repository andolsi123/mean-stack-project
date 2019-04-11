import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AppliedFreeLancerComponent } from './company/applied-free-lancer/applied-free-lancer.component';
import { AddProjectComponent } from './company/add-project/add-project.component';

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
       }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
