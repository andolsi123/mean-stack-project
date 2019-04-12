import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFreeLancerComponent } from './applied-free-lancer.component';

describe('AppliedFreeLancerComponent', () => {
  let component: AppliedFreeLancerComponent;
  let fixture: ComponentFixture<AppliedFreeLancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedFreeLancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedFreeLancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
