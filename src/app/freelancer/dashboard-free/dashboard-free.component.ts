import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-dashboard-free',
  templateUrl: './dashboard-free.component.html',
  styleUrls: ['./dashboard-free.component.css']
})
export class DashboardFreeComponent implements OnInit {
  allProjects: any;



  constructor(private http: AppService) { }

  ngOnInit() {
    //this.http.getAllProjects().subscribe(data => {
     // this.allProjects = data;
   // });
  }

}
