import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFreelancerComponent } from './sign-up-freelancer.component';

describe('SignUpFreelancerComponent', () => {
  let component: SignUpFreelancerComponent;
  let fixture: ComponentFixture<SignUpFreelancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpFreelancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpFreelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
