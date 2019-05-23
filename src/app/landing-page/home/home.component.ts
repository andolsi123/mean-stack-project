import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allProjects: any;
  nbProject : number;
  allFree: any;
  nbFreelancer : number;
  allCompany: any;
  nbCompany: any;

  constructor(private http: AppService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.http.getAllProjects().subscribe(data => {
      this.allProjects = data;
      this.nbProject = this.allProjects.length;
      this.http.getAllFreelancers().subscribe(data1 => {
        this.allFree = data1;
        this.nbFreelancer = this.allFree.length;
        this.http.getAllCompanies().subscribe(data2 => {
          this.allCompany = data2;
          this.nbCompany = this.allCompany.length;
        });
      });
    });
  }
}
