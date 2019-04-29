import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-project',
  templateUrl: './details-project.component.html',
  styleUrls: ['./details-project.component.css']
})

export class DetailsProjectComponent implements OnInit {

  project: any;
  id_company: any;
  company : any;
  id_freelancer :any;

  constructor(private http: AppService, private route: ActivatedRoute) { 

    this.id_freelancer = this.http.connectedUser.data.freelancer;

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.getOneProject(params.id).subscribe(data => {
        this.project = data;


        this.id_company = this.project.company._id;
        console.log(this.id_company)
        this.http.getOneCompany(this.id_company).subscribe(date2 => {
          this.company = date2;    
        });

      });
    });
  }


  affectProject(){
    this.http.postAffectedProject( this.id_freelancer, this.project._id).subscribe(data3 => {
      console.log(data3);
    });
  }
  
}
