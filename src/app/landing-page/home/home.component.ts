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

  constructor(private http: AppService, private route: ActivatedRoute) {
   }

  ngOnInit() {  
    this.http.getAllProjects().subscribe(data => {
    this.allProjects = data;
    console.log(data);
  });
  }
}
