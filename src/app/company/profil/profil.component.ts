import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  connectCompany: any;
  selectedImage: File;
  imageSrc: any;
  id_company: any;
  company: any;
  nameCompany:any;
  foundyear:any;
  address:any;
  email : any ;
  password:any;
  facebook:any;
  webSite:any;
  phoneNumber : any ;
  logo:any;
  constructor(public appService: AppService) { }

  ngOnInit() {

    this.id_company = this.appService.connectedUser.data.company;
    this.appService.getOneCompany(this.id_company).subscribe((comp: any) => {
      this.company = comp;
      this.nameCompany = this.company.nameCompany;
      this.foundyear = this.company.foundyear;
      this.address = this.company.address;
      this.email = this.appService.connectedUser.data.email;
      this.facebook = this.company.facebook;
      this.webSite = this.company.webSite;
      this.phoneNumber = this.company.phoneNumber;
      this.logo =  this.company.logo
    })
  }
}
