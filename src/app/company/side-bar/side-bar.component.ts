import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

declare const $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
  status1 = false;
  status2 = false;
  status3 = false;
  name : string ;
  id_company : any;
  company :any

  constructor(private route: ActivatedRoute, private router: Router,public appService: AppService) { }

  ngOnInit() {
    this.id_company = this.appService.connectedUser.data.company;
    this.appService.getOneCompany(this.id_company).subscribe((comp: any) => {
      this.company = comp;
      this.name = this.company.nameCompany;
    });
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  }
  showAdd() {
  this.router.navigate(['addProject'], {relativeTo: this.route});
 }
 showDash() {
  this.router.navigate(['dashboard'], {relativeTo: this.route});
 }
 showApllFree() {
  this.router.navigate(['AppliedFrelancers'], {relativeTo: this.route});
 }
}


