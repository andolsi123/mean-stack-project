import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  freelancerForm: FormGroup;
  companyForm: FormGroup;

  constructor(private appService: AppService) {
    this.freelancerForm = new FormGroup({
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.companyForm = new FormGroup({
      nameCompany: new FormControl(''),
      address: new FormControl(''),
      foundyear: new FormControl(''),
      phoneNumber: new FormControl(''),
      DescriptionCompany: new FormControl(''),
      facebook: new FormControl(''),
      webSite: new FormControl(''),
      Email: new FormControl(''),
      Pword: new FormControl(''),
      logo:new FormControl(''),
    });

  }

  ngOnInit() {

  }


  signupFree() {
    this.appService.postFree(this.freelancerForm.value).subscribe((data: any) => {
      console.log(data);
    })
  }

  signupCompany() {
    this.appService.postCompany(this.companyForm.value).subscribe((data2: any) => {
    console.log(data2);
    })
  }

}

