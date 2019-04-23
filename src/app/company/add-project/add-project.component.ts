import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { AppService } from '../../app.service';

export interface Skills {
  skill: string;
}

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  addProject: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: Skills[] = [];

  constructor(private http: AppService) {
    this.addProject = new FormGroup({
      projectName: new FormControl('', Validators.required),
      minOffer: new FormControl('', [Validators.required, Validators.min(1)]),
      maxOffer: new FormControl('', [Validators.required, Validators.min(1)]),
      skillsArray: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.skills.push({skill: value.trim()});
    }
    if (input) {
      input.value = '';
    }
  }

  remove(skill: Skills): void {
    const index = this.skills.indexOf(skill);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }

  onSubmit(form: NgForm) {
    const data = {
      titre_project: this.addProject.get('projectName').value,
      description_project: this.addProject.get('description').value,
      skills: this.skills,
      min_offer: this.addProject.get('minOffer').value,
      max_offer: this.addProject.get('maxOffer').value,
      statut: 'not started',
      duration: this.addProject.get('duration').value
    };
    this.http.postAddProject(data).subscribe();
  }
}
