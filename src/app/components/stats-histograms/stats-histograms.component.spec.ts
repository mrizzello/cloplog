import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsHistogramsComponent } from './stats-histograms.component';

describe('StatsHistogramsComponent', () => {
  let component: StatsHistogramsComponent;
  let fixture: ComponentFixture<StatsHistogramsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatsHistogramsComponent]
    });
    fixture = TestBed.createComponent(StatsHistogramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
