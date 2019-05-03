import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.css']
})
export class SignUpCompanyComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  companyForm: FormGroup;
  selectedImage: File;
  // tslint:disable-next-line:variable-name
  public show_company = false;
  imageSrc: any;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar) {

    this.companyForm = new FormGroup({
    nameCompany: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    foundyear: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    DescriptionCompany: new FormControl('', [Validators.required]),
    facebook: new FormControl('', [Validators.required]),
    webSite: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    logo: new FormControl(''),
    });

  }

  ngOnInit() {
    this.show_company = !this.show_company;
  }

  selectedFile(event) {
    this.selectedImage = event.target.files[0];
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(file);
    }
  }

  signupCompany() {
    const dataForm = new FormData();
    dataForm.append('nameCompany', this.companyForm.value.nameCompany);
    dataForm.append('address', this.companyForm.value.address);
    dataForm.append('foundyear', this.companyForm.value.foundyear);
    dataForm.append('phoneNumber', this.companyForm.value.phoneNumber);
    dataForm.append('DescriptionCompany', this.companyForm.value.DescriptionCompany);
    dataForm.append('facebook', this.companyForm.value.facebook);
    dataForm.append('webSite', this.companyForm.value.webSite);
    dataForm.append('email', this.companyForm.value.email);
    dataForm.append('password', this.companyForm.value.password);
    dataForm.append('logo', this.selectedImage, this.selectedImage.name);
    dataForm.append('role', 'company');

    this.appService.postCompany(dataForm).subscribe((data2: any) => {
      this.openSnackBar('Account created succefully', `DONE &#10003`);
    });
  }

  openSnackBar(message, action) {
    const config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.panelClass = ['snackBar'];
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
