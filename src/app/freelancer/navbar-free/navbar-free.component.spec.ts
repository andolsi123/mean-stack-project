import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFreeComponent } from './navbar-free.component';

describe('NavbarFreeComponent', () => {
  let component: NavbarFreeComponent;
  let fixture: ComponentFixture<NavbarFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
