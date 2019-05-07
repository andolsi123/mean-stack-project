import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edite-profil-free',
  templateUrl: './edite-profil-free.component.html',
  styleUrls: ['./edite-profil-free.component.css']
})
export class EditeProfilFreeComponent implements OnInit {
 freelancer: any;
 // tslint:disable-next-line:variable-name
 id_freelancer: any;
 editProfileFreelancer: FormGroup;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute ) {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.editProfileFreelancer = new FormGroup({
     first_name : new  FormControl(''),
     last_name : new FormControl(''),
     languages : new FormControl(''),
      phone_Number: new FormControl(''),
      email : new FormControl(''),
      password : new FormControl(''),
      facebook : new FormControl(''),
      twitter : new FormControl(''),
      github : new FormControl(''),
      skills : new FormControl(''),
    });
  }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getOneFreelancer(this.id_freelancer).subscribe((free: any) => {
      this.freelancer = free;
      this.editProfileFreelancer = new FormGroup({
        first_name : new FormControl (this.freelancer.first_name),
        last_name : new FormControl(this.freelancer.last_name),
        languages : new FormControl(this.freelancer.languages),
        phone_Number : new FormControl(this.freelancer.phone_Number),
        email : new FormControl(this.appService.connectedUser.data.email),
        password : new FormControl(this.appService.connectedUser.data.password),
        facebook : new FormControl(this.freelancer.facebook),
        twitter : new FormControl(this.freelancer.twitter),
        github : new FormControl(this.freelancer.github),
        skills : new FormControl(this.freelancer.skills),
      });
    });
  }

  //  readURL(event): void {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];

  //     const reader = new FileReader();
  //     reader.onload = e => this.imageSrc = reader.result;

  //     reader.readAsDataURL(file);
  //   }
  // }

   Editfreelancer() {
    const dataForm = new FormData();
    dataForm.append('firt_name', this.editProfileFreelancer.value.firs_tname);
    dataForm.append('last_name', this.editProfileFreelancer.value.last_name);
    dataForm.append('languages', this.editProfileFreelancer.value.languages);
    dataForm.append('phone_Number', this.editProfileFreelancer.value.phone_Number);
    dataForm.append('email', this.editProfileFreelancer.value.email);
    dataForm.append('password', this.editProfileFreelancer.value.password);
    dataForm.append('facebook', this.editProfileFreelancer.value.facebook);
    dataForm.append('twitter', this.editProfileFreelancer.value.twitter);
    dataForm.append('github', this.editProfileFreelancer.value.github);
    dataForm.append('skills', this.editProfileFreelancer.value.skills);
    this.appService.UpdateFreelancerProfile(this.id_freelancer, dataForm).subscribe((data: any) => {
    localStorage.setItem('token', data.access_token);
    this.appService.connectedUser = this.appService.getDecodedToken();
    });
  }

}
