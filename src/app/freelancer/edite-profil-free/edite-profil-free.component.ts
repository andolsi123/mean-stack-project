import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edite-profil-free',
  templateUrl: './edite-profil-free.component.html',
  styleUrls: ['./edite-profil-free.component.css']
})
export class EditeProfilFreeComponent implements OnInit {
 freelancer: any;
 id_freelancer: any;
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.id_freelancer = this.appService.connectedUser.data.freelancer;
    this.appService.getOneFreelancer(this.id_freelancer).subscribe((free: any) => {
      this.freelancer = free;
      console.log(this.freelancer);
  }

}
