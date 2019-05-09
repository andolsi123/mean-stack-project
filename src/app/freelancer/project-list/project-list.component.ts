import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  id_freelancer: any;
  projects: any;

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getOneFreelancer(this.id_freelancer).subscribe((free: any) => {
      this.projects = free.projects;
      console.log(this.projects);
    });
  }
}
