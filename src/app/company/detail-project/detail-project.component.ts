import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {
  res: any;
  projects: any;
  skills: any;


  constructor(private appService: AppService, private route: ActivatedRoute ) {
    this.res = this.route.snapshot.params.id;
   }

  ngOnInit() {
    this.appService.getOneProject(this.res).subscribe((data) => console.log(this.projects = data));
  }

}
