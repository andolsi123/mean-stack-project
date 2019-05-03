import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsChatComponent } from './details-chat.component';

describe('DetailsChatComponent', () => {
  let component: DetailsChatComponent;
  let fixture: ComponentFixture<DetailsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
