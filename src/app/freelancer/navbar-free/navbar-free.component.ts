import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar-free',
  templateUrl: './navbar-free.component.html',
  styleUrls: ['./navbar-free.component.css']
})
export class NavbarFreeComponent implements OnInit {
  id_freelancer : any;
  freelancer : any;
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute){

  }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getOneFreelancer(this.id_freelancer).subscribe((free: any) => {
      this.freelancer = free;
      console.log(this.freelancer);
    });
  }

  LogOut(){
    this.router.navigate(['landing-page/log-in']);
    localStorage.removeItem('token');
}

}
