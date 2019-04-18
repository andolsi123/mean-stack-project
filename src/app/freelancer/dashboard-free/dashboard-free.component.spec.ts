import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFreeComponent } from './dashboard-free.component';

describe('DashboardFreeComponent', () => {
  let component: DashboardFreeComponent;
  let fixture: ComponentFixture<DashboardFreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
