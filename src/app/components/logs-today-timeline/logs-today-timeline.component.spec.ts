import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsTodayTimelineComponent } from './logs-today-timeline.component';

describe('LogsTodayTimelineComponent', () => {
  let component: LogsTodayTimelineComponent;
  let fixture: ComponentFixture<LogsTodayTimelineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogsTodayTimelineComponent]
    });
    fixture = TestBed.createComponent(LogsTodayTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
