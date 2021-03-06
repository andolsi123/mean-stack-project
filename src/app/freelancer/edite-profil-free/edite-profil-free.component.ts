import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';

export interface Skills {
  skill: string;
}

export interface Languages {
  language: string;
}

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
 languages: Languages[] = [];
 skills: Skills[] = [];
 visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  fileSrc: any;
  imageSrc: any;
  selectedCV: File;
  selectedImage: File;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute ) {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.editProfileFreelancer = new FormGroup({
     first_name : new  FormControl(''),
     last_name : new FormControl(''),
      phone_Number: new FormControl(''),
      email : new FormControl(''),
      password : new FormControl(''),
      facebook : new FormControl(''),
      twitter : new FormControl(''),
      github : new FormControl(''),
      skillsArray : new FormControl(''),
      languagesArray : new FormControl('')
    });
  }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getOneFreelancer(this.id_freelancer).subscribe((free: any) => {
      this.freelancer = free;

      for (let skill of free.skills) {
        this.skills.push(skill);
      }

      for (let lang of free.languages) {
        this.languages.push(lang);
      }

      this.editProfileFreelancer = new FormGroup({
        first_name : new FormControl (this.freelancer.first_name),
        last_name : new FormControl(this.freelancer.last_name),
        languagesArray : new FormControl(''),
        phone_Number : new FormControl(this.freelancer.phone_Number),
        email : new FormControl(this.appService.connectedUser.data.email),
        password : new FormControl(this.appService.connectedUser.data.password),
        facebook : new FormControl(this.freelancer.facebook),
        twitter : new FormControl(this.freelancer.twitter),
        github : new FormControl(this.freelancer.github),
        skillsArray : new FormControl(''),
      });
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.skills.push({skill: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(skill: Skills): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  addlang(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.languages.push({language: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  removelang(language: Languages): void {
    const index = this.languages.indexOf(language);

    if (index >= 0) {
      this.languages.splice(index, 1);
    }
  }

 selectedFile(event) {
    this.selectedCV = event.target.files[0];
  }

  readURLFile(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.fileSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  selectedImg(event) {
    this.selectedImage = event.target.files[0];
  }

  readURLImg(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

   Editfreelancer() {
    const dataForm = new FormData();

    if (this.selectedImage) {
      dataForm.append('Image_Profil', this.selectedImage, this.selectedImage.name);
    }

    const cv = new FormData();

    if (this.selectedCV) {
      cv.append('portfolio', this.selectedCV, this.selectedCV.name);
    }

    dataForm.append('firt_name', this.editProfileFreelancer.value.firs_tname);
    dataForm.append('last_name', this.editProfileFreelancer.value.last_name);
    dataForm.append('phone_Number', this.editProfileFreelancer.value.phone_Number);
    dataForm.append('email', this.editProfileFreelancer.value.email);
    dataForm.append('password', this.editProfileFreelancer.value.password);
    dataForm.append('facebook', this.editProfileFreelancer.value.facebook);
    dataForm.append('twitter', this.editProfileFreelancer.value.twitter);
    dataForm.append('github', this.editProfileFreelancer.value.github);

    const listes = {
      languages: this.languages,
      skills: this.skills
    };

    this.appService.UpdateFreelancerProfile(this.id_freelancer, dataForm).subscribe((data: any) => {
      this.appService.UpdateFreelancerLists(this.id_freelancer, listes).subscribe((data2: any) => {
        this.appService.UpdateFreelancerCv(this.id_freelancer, cv).subscribe((data3: any) => {
        });
      });
      localStorage.setItem('token', data.access_token);
      this.appService.connectedUser = this.appService.getDecodedToken();
    
    });
  }

}
