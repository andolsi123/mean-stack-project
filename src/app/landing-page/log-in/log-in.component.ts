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
  constructor(private appService: AppService,private router: Router) {
  
  this.loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

}
  ngOnInit() {
    
  }

  login(){
    this.appService.login(this.loginForm.value).subscribe((data3: any) => {
      console.log(data3);
      if('freelancer'){
        this.router.navigate(['freelancer']);
      }
      if('company'){
        this.router.navigate(['company']);
      }
    });
  }
}