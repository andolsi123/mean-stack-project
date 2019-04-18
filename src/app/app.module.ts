import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatRippleModule, MatSelectModule, MatTooltipModule, MatIconModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyComponent } from './company/company.component';
import { AddProjectComponent } from './company/add-project/add-project.component';
import { DashboardComponent } from './company/dashboard/dashboard.component';
import { AppliedFreeLancerComponent } from './company/applied-free-lancer/applied-free-lancer.component';
import { SideBarComponent } from './company/side-bar/side-bar.component';
import { NavbarComponent } from './company/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LogInComponent } from './landing-page/log-in/log-in.component';
import { NavbarLandingComponent } from './landing-page/navbar-landing/navbar-landing.component';
import { FooterLandingComponent } from './landing-page/footer-landing/footer-landing.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { SignUpCompanyComponent } from './landing-page/sign-up-company/sign-up-company.component';
import { SignUpFreelancerComponent } from './landing-page/sign-up-freelancer/sign-up-freelancer.component';
import { MatChipsModule} from '@angular/material/chips';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EditeProfilComponent } from './company/edite-profil/edite-profil.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { DashboardFreeComponent } from './freelancer/dashboard-free/dashboard-free.component';
import { EditeProfilFreeComponent } from './freelancer/edite-profil-free/edite-profil-free.component';
import { NavbarFreeComponent } from './freelancer/navbar-free/navbar-free.component';
import { SidebarFreeComponent } from './freelancer/sidebar-free/sidebar-free.component';
import { ProjectListComponent } from './freelancer/project-list/project-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    AddProjectComponent,
    DashboardComponent,
    AppliedFreeLancerComponent,
    SideBarComponent,
    NavbarComponent,
    LandingPageComponent,
    LogInComponent,
    NavbarLandingComponent,
    FooterLandingComponent,
    AboutUsComponent,
    SignUpCompanyComponent,
    SignUpFreelancerComponent,
    EditeProfilComponent,
    FreelancerComponent,
    DashboardFreeComponent,
    EditeProfilFreeComponent,
    NavbarFreeComponent,
    SidebarFreeComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatRippleModule,
    MatSelectModule,
    MatTooltipModule,
    MatChipsModule,
    MatIconModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
