import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edite-profil',
  templateUrl: './edite-profil.component.html',
  styleUrls: ['./edite-profil.component.css']
})
export class EditeProfilComponent implements OnInit {
  connectCompany : any;
  editProfileCompany: FormGroup;
  selectedImage: File;
  imageSrc: any;

  constructor(public appService: AppService) {
    this.connectCompany = this.appService.connectedUser;
     this.editProfileCompany = new FormGroup({
      nameCompany: new FormControl(this.connectCompany.nameCompany),
      foundyear: new FormControl(this.connectCompany.foundyear),
      address: new FormControl(this.connectCompany.address),
      email: new FormControl(this.connectCompany.email),
      password: new FormControl(this.connectCompany.password),
      facebook: new FormControl(this.connectCompany.facebook),
      webSite: new FormControl(this.connectCompany.webSite),
      DescriptionCompany: new FormControl(this.connectCompany.DescriptionCompany),
      phoneNumber: new FormControl(this.connectCompany.phoneNumber)
     });
   }

  ngOnInit() { 
    this.connectCompany = this.appService.connectedUser;
    console.log(this.connectCompany);
    this.editProfileCompany = new FormGroup({
     nameCompany: new FormControl(this.connectCompany.nameCompany),
     foundyear: new FormControl(this.connectCompany.foundyear),
     address: new FormControl(this.connectCompany.address),
     email: new FormControl(this.connectCompany.email),
     password: new FormControl(this.connectCompany.password),
     facebook: new FormControl(this.connectCompany.facebook),
     webSite: new FormControl(this.connectCompany.webSite),
     DescriptionCompany: new FormControl(this.connectCompany.DescriptionCompany),
     phoneNumber: new FormControl(this.connectCompany.phoneNumber)
    });
  }

  selectedFile(event) {
    console.log(event.target.files[0]);
    this.selectedImage = event.target.files[0];
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  EditCompany(){
    const dataForm = new FormData();
    const dataForm2 = new FormData();
    dataForm.append('nameCompany', this.editProfileCompany.value.nameCompany);
    dataForm.append('address', this.editProfileCompany.value.address);
    dataForm.append('foundyear', this.editProfileCompany.value.foundyear);
    dataForm.append('phoneNumber', this.editProfileCompany.value.phoneNumber);
    dataForm.append('DescriptionCompany', this.editProfileCompany.value.DescriptionCompany);
    dataForm.append('facebook', this.editProfileCompany.value.facebook);
    dataForm.append('webSite', this.editProfileCompany.value.webSite);
    dataForm.append('email', this.editProfileCompany.value.email);
    dataForm.append('password', this.editProfileCompany.value.password);
    dataForm.append('logo', this.selectedImage, this.selectedImage.name);
    this.appService.UpdateCompanyProfile(this.connectCompany.company, dataForm).subscribe((data: any) => {
      console.log(data);
      alert('you edited with success');
      })
  }

}
