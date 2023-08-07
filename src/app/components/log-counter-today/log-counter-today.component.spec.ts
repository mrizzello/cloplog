import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogCounterTodayComponent } from './log-counter-today.component';

describe('LogCounterTodayComponent', () => {
  let component: LogCounterTodayComponent;
  let fixture: ComponentFixture<LogCounterTodayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogCounterTodayComponent]
    });
    fixture = TestBed.createComponent(LogCounterTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
