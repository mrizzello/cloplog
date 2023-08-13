import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsHistogramByDayComponent } from './stats-histogram-by-day.component';

describe('StatsHistogramByDayComponent', () => {
  let component: StatsHistogramByDayComponent;
  let fixture: ComponentFixture<StatsHistogramByDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsHistogramByDayComponent]
    });
    fixture = TestBed.createComponent(StatsHistogramByDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
