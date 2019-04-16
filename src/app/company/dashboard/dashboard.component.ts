import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private appService: AppService, private route: Router) { }

  ngOnInit() {
    this.appService.getAllProjects().subscribe(res => console.log(res));
  }
  detlet(id) {
    this.appService.postDeleteProject(id).subscribe(res => console.log(res));
  }
  update() {}
  detail(id) {
    console.log('rr');
    this.route.navigate(['detail-project', id]);
    console.log('tt');
  }
}
