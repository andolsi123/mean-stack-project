import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  id_CompanyConnect: any;
  projects: any;
  q: any;
  company: any;

  constructor(private appService: AppService, private route: Router) {
    this.projects = [];
    console.log(this.appService.connectedUser.data.company);
    this.id_CompanyConnect = this.appService.connectedUser.data.company;

   }

  ngOnInit() {
     this.appService.getOneCompany(this.id_CompanyConnect).subscribe((comp: any) => {
       this.company = comp;
       console.log(this.id_CompanyConnect);
       console.log(this.company);
     });
     this.appService.getAllProjectsCompany(this.id_CompanyConnect).subscribe((data: any) => this.projects = data);
       console.log(this.projects);
}

  detlet(id) {
    this.appService.postDeleteProject(id).subscribe((data)  => this.projects = data);
   }
  update() {}
  detail(id) {
    this.route.navigate(['/company/detail-project', id]);
  }

}
