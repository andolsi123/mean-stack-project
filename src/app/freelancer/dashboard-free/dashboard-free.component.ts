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
  id_freelancer: any;
 

  constructor(private http: AppService, private router: Router, private route: ActivatedRoute ) {
    this.id_freelancer = this.http.connectedUser.data.freelancer;
  }

  ngOnInit() {
    this.http.getAllProjects().subscribe(data => {
      this.allProjects = data;
      console.log(data);
    });
  }

  pathlogin() {
    this.router.navigate(['dashboard-free'], {relativeTo: this.route});
  }


  likeProjet(id){
    this.http.postLikeProject(id,this.id_freelancer).subscribe(data3 => {
      console.log(data3);
     this.ngOnInit();
    })
  }
}
