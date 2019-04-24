import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditeProfilFreeComponent } from './edite-profil-free.component';

describe('EditeProfilFreeComponent', () => {
  let component: EditeProfilFreeComponent;
  let fixture: ComponentFixture<EditeProfilFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeProfilFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditeProfilFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
