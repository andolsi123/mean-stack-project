import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-free',
  templateUrl: './dashboard-free.component.html',
  styleUrls: ['./dashboard-free.component.css']
})
export class DashboardFreeComponent implements OnInit {
  allProjects: any;


  constructor(private http: AppService,private router: Router, private route: ActivatedRoute ) {}

  ngOnInit() {
   // this.http.getAllProjects().subscribe(data => {
    //  this.allProjects = data;
     // console.log(data);
   // });
  }

  pathlogin() {
    this.router.navigate(['dashboard-free'], {relativeTo: this.route});
  }

}
