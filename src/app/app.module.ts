import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// tslint:disable-next-line:max-line-length
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
import { DetailProjectComponent } from './company/detail-project/detail-project.component';
import { FooterLandingComponent } from './landing-page/footer-landing/footer-landing.component';
import { AboutUsComponent } from './landing-page/about-us/about-us.component';
import { SignUpCompanyComponent } from './landing-page/sign-up-company/sign-up-company.component';
import { SignUpFreelancerComponent } from './landing-page/sign-up-freelancer/sign-up-freelancer.component';
import { FilterProjectsPipe } from './filter-projects.pipe';
import { MatChipsModule} from '@angular/material/chips';
import { CKEditorModule } from 'ng2-ckeditor';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { EditeProfilComponent } from './company/edite-profil/edite-profil.component';
import { FreelancerComponent } from './freelancer/freelancer.component';
import { DashboardFreeComponent } from './freelancer/dashboard-free/dashboard-free.component';
import { EditeProfilFreeComponent } from './freelancer/edite-profil-free/edite-profil-free.component';
import { NavbarFreeComponent } from './freelancer/navbar-free/navbar-free.component';
import { SidebarFreeComponent } from './freelancer/sidebar-free/sidebar-free.component';
import { ProjectListComponent } from './freelancer/project-list/project-list.component';
import { DetailsProjectComponent } from './freelancer/details-project/details-project.component';
import { ProfilComponent } from './company/profil/profil.component';
import { EditProjectComponent } from './company/edit-project/edit-project.component';
import { HomeComponent } from './landing-page/home/home.component';
import { ChatComponent } from './company/chat/chat.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatDetailsComponent } from './company/chat-details/chat-details.component';
import { ChatsComponent } from './freelancer/chats/chats.component';
import { DetailsChatComponent } from './freelancer/details-chat/details-chat.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

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
    DetailProjectComponent,
    FooterLandingComponent,
    AboutUsComponent,
    SignUpCompanyComponent,
    SignUpFreelancerComponent,
    FilterProjectsPipe,
    EditeProfilComponent,
    FreelancerComponent,
    DashboardFreeComponent,
    EditeProfilFreeComponent,
    NavbarFreeComponent,
    SidebarFreeComponent,
    ProjectListComponent,
    DetailsProjectComponent,
    ProfilComponent,
    EditProjectComponent,
    HomeComponent,
    ChatComponent,
    ChatDetailsComponent,
    ChatsComponent,
    DetailsChatComponent
    
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
    CKEditorModule,
    MatSnackBarModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
