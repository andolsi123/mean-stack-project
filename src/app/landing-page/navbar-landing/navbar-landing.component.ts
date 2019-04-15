import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-landing',
  templateUrl: './navbar-landing.component.html',
  styleUrls: ['./navbar-landing.component.css']
})
export class NavbarLandingComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute ) { }

 

  ngOnInit() {
  }

  pathlogin() {
    this.router.navigate(['log-in'],{relativeTo: this.route});
  }

  pathsignupFree(){
    this.router.navigate(['sign-up-freelancer'],{relativeTo: this.route});
  }

  pathsignupCompany(){
    this.router.navigate(['sign-up-company'],{relativeTo: this.route});
  }

  pathAbout(){
    this.router.navigate(['about-us'],{relativeTo: this.route});
  }
}
