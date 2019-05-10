import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-applied-free-lancer',
  templateUrl: './applied-free-lancer.component.html',
  styleUrls: ['./applied-free-lancer.component.css']
})
export class AppliedFreeLancerComponent implements OnInit {
    id_CompanyConnect: any;
    company: any;
    projects: any;
    freelancer: any;

  constructor(private appService: AppService) {
    this.projects = [];
    this.id_CompanyConnect = this.appService.connectedUser.data.company;
  }

  ngOnInit() {
    this.appService.getOneCompany(this.id_CompanyConnect).subscribe((comp: any) => {
      this.company = comp;
    });

    this.appService.getAllProjectsAppliedFree(this.id_CompanyConnect).subscribe((data: any) => {
       this.projects = data;
       console.log(this.projects);
    });
  }

  accept(idp, idf) {
    this.appService.postAcceptedFreelancer(idp, idf).subscribe((data: any) => {
      this.freelancer = data;
      this.ngOnInit();
    });
  }


  cancel(idF, idP){
    this.appService.postRefusedFreelancer(idF, idP).subscribe((data: any) => {
      this.freelancer = data;
    });
    this.ngOnInit();
  }

}
