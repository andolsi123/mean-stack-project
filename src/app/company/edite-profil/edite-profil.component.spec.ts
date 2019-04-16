import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeProfilComponent } from './edite-profil.component';

describe('EditeProfilComponent', () => {
  let component: EditeProfilComponent;
  let fixture: ComponentFixture<EditeProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
