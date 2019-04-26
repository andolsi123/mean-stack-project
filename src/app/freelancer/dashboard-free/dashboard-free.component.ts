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
<<<<<<< HEAD


=======
  
>>>>>>> ad89f56d4f864953640abf609612b01fa72c9867

  constructor(private http: AppService,private router: Router, private route: ActivatedRoute ) {}

  ngOnInit() {
<<<<<<< HEAD
    //this.http.getAllProjects().subscribe(data => {
     // this.allProjects = data;
   // });
=======
    this.http.getAllProjects().subscribe(data => {
      this.allProjects = data;
      console.log(data);
    });
>>>>>>> ad89f56d4f864953640abf609612b01fa72c9867
  }

  pathlogin() {
    this.router.navigate(['dashboard-free'],{relativeTo: this.route});
  }

}
