import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-detail-project',
  templateUrl: './detail-project.component.html',
  styleUrls: ['./detail-project.component.css']
})
export class DetailProjectComponent implements OnInit {
  id: number;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getOneProject(this.id).subscribe(res => console.log(res));
  }

}
