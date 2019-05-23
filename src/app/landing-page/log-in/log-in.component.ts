import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl , Validators } from '@angular/forms';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public appService: AppService,private router: Router) {

  this.loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

}
  ngOnInit() { }

  login() {
    this.appService.login(this.loginForm.value).subscribe((data3: any) => {
      localStorage.setItem('token', data3.access_token);
      this.appService.connectedUser = this.appService.getDecodedToken();
      if(this.appService.connectedUser.data.role == 'freelancer'){
        this.router.navigate(['freelancer']);
      }
      if(this.appService.connectedUser.data.role =='company'){
        this.router.navigate(['company']);
      }
     });
  }
}
