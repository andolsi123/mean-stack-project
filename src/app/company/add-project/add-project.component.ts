import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import {NgForm, FormArray} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {FormControl, Validators, FormGroup } from '@angular/forms';

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
  Editor = ClassicEditor;
  config = {uiColor: '#99500'};
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  skills: Skills[] = [];
  public model = {editorData: null};
  minOff: any;

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  }

  constructor() {
    this.addProject = new FormGroup({
      projectName: new FormControl('', Validators.required),
      minOffer: new FormControl('', [Validators.required, Validators.min(1)]),
      maxOffer: new FormControl('', [Validators.required, Validators.min(1)]),
      skillsArray: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required)
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
    console.log(form);
  }

}
