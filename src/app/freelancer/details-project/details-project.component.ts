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
  freelancer :any ;
  frist_name : any ;
  commentaire:any ="";
  comments :any
  photoF : any;

  constructor(private http: AppService, private route: ActivatedRoute) { 

    this.id_freelancer = this.http.connectedUser.data.freelancer;

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.getOneProject(params.id).subscribe(data => {
        this.project = data;
        console.log(this.project);
        this.comments = this.project.comments;
        console.log(this.comments);


        this.id_company = this.project.company._id;
        //console.log(this.id_company)
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
  

  CancelComment(){
    this.commentaire = "";
  }

  addComment(){

      this.http.getOneFreelancer( this.id_freelancer).subscribe(data3 => {
      this.freelancer = data3 ;
      this.frist_name =this.freelancer.first_name ;
      this.photoF = this.freelancer.Image_Profil;

      const COMMENT={
        comment : this.commentaire,
        commenter : this.frist_name,
        photo_commenter : this.photoF,
        id_commenter : this.id_freelancer
      }

      this.http.postAddComment(this.project._id ,COMMENT).subscribe(data4 =>{
      })
    });
  }

}
