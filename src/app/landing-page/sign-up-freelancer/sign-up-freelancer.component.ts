import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sign-up-freelancer',
  templateUrl: './sign-up-freelancer.component.html',
  styleUrls: ['./sign-up-freelancer.component.css']
})
export class SignUpFreelancerComponent implements OnInit {


  freelancerForm: FormGroup;
  public show_FreeLancer: boolean = false;
  imageSrc: any;
  selectedImage: File;


  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    this.freelancerForm = new FormGroup({
      first_name: new FormControl('',[Validators.required]),
      last_name: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
      Image_Profil: new FormControl(''),
    });
  }

  ngOnInit() {
    this.show_FreeLancer = !this.show_FreeLancer;
  }

  selectedFile(event) {
    console.log(event.target.files[0])
    this.selectedImage = event.target.files[0]
  }

  readURL(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;

      reader.readAsDataURL(file);
    }
  }


  signupFree() {

    const dataForm = new FormData();
    dataForm.append('first_name', this.freelancerForm.value.first_name);
    dataForm.append('last_name', this.freelancerForm.value.last_name);
    dataForm.append('email', this.freelancerForm.value.email);
    dataForm.append('password', this.freelancerForm.value.password);
    dataForm.append('Image_Profil', this.selectedImage, this.selectedImage.name)

    this.appService.postFree(dataForm).subscribe((data: any) => {
      console.log(data);
      alert('you are added with success');
     // this.router.navigate(['freelancer']);
    })
  }
}
