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
  // tslint:disable-next-line:variable-name
  id_company: any;
  company: any;
  // tslint:disable-next-line:variable-name
  id_freelancer: any;
  freelancer: any;
  // tslint:disable-next-line:variable-name
  frist_name: any;
  commentaire: any = '';
  comments: any;
  photoF: any;
  freelancerConnected: any;

  constructor(private http: AppService, private route: ActivatedRoute) {
    this.id_freelancer = this.http.connectedUser.data.freelancer;
  }

  ngOnInit() {
    this.http.getOneFreelancer(this.id_freelancer).subscribe(data3 => {
      this.freelancerConnected  = data3;
    });
    this.route.params.subscribe(params => {
      this.http.getOneProject(params.id).subscribe(data => {
        this.project = data;
        this.comments = this.project.comments;
        this.id_company = this.project.company._id;
        this.http.getOneCompany(this.id_company).subscribe(date2 => {
          this.company = date2;
        });
      });
    });
  }


  affectProject() {
    // // body = {companyEmail: company email, freelancer: freelancer name, notifications: notification with freelancer name};
    // const body = {
    //   companyEmail: this.company.email,
    //   freelancer: this.freelancerConnected.name,
    //   notifications: `ok`
    //   };
    this.http.postAffectedProject(this.id_freelancer, this.project._id).subscribe(data3 => {
     console.log(data3);
    });
  }

  CancelComment() {
    this.commentaire = '';
  }

  addComment() {
      this.frist_name = this.freelancerConnected.first_name;
      this.photoF = this.freelancerConnected.Image_Profil;
      const COMMENT = {
        comment: this.commentaire,
        commenter: this.frist_name,
        photo_commenter: this.photoF,
        id_commenter: this.id_freelancer
      };
      this.comments.push(COMMENT);
      this.http.postAddComment(this.project._id, this.comments).subscribe(data4 => {
        this.ngOnInit();
      });
      this.commentaire = '';
  }

  delComment(idCemment: any) {
    this.http.postDeleteComment(this.project._id, idCemment).subscribe(data5 => {
      this.comments = data5;
      this.ngOnInit();
    });
  }

  UpdateComment(idCemment: any) {
    this.http.postUpdateComment(this.project._id, idCemment).subscribe(data6 => {
      this.comments = data6;
      this.ngOnInit();
    });
  }

}
