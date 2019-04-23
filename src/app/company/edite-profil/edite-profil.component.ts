import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl } from '@angular/forms';
import { CompanyComponent } from '../company.component';

@Component({
  selector: 'app-edite-profil',
  templateUrl: './edite-profil.component.html',
  styleUrls: ['./edite-profil.component.css']
})
export class EditeProfilComponent implements OnInit {
  connectCompany: any;
  editProfileCompany: FormGroup;
  selectedImage: File;
  imageSrc: any;
  id_company: any;
  company: any

  constructor(public appService: AppService) {
    this.id_company = this.appService.connectedUser.data.company;
      this.editProfileCompany = new FormGroup({
        nameCompany: new FormControl(''),
        foundyear: new FormControl(''),
        address: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        facebook: new FormControl(''),
        webSite: new FormControl(''),
        DescriptionCompany: new FormControl(''),
        phoneNumber: new FormControl(''),
        logo: new FormControl('')
      });

  }

  ngOnInit() {
    this.id_company = this.appService.connectedUser.data.company;
    this.appService.getOneCompany(this.id_company).subscribe((comp: any) => {
      this.company = comp;

      this.editProfileCompany = new FormGroup({
        nameCompany: new FormControl(this.company.nameCompany),
        foundyear: new FormControl(this.company.foundyear),
        address: new FormControl(this.company.address),
        email: new FormControl(this.appService.connectedUser.data.email),
        password: new FormControl(this.appService.connectedUser.data.password),
        facebook: new FormControl(this.company.facebook),
        webSite: new FormControl(this.company.webSite),
        DescriptionCompany: new FormControl(this.company.DescriptionCompany),
        phoneNumber: new FormControl(this.company.phoneNumber),
        logo: new FormControl('')
      });
    });

  }

  selectedFile(event) {
    // console.log(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }

  EditCompany() {
    const dataForm = new FormData();
    if (this.selectedImage) {
      this.company.logo = this.selectedImage.name;
      dataForm.append('logo', this.selectedImage);
    }
    dataForm.append('nameCompany', this.editProfileCompany.value.nameCompany);
    dataForm.append('address', this.editProfileCompany.value.address);
    dataForm.append('foundyear', this.editProfileCompany.value.foundyear);
    dataForm.append('phoneNumber', this.editProfileCompany.value.phoneNumber);
    dataForm.append('DescriptionCompany', this.editProfileCompany.value.DescriptionCompany);
    dataForm.append('facebook', this.editProfileCompany.value.facebook);
    dataForm.append('webSite', this.editProfileCompany.value.webSite);
    dataForm.append('email', this.editProfileCompany.value.email);
   // dataForm.append('logo', this.selectedImage, this.selectedImage.name);

     

    this.appService.UpdateCompanyProfile(this.id_company, dataForm).subscribe((data1: any) => {
      localStorage.setItem('token', data1.access_token);
      this.appService.connectedUser = this.appService.getDecodedToken();
      alert('you edited with success');
    });
  }
}
