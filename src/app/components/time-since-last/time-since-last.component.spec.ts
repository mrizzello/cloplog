import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSinceLastComponent } from './time-since-last.component';

describe('TimeSinceLastComponent', () => {
  let component: TimeSinceLastComponent;
  let fixture: ComponentFixture<TimeSinceLastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSinceLastComponent]
    });
    fixture = TestBed.createComponent(TimeSinceLastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
