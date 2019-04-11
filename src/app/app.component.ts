import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

 dt: any;

 constructor(private http: AppService) {}

 ngOnInit() {
  this.http.getAllProjects().subscribe(data => {
    this.dt = data;
    console.log(data);
  });
 }

}
