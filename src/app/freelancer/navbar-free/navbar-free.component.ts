import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-free',
  templateUrl: './navbar-free.component.html',
  styleUrls: ['./navbar-free.component.css']
})
export class NavbarFreeComponent implements OnInit {
  
  // first_name: any;
  // last_name: any;
  // phone_Number: any;
  // birthdate: any;
  // rateWork: any;
  // facebook: any;
  // githup: any;
  // twitter: any;
  // portfolio: any;
  // skil: any;
  // language: any;

  id_freelancer : any;
  freelancer: any;
  
 

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute){

  }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    console.log(this.id_freelancer);
    this.appService.getOneFreelancer(this.id_freelancer).subscribe((free: any) => {
      this.freelancer = free;
      console.log(this.freelancer)
    });
  }

 profil() {
// this.first_name = this.freelancer.first_name;
// this.last_name = this.freelancer.last_name;
// this.phone_Number = this.freelancer.phone_Number;
// this.birthdate = this.freelancer.birthdate;
// this.rateWork = this.freelancer.rateWork;
// this.facebook = this.freelancer.facebook;
// this.twitter = this.freelancer.twitter;
//this.skil = this.freelancer.skil;
//this.language = this.language;

 }


  LogOut(){
    this.router.navigate(['landing-page/log-in']);
    // localStorage.removeItem('token');
}

}
