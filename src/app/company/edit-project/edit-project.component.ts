import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import {FormControl, Validators, FormGroup, NgForm } from '@angular/forms';
import { AppService } from '../../app.service';
import { ActivatedRoute } from '@angular/router';

export interface Skills {
  skill: string;
}

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})

export class EditProjectComponent implements OnInit {
  id: any;
  addProject: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: Skills[] = [];

  constructor(private http: AppService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params.id;
    this.http.getOneProject(this.route.snapshot.params.id).subscribe((data: any) => {
      this.addProject = new FormGroup({
        projectName: new FormControl(data.titre_project, Validators.required),
        minOffer: new FormControl(data.min_offer, Validators.required),
        maxOffer: new FormControl(data.max_offer, Validators.required),
        skillsArray: new FormControl('', Validators.required),
        duration: new FormControl(data.duration, Validators.required),
        description: new FormControl(data.description_project, Validators.required)
      });
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
    this.http.postUpdateProject(this.id, data).subscribe(data => {
      console.log(data);
    });
  }

}
