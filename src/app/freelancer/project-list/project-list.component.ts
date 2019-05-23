import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  id_freelancer: any;
  accepted = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getAllProjects().subscribe((projects: any) => {
      for (let project of projects) {
        if (project.accepted_freelancer._id == this.id_freelancer) {
          this.accepted.push(project);
        }
      }
    });
  }
}
