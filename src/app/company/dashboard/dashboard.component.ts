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

  constructor(private appService: AppService, private route: Router) {
    this.projects = [];
    this.id_CompanyConnect = this.appService.connectedUser.date.company;
    console.log(this.id_CompanyConnect);
   }

  ngOnInit() {
    // to do:  add id user here
    this.appService.getAllProjects().subscribe((data: any) => this.projects = data);
  }
  detlet(id) {
    this.appService.postDeleteProject(id).subscribe((data)  => this.projects = data);
  }
  update() {}
  detail(id) {
    this.route.navigate(['/company/detail-project', id]);
  }

}
