import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
projects: any;
q: any;

  constructor(private appService: AppService, private route: Router) {
    this.projects = [];
   }

  ngOnInit() {
    this.appService.getAllProjects().subscribe((data: any) => this.projects = data);
  }
  detlet(id) {
    this.appService.postDeleteProject(id).subscribe((data)  => this.projects = data);
  }
  update(id) {
    this.route.navigate(['/company/edit-project', id]);
  }
  detail(id) {
    this.route.navigate(['/company/detail-project', id]);
  }

}
